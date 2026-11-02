"""Record real optimizer states without restarting optimization or consuming RNG.

Example:
  PYTHONPATH=/path/to/umato/source python scripts/animation/record-optimization.py \
    --data-dir /path/to/fashion_mnist --output-dir decks/umato/public/optimization

Requires the UMATO source commit recorded in metadata, umap-learn 0.5.7,
NumPy, scikit-learn, and numba. The data directory contains data.npy/label.npy.
"""
import argparse, ast, hashlib, inspect, json, subprocess, time
from pathlib import Path
import numpy as np
import umap
import umap.layouts as ul
import umap.umap_ as uu
import umato
import umato.layouts as ml
import umato.umato_ as mm

parser=argparse.ArgumentParser()
parser.add_argument('--data-dir',required=True,type=Path)
parser.add_argument('--output-dir',required=True,type=Path)
args=parser.parse_args()
args.output_dir.mkdir(parents=True,exist_ok=True)
X=np.asarray(np.load(args.data_dir/'data.npy'),dtype=np.float32,order='C')
y=np.load(args.data_dir/'label.npy').astype(int)
assert X.shape==(3000,784) and y.shape==(3000,)
assert np.isfinite(X).all() and 0<=X.min()<=X.max()<=1
N=len(X);seed=42
umap_frames=[];global_frames=[];local_frames=[];state={}

def instrument(fn,callback,expression):
    """Add read-only callbacks immediately before/after the optimizer epoch loop."""
    tree=ast.parse(inspect.getsource(fn))
    func=tree.body[0]
    loops=[(i,n) for i,n in enumerate(func.body) if isinstance(n,ast.For)]
    assert len(loops)==1
    i,loop=loops[0]
    start=ast.parse(f'_record({expression}, 0, n_epochs)').body[0]
    stop=ast.parse(f'_record({expression}, {loop.target.id}+1, n_epochs)').body[0]
    func.body.insert(i,start);loop.body.append(stop)
    ns=dict(fn.__globals__);ns['_record']=callback
    exec(compile(ast.fix_missing_locations(tree),inspect.getsourcefile(fn),'exec'),ns)
    return ns[fn.__name__]

def record_umap(coords,epoch,total):
    if epoch%2==0 or epoch==total:
        umap_frames.append({'epoch':epoch,'phase':'optimization','coordinates':coords.copy()})

def record_global(coords,epoch,total):
    if epoch%2==0 or epoch==total:
        global_frames.append({'epoch':epoch,'phase':'global','coordinates':coords.copy()})

def record_local(coords,info,epoch,total):
    if epoch==0: state['local_initial']=coords.copy();state['hub_info']=info.copy()
    local_frames.append({'epoch':epoch,'phase':'local','coordinates':coords.copy()})

original_u=uu.optimize_layout_euclidean
uu.optimize_layout_euclidean=instrument(ul.optimize_layout_euclidean,record_umap,'head_embedding')
common=dict(n_neighbors=50,min_dist=.1,init='pca',random_state=seed,n_jobs=1)
print('Recording UMAP',flush=True);start=time.perf_counter()
u=umap.UMAP(**common,n_epochs=200)
U=u.fit_transform(X)
print('UMAP recorded',len(umap_frames),'frames in',time.perf_counter()-start,flush=True)
assert np.array_equal(U,umap_frames[-1]['coordinates'])
# Verify read-only instrumentation against an uninstrumented run.
uu.optimize_layout_euclidean=original_u
reference=umap.UMAP(**common,n_epochs=200).fit_transform(X)
assert np.array_equal(U,reference),'UMAP callback changed numerical results'
print('UMAP numerical equivalence passed',flush=True)

original_global=mm.optimize_global_layout
original_local=mm.nn_layout_optimize
original_build=mm.build_global_structure
original_local_pipeline=mm.local_optimize_nn

def build_with_hub_ids(*a,**kw):
    bound=inspect.signature(original_build).bind(*a,**kw)
    state['hub_ids']=np.array(bound.arguments['hubs'],dtype=int).copy()
    return original_build(*a,**kw)

def capture_normalization(coords):
    state['normalization_min']=coords.min(axis=0).copy()
    state['normalization_max']=coords.max(axis=0).copy()

tree=ast.parse(inspect.getsource(original_local_pipeline))
func=tree.body[0]
for i,node in enumerate(func.body):
    if isinstance(node,ast.Assign) and '10.0' in ast.unparse(node) and 'embedding' in ast.unparse(node):
        func.body.insert(i,ast.parse('_capture_pre_normalization(embedding)').body[0])
        break
else: raise AssertionError('Normalization assignment not found')
ns=dict(original_local_pipeline.__globals__);ns['_capture_pre_normalization']=capture_normalization
exec(compile(ast.fix_missing_locations(tree),inspect.getsourcefile(original_local_pipeline),'exec'),ns)
# nn_layout_optimize is looked up in this copied namespace, so install its
# instrumented function there as well, below.
mm.local_optimize_nn=ns[original_local_pipeline.__name__]
mm.build_global_structure=build_with_hub_ids
mm.optimize_global_layout=instrument(ml.optimize_global_layout,record_global,'Z')
mm.nn_layout_optimize=instrument(ml.nn_layout_optimize,record_local,'head_embedding, hub_info')
ns['nn_layout_optimize']=mm.nn_layout_optimize
print('Recording UMATO',flush=True);start=time.perf_counter()
# UMATO's PCA initializer also uses NumPy's global RNG. Seed it explicitly.
np.random.seed(seed)
m=umato.UMATO(**common,hub_num=400,global_n_epochs=20,local_n_epochs=50,execution_mode='deterministic')
M=m.fit_transform(X)
print('UMATO recorded',len(global_frames),len(local_frames),'frames in',time.perf_counter()-start,flush=True)
assert np.isfinite(M).all()
mm.optimize_global_layout=original_global;mm.nn_layout_optimize=original_local;mm.build_global_structure=original_build;mm.local_optimize_nn=original_local_pipeline
np.random.seed(seed)
reference=umato.UMATO(**common,hub_num=400,global_n_epochs=20,local_n_epochs=50,execution_mode='deterministic').fit_transform(X)
assert np.array_equal(M,reference),'UMATO callback changed numerical results'
print('UMATO numerical equivalence passed',flush=True)

# Map global hub coordinates through the *same affine normalization* used by
# local_optimize_nn (no per-frame fitting, no invented motion).
# Capture the exact pre-normalization extrema from local_optimize_nn.
hubs=state['hub_ids']
scale=10/(state['normalization_max']-state['normalization_min'])
offset=-state['normalization_min']*scale
print('Global-to-local affine normalization',scale,offset,flush=True)
frames_m=[]
for frame in global_frames:
    coords=np.full((N,2),np.nan,dtype=np.float32)
    coords[hubs]=frame['coordinates']*scale+offset
    frames_m.append({**frame,'coordinates':coords})
for frame in local_frames:
    coords=frame['coordinates'].copy();coords[state['hub_info']==0]=np.nan
    frames_m.append({**frame,'coordinates':coords})
frames_m.append({'epoch':50,'phase':'complete','coordinates':M.copy()})

# Fixed bounds per panel over the complete trace; equal unit aspect ratio.
# Uint16 quantization reserves 65535 for points not yet introduced.
def write_trace(name,frames,final):
    coords=np.array([f['coordinates'] for f in frames],dtype=np.float32)
    valid=np.isfinite(coords).all(axis=2)
    lo=np.nanmin(coords,axis=(0,1));hi=np.nanmax(coords,axis=(0,1))
    center=(lo+hi)/2;span=float(max(hi-lo)*1.08)
    q=np.full(coords.shape,65535,dtype='<u2')
    normalized=(coords-(center-span/2))/span
    q[valid]=np.rint(np.clip(normalized[valid],0,1)*65534).astype('<u2')
    path=args.output_dir/f'{name}.bin';path.write_bytes(q.tobytes())
    assert valid[-1].sum()==N and len(frames)>50
    return {'file':path.name,'frames':len(frames),'points':N,'bounds':{'center':center.tolist(),'span':span},'phases':[{'phase':f['phase'],'epoch':f['epoch']} for f in frames],'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'finalSha256':hashlib.sha256(final.tobytes()).hexdigest()}

meta={'dataset':'Fashion-MNIST','points':N,'features':784,'labels':y.tolist(),'classNames':['T-shirt/top','Trouser','Pullover','Dress','Coat','Sandal','Shirt','Sneaker','Bag','Ankle boot'],'classCounts':np.bincount(y,minlength=10).tolist(),'dataSha256':hashlib.sha256(X.tobytes()).hexdigest(),'seed':seed,'numpyGlobalSeed':seed,'common':common,'umapVersion':umap.__version__,'umapParameters':{'n_epochs':200},'umatoSourceCommit':subprocess.check_output(['git','-C',str(Path(mm.__file__).parents[1]),'rev-parse','HEAD'],text=True).strip(),'umatoParameters':{'hub_num':400,'global_n_epochs':20,'local_n_epochs':50,'execution_mode':'deterministic'},'hubIds':hubs.tolist(),'encoding':'little-endian uint16 XY; 0..65534 normalized to fixed square bounds; 65535 = not introduced','playback':'Each optimizer is mapped to normalized progress independently; playback is not wall-clock speed. Rendered interpolation is between real epoch snapshots.','validation':'Final arrays exactly match uninstrumented runs for both algorithms.'}
meta['snapshotSampling']={'umap':'every 2 epochs','umatoGlobal':'every 2 epochs','umatoLocal':'every epoch'}
meta['umap']=write_trace('umap',umap_frames,U);meta['umato']=write_trace('umato',frames_m,M)
(args.output_dir/'metadata.json').write_text(json.dumps(meta,separators=(',',':')))
np.savez_compressed('/tmp/vis-optimization-raw.npz',umap=np.array([f['coordinates'] for f in umap_frames]),umato=np.array([f['coordinates'] for f in frames_m]),labels=y)
print('SAVED',[(key,meta[key]['frames']) for key in ['umap','umato']],flush=True)
