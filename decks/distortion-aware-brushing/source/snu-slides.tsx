import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import housingSource from './assets/california-housing.json';
import dabDatasetUrl from './assets/california-housing-dab.json?url';
import mnistStudyReplayUrl from './assets/mnist-study-replay.json?url';
import mnistAtlasUrl from './assets/mnist-013-atlas.png';
import dabResultsLow from './assets/dab-results-low.svg';
import dabResultsHigh from './assets/dab-results-high.svg';
import dabWorkflowSource from './assets/dab-workflow.json';
import umatoPipelineFullPaper from './assets/umato-pipeline-full-paper.png';
import drOverreliancePattern from './assets/dr-overreliance-pattern.png';
import drCherryPickingPattern from './assets/dr-cherry-picking-pattern.png';
import projectionsEarlyInterruption from './assets/projections-early-interruption.svg';
import globeMapProjections from './assets/globe-map-projections.svg';
import { Step, Steps, useIsActivePage, useSlidePageNumber } from './slidev-runtime';
import type { Page, SlideTransition } from './slidev-runtime';

const PageCounter = ({ light = false }: { light?: boolean }) => {
  const { current, total } = useSlidePageNumber();
  if (current === 1) return null;
  return <span data-slide-page-counter="" style={{ position: 'absolute', right: 40, bottom: 24, fontFamily: 'Arial', fontSize: 24, lineHeight: 1, fontWeight: 400, color: light ? '#fff' : '#555', textShadow: light ? '0 1px 4px rgba(0,0,0,.7)' : undefined, pointerEvents: 'none', zIndex: 20 }}>{current} / {total}</span>;
};

const bostonAccent = '#1f3d8c';

const VectorSpaceDiagram = ({ output = false, left, reduction = false }: { output?: boolean; left: number; reduction?: boolean }) => {
  // Illustrative coordinates preserve item identities across the transformation.
  const points = [
    { input: [150, 332], output: [155, 332], color: '#23448e' },
    { input: [180, 250], output: [188, 310], color: '#23448e' },
    { input: [228, 305], output: [205, 355], color: '#23448e' },
    { input: [290, 222], output: [230, 320], color: '#23448e' },
    { input: [350, 300], output: [250, 350], color: '#23448e' },
    { input: [405, 245], output: [273, 300], color: '#23448e' },
    { input: [170, 375], output: [322, 220], color: '#b33d47' },
    { input: [255, 365], output: [347, 260], color: '#b33d47' },
    { input: [310, 340], output: [365, 206], color: '#b33d47' },
    { input: [355, 380], output: [390, 245], color: '#b33d47' },
    { input: [420, 355], output: [422, 218], color: '#b33d47' },
  ];
  return <g transform={`translate(${left} 0)`}>
    <text x={280} y={54} textAnchor="middle" fontSize={38} fontWeight={700}>{reduction ? (output ? <><tspan x={280} y={32}>Three- or two-dimensional</tspan><tspan x={280} dy={44}>projection</tspan></> : 'High-dimensional space') : (output ? 'Output vector space' : 'Input vector space')}</text>
    <path d={reduction && output ? 'M80 440 V146 H500 V440 Z' : 'M80 440 L210 310 L490 310 L360 440 Z'} fill="#eef2f9" />
    <path d={reduction && output ? 'M80 440 V146 M80 440 H500' : 'M80 440 V146 M80 440 H500 M80 440 L218 302'} stroke="#9aa8bf" strokeWidth={3} fill="none" />
    <path d={reduction && output ? 'M73 159 L80 145 L87 159 M487 433 L501 440 L487 447' : 'M73 159 L80 145 L87 159 M487 433 L501 440 L487 447 M204 307 L219 301 L213 316'} stroke="#9aa8bf" strokeWidth={3} fill="none" />
    <text x={517} y={451} fontSize={28} fill="#66748a">{output ? 'z₁' : 'x₁'}</text>
    <text x={65} y={125} fontSize={28} fill="#66748a">{output ? 'z₂' : 'x₂'}</text>
    {!(reduction && output) && <text x={229} y={298} fontSize={28} fill="#66748a">{output ? '… zₖ' : '… x_d'}</text>}
    {points.map((point, index) => <circle key={index} cx={(output ? point.output : point.input)[0]} cy={(output ? point.output : point.input)[1]} r={9} fill={point.color} opacity={0.8} />)}
    <circle cx={output ? 285 : 277} cy={output ? 385 : 281} r={12} fill="#d49729" stroke="#fff" strokeWidth={3} />
    <circle cx={output ? 285 : 277} cy={output ? 385 : 281} r={20} fill="none" stroke="#d49729" strokeWidth={2} />
    <text x={output ? 307 : 300} y={output ? 390 : 280} fontSize={30} fontWeight={700} fill="#a97517">{output ? 'zᵢ' : 'xᵢ'}</text>
    <text x={280} y={526} textAnchor="middle" fontSize={34}>{reduction ? (output ? 'zᵢ ∈ ℝ²' : 'xᵢ ∈ ℝᵈ, d ≫ 2') : (output ? 'zᵢ = fθ(xᵢ) ∈ ℝᵏ' : 'xᵢ ∈ ℝᵈ')}</text>
  </g>;
};

const DimensionalityReductionDiagram = ({ top = 238 }: { top?: number }) => (
  <svg role="img" aria-label="Dimensionality reduction maps high-dimensional data vectors into a three- or two-dimensional projection. The same data points keep their colors, while information can be lost during the reduction." width={1728} height={620} viewBox="0 0 1728 620" style={{ position: 'absolute', left: 96, top, fontFamily: 'Arial' }}>
      <VectorSpaceDiagram left={0} reduction />
      <path d="M606 300 H1108" stroke="#23448e" strokeWidth={5} fill="none" />
      <path d="M1087 284 L1109 300 L1087 316" stroke="#23448e" strokeWidth={5} fill="none" strokeLinejoin="round" />
      <text x={858} y={238} textAnchor="middle" fontSize={38} fontWeight={700}>Dimensionality reduction</text>
      <text x={858} y={361} textAnchor="middle" fontSize={30} fill="#526071">d dimensions → 2 dimensions</text>
      <path d="M858 390 V426 M849 417 L858 427 L867 417" stroke="#b33d47" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={858} y={480} textAnchor="middle" fontSize={34} fontWeight={700} fill="#b33d47">Information can be lost</text>
      <VectorSpaceDiagram left={1168} output reduction />
    </svg>
);

const UnreliableAnalysisProblem: Page = () => (
  <section data-unreliable-analysis-problem="" onClick={event => {
    if (event.currentTarget.querySelector('[data-osd-step="pending"]')) {
      event.stopPropagation();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    }
  }} style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <h1 style={{ position: 'absolute', left: 96, top: 64, width: 1728, margin: 0, fontSize: 56, lineHeight: 1.3, fontWeight: 400 }}>
      Novice analysts often use dimensionality reduction in <strong style={{ color: '#b33d47' }}>unreliable ways</strong>{' for their data analysis.'}
    </h1>
    <Steps><Step duration={0}>
    <p style={{ position: 'absolute', left: 96, top: 240, width: 1728, margin: 0, fontSize: 48, lineHeight: 1.4 }}>
      <strong>Unreliability:</strong> The analysis does not accurately reflect the underlying data, leading to <strong>incorrect conclusions or decisions.</strong>
    </p>

    <DimensionalityReductionDiagram top={420} />
    </Step></Steps>
    <PageCounter />
  </section>
);

const DimensionalityReductionFocus: Page = () => (
  <section data-dr-focus="" style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <h1 style={{ position: 'absolute', left: 96, top: 64, width: 1728, margin: 0, fontSize: 56, lineHeight: 1.3, fontWeight: 400 }}>
      I investigate why such unreliability occurs.
    </h1>
    <DimensionalityReductionDiagram />
    <AnalysisStudyReferences />
    <PageCounter />
  </section>
);

const InevitableInformationLoss: Page = () => (
  <section data-inevitable-information-loss="" style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <h1 style={{ position: 'absolute', left: 96, top: 64, width: 1728, margin: 0, fontSize: 56, lineHeight: 1.3, fontWeight: 400, translate: '0px -5.14px', fontStyle: 'normal' }}>
      Still, novice analysts are not aware of the<br />
      <em><strong>inevitable</strong>{' '}<span style={{ fontWeight: '700' }}>information loss</span>{' '}<span style={{ fontStyle: 'normal' }}>in multidimensional data visualization,</span><br />{''}<span style={{ fontStyle: 'normal' }}>{'leading to '}</span><span style={{ fontWeight: '700' }}>unreliable analysis</span>{''}</em>
    </h1>
    <img src={globeMapProjections} alt="A globe unfolds into Mercator, Equal Earth, and equirectangular maps. Equal-sized circular regions on the globe change shape and size under different projections." style={{ position: 'absolute', left: 96, top: 330, width: 1728, height: 540, objectFit: 'contain' }} />
    <PageCounter />
  </section>
);

const IntelligentBrushingMitigatesLoss: Page = () => (
  <section data-intelligent-brushing-mitigates-loss="" style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <h1 style={{ position: 'absolute', left: 96, top: 64, width: 1728, margin: 0, fontSize: 56, lineHeight: 1.3, fontWeight: 400, translate: '0px -5.14px', fontStyle: 'normal' }}>
      Still, novice analysts are not aware of the<br />
      <em><strong>inevitable</strong>{' '}<span style={{ fontWeight: '700' }}>information loss</span>{' '}<span style={{ fontStyle: 'normal' }}>in multidimensional data visualization,</span><br />{''}<span style={{ fontStyle: 'normal' }}>{'leading to '}</span><span style={{ fontWeight: '700' }}>unreliable analysis</span>{''}</em>
    </h1>
    <img src={globeMapProjections} alt="A globe unfolds into Mercator, Equal Earth, and equirectangular maps. Equal-sized circular regions on the globe change shape and size under different projections." style={{ position: 'absolute', left: 96, top: 330, width: 1728, height: 540, objectFit: 'contain' }} />
    <p style={{ position: 'absolute', left: 96, top: 978, width: 1728, margin: 0, fontSize: '46px', lineHeight: 1.25, translate: '0px -80.53px' }}><strong style={{ color: '#23448e' }}>Solution: Make interaction intelligent</strong>{' to '}<span style={{ fontWeight: '700' }}>mitigate information loss</span>{' for users.'}</p>
    <PageCounter />
  </section>
);

const AnalysisStudyReferences = () => (
<div data-paper-references="" style={{ position: 'absolute', left: 96, bottom: 48, width: 'max-content', maxWidth: 1728, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PaperReference title="Stop Misusing t-SNE and UMAP for Visual Analytics" authors="Jeongin Park, Sungbok Shin, and Jinwook Seo" venue="IEEE VIS 2026 & TVCG" href="https://www.hyeonjeon.com/assets/pdf/jeon26vis.pdf" />
      <PaperReference title="Unveiling High-dimensional Backstage: A Survey for Reliable Visual Analytics with Dimensionality Reduction" authors="Hyunwook Lee, Yun-Hsin Kuo, Taehyun Yang, Daniel Archambault, Sungahn Ko, Takanori Fujiwara, Kwan-Liu Ma, and Jinwook Seo" venue="ACM CHI 2025" href="https://www.hyeonjeon.com/assets/pdf/jeon25chi.pdf" />
      <PaperReference title="A Critical Analysis of the Usage of Dimensionality Reduction in Four Domains" authorsBefore="Dylan Cashman, Mark Keller" authors="Bum Chul Kwon, and Qianwen Wang" venue="IEEE VIS 2025 & TVCG" href="https://www.hyeonjeon.com/assets/pdf/cashman25tvcg.pdf" />
    </div>
);

const PaperReference = ({ title, authors, venue, href, authorsBefore = '' }: { title: string; authors: string; venue: string; href: string; authorsBefore?: string }) => (
  <p data-paper-reference="" style={{ margin: 0, fontFamily: 'Arial', fontSize: 20.5, lineHeight: 1.3, fontWeight: 400, textAlign: 'left', color: '#333' }}>
    <span data-reference-authors="">{authorsBefore && `${authorsBefore}, `}<strong style={{ fontWeight: 700 }}>Hyeon Jeon</strong>, {authors}.</span><br />
    <span data-reference-work="" style={{ whiteSpace: 'nowrap' }}><a data-osd-interactive="" href={href} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>“{title}”</a>.{' '}<em data-reference-venue="">{venue}.</em></span>
  </p>
);

const DimensionalityReductionUsagePatterns: Page = () => (
  <section data-dr-usage-patterns="" style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <h1 style={{ position: 'absolute', left: 96, top: 64, width: 1728, margin: 0, fontSize: 56, lineHeight: 1.3, fontWeight: 400 }}>
      I investigate why such unreliability occurs
    </h1>
    <div style={{ position: 'absolute', left: 96, top: 240, width: 1728, height: 300, display: 'flex', alignItems: 'center', gap: 44 }}>
      <p style={{ width: 440, flexShrink: 0, margin: 0, fontSize: 38, lineHeight: 1.35, translate: '0px 0px' }}>
        <strong style={{ color: '#b33d47' }}>Misuse of</strong><br />well-known techniques<br />(t-SNE and UMAP)
      </p>
      <img src={drOverreliancePattern} alt="Four category-colored dimensionality reduction plots showing very different arrangements of the data." style={{ display: 'block', width: 1244, height: 300, objectFit: 'contain', translate: '0px 0px' }} />
    </div>
    <div style={{ position: 'absolute', left: 96, top: 560, width: 1728, height: 210, display: 'flex', alignItems: 'center', gap: 44 }}>
      <p style={{ width: 440, flexShrink: 0, margin: 0, fontSize: 38, lineHeight: 1.35, translate: '0px 0px' }}>
        <strong style={{ color: '#b33d47' }}>Cherry-picking</strong> of<br />hyperparameters
      </p>
      <img src={drCherryPickingPattern} alt="Five plots of red, blue, and yellow data groups with different relative shapes, sizes, and separations." style={{ display: 'block', width: 1244, height: 210, objectFit: 'contain', translate: '0px 0px' }} />
    </div>
    <AnalysisStudyReferences />
    <PageCounter />
  </section>
);

const WhyOverreliance: Page = () => (
  <section data-why-overreliance="" style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <h1 style={{ position: 'absolute', left: 96, top: 64, margin: 0, fontSize: 64, lineHeight: 1.2, fontWeight: 400 }}>Why do novices misuse well-known techniques?</h1>
    <p style={{ position: 'absolute', left: 96, top: 172, width: 1728, margin: 0, fontSize: 48, lineHeight: 1.35 }}>
      Novice analysts lack access to<strong style={{ color: '#b33d47' }}>{' specialized techniques'}</strong>.
    </p>
    <p style={{ position: 'absolute', left: 96, top: 266, width: 1728, margin: 0, fontSize: 48, lineHeight: 1.35 }}>
      <strong style={{ color: '#23448e' }}>Solution:</strong> I <strong style={{ color: '#23448e' }}>design and deploy specialized techniques<span style={{ fontWeight: '400' }}>{''}</span>{''}</strong><br />such as UMATO to improve on well-known techniques.<span style={{ fontWeight: '700' }}>{''}</span><span style={{ fontWeight: '700' }}>{''}</span>{''}
    </p>
    <img src={umatoPipelineFullPaper} alt="UMATO full paper, Figure 1: comparison of UMAP and UMATO pipelines. UMATO classifies points, optimizes global structure, optimizes local structure, and arranges disconnected points." style={{ position: 'absolute', left: 370, top: 410, width: 1180, height: 489, objectFit: 'contain' }} />
    <div data-paper-references="" style={{ position: 'absolute', left: 96, bottom: 48, width: 'max-content', maxWidth: 1728, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PaperReference title="UMATO: Bridging Local and Global Structures for Reliable Visual Analytics with Dimensionality Reduction" authors="Kwon Ko, Soohyun Lee, Jake Hyun, Taehyun Yang, Gyehun Go, Jaemin Jo, and Jinwook Seo" venue="IEEE VIS 2026 & TVCG" href="https://www.hyeonjeon.com/assets/pdf/jeon25tvcg2.pdf" />
      <PaperReference title="Uniform Manifold Approximation with Two-phase Optimization" authors="Hyung-Kwon Ko, Soohyun Lee, Jaemin Jo, and Jinwook Seo" venue="IEEE VIS 2022 (Short)" href="https://www.hyeonjeon.com/assets/pdf/jeon22vis.pdf" />
    </div>
    <PageCounter />
  </section>
);

const DadrEquationRow = ({ top, explanation, children }: { top: number; explanation: string; children: ReactNode }) => (
  <div data-dadr-equation="" style={{ position: 'absolute', left: 0, top, width: 680 }}>
    <svg width={680} height={82} viewBox="0 0 680 82" style={{ display: 'block', color: '#172536', fontFamily: 'Times New Roman, serif', fontSize: 56, fill: 'currentColor' }}>{children}</svg>
    <p style={{ margin: '12px 0 0', fontSize: 27, lineHeight: 1.3, color: '#555' }}>{explanation}</p>
  </div>
);

const WhyCherryPicking: Page = () => (
  <section data-why-cherry-picking="" style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <h1 style={{ position: 'absolute', left: 96, top: 64, margin: 0, fontSize: 64, lineHeight: 1.2, fontWeight: 400 }}>Why do novices cherry-pick hyperparameters?</h1>
    <p style={{ position: 'absolute', left: 96, top: 172, width: 1728, margin: 0, fontSize: 48, lineHeight: 1.35 }}>
      Novice analysts <strong style={{ color: '#b33d47' }}>cannot wait</strong> for optimization to finish.
    </p>
    <p style={{ position: 'absolute', left: 96, top: 266, width: '754.01px', margin: 0, fontSize: 44, lineHeight: 1.25, minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', height: '165px', translate: '0px 0px' }}>
      <strong style={{ color: '#23448e' }}>Solution:</strong> I <strong style={{ color: '#23448e' }}>accelerate{' optimization using '}{''}</strong>{''}<strong>dataset characteristics</strong>.
    </p>
    <div data-dadr-equations="" style={{ position: 'absolute', left: 96, top: 454, width: 680, height: 460 }}>
      <DadrEquationRow top={0} explanation="Measure the structural complexity of dataset X.">
        <title>c sub X equals the vector PDS of X, MNC of X</title>
        <text x={0} y={56} fontStyle="italic" fontWeight={700}>c</text><text x={27} y={70} fontSize={30} fontStyle="italic">X</text>
        <text x={64} y={56}>=</text>
        <text x={116} y={56} fontSize={49}>[PDS(<tspan fontStyle="italic">X</tspan>), MNC(<tspan fontStyle="italic">X</tspan>)]</text>
      </DadrEquationRow>
      <DadrEquationRow top={158} explanation="Predict achievable accuracy for DR technique T.">
        <title>Predicted best accuracy Q hat star sub T equals g sub T of c sub X</title>
        <text x={0} y={56} fontStyle="italic">Q</text><path d="M 8 10 L 22 4 L 36 10" fill="none" stroke="currentColor" strokeWidth={2} />
        <text x={43} y={26} fontSize={31}>*</text><text x={43} y={71} fontSize={30} fontStyle="italic">T</text>
        <text x={81} y={56}>=</text><text x={136} y={56} fontStyle="italic">g</text><text x={163} y={70} fontSize={30} fontStyle="italic">T</text>
        <text x={193} y={56}>(</text><text x={214} y={56} fontStyle="italic" fontWeight={700}>c</text><text x={242} y={70} fontSize={30} fontStyle="italic">X</text><text x={270} y={56}>)</text>
      </DadrEquationRow>
      <DadrEquationRow top={316} explanation="Stop when the predicted accuracy is reached.">
        <title>Stop hyperparameter search when the best achieved accuracy reaches the predicted best accuracy</title>
        <text x={0} y={56} fontStyle="italic">Q</text><text x={41} y={70} fontSize={28}>best</text><text x={110} y={56}>≥</text>
        <text x={170} y={56} fontStyle="italic">Q</text><path d="M 178 10 L 192 4 L 206 10" fill="none" stroke="currentColor" strokeWidth={2} />
        <text x={213} y={26} fontSize={31}>*</text><text x={213} y={71} fontSize={30} fontStyle="italic">T</text>
        <text x={260} y={56}>⟹</text>
        <rect x={350} y={10} width={134} height={63} rx={4} fill="none" stroke="#23448e" strokeWidth={2} />
        <text x={372} y={54} fontFamily="Arial" fontSize={39} fill="#23448e">Stop</text>
      </DadrEquationRow>
    </div>
    <img src={projectionsEarlyInterruption} alt="Original projections.pptx comparison: Fashion-MNIST, Optical Recognition, Yeast, and Ecoli, without and with early interruption. All accuracy and timing labels are preserved from the PowerPoint." style={{ position: 'absolute', left: 824, top: 294, width: '1050.37px', height: '609.75px', objectFit: 'contain', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', translate: '5.63px -22.2px' }} />
    <div data-paper-references="" style={{ position: 'absolute', left: 96, bottom: 48, width: 'max-content', maxWidth: 1728 }}>
      <PaperReference title="Dataset-Adaptive Dimensionality Reduction" authors="Jeongin Park, Soohyun Lee, Dae Hyun Kim, Sungbok Shin, and Jinwook Seo" venue="IEEE VIS 2025 & TVCG" href="https://www.hyeonjeon.com/assets/pdf/jeon25tvcg.pdf" />
    </div>
    <PageCounter />
  </section>
);

type HousingRow = typeof housingSource.points[number];

type HousingField = 'income' | 'value' | 'age' | 'rooms' | 'occupancy' | 'population';

type HousingBrush = { source: string; extent: [number, number, number, number] } | null;

const housingRows = housingSource.points;

const housingFields: Record<HousingField, { label: string; max: number; ticks: number[]; format: (n: number) => string }> = {
  income: { label: 'Median income ($10,000)', max: 16, ticks: [0, 5, 10, 15], format: n => String(n) },
  value: { label: 'Median house value', max: 520000, ticks: [0, 250000, 500000], format: n => n === 0 ? '$0' : `$${n / 1000}k` },
  age: { label: 'Median house age (years)', max: 55, ticks: [0, 25, 50], format: n => String(n) },
  rooms: { label: 'Rooms per household', max: 42, ticks: [0, 20, 40], format: n => String(n) },
  occupancy: { label: 'People per household', max: 14, ticks: [0, 5, 10], format: n => String(n) },
  population: { label: 'Population', max: 12000, ticks: [0, 6000, 12000], format: n => n >= 1000 ? `${n / 1000}k` : String(n) },
};

const housingMercator = (lat: number) => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));

const housingProject = (lon: number, lat: number): [number, number] => [46 + (lon + 125) * 58, 30 + (housingMercator(42.5) - housingMercator(lat)) * 3323];

const housingCoordinates = (row: HousingRow, source: string): [number, number] => {
  if (source === 'map') { const p = housingProject(row.lon, row.lat); return [p[0] / 720, p[1] / 780]; }
  if (source === 'scatter') return [row.income / 16, 1 - row.value / 520000];
  const field = source.slice(5) as HousingField;
  return [row[field] / housingFields[field].max, 0.5];
};

let housingBrush: HousingBrush = null;

const housingListeners = new Set<() => void>();

const subscribeHousing = (listener: () => void) => { housingListeners.add(listener); return () => { housingListeners.delete(listener); }; };

const readHousingBrush = () => housingBrush;

const updateHousingBrush = (next: HousingBrush) => { housingBrush = next; housingListeners.forEach(fn => fn()); };

const housingInside = (p: [number, number], extent: [number, number, number, number]) => p[0] >= extent[0] && p[0] <= extent[2] && p[1] >= extent[1] && p[1] <= extent[3];

const useHousingSelection = () => {
  const brush = useSyncExternalStore(subscribeHousing, readHousingBrush, readHousingBrush);
  const selected = useMemo(() => new Set(brush ? housingRows.filter(row => housingInside(housingCoordinates(row, brush.source), brush.extent)).map(row => row.id) : []), [brush]);
  return { brush, selected };
};

const HousingBrushLayer = ({ source, width, height, bounds, brush, oneDimensional = false }: {
  source: string; width: number; height: number; bounds: [number, number, number, number]; brush: HousingBrush; oneDimensional?: boolean;
}) => {
  const drag = useRef<{ start: [number, number]; extent: [number, number, number, number]; mode: 'new' | 'move' | 'resize'; edgeX: number; edgeY: number } | null>(null);
  const own = brush?.source === source ? brush.extent : null;
  const [left, top, plotWidth, plotHeight] = bounds;
  const clamp = (n: number) => Math.max(0, Math.min(1, n));
  const pointer = (event: ReactPointerEvent<SVGSVGElement>): [number, number] => {
    const rect = event.currentTarget.getBoundingClientRect();
    return [clamp(((event.clientX - rect.left) / rect.width * width - left) / plotWidth), clamp(((event.clientY - rect.top) / rect.height * height - top) / plotHeight)];
  };
  const apply = (p: [number, number]) => {
    const d = drag.current; if (!d) return;
    let extent: [number, number, number, number];
    if (d.mode === 'move') {
      const dx = Math.max(-d.extent[0], Math.min(1 - d.extent[2], p[0] - d.start[0]));
      const dy = oneDimensional ? 0 : Math.max(-d.extent[1], Math.min(1 - d.extent[3], p[1] - d.start[1]));
      extent = [d.extent[0] + dx, d.extent[1] + dy, d.extent[2] + dx, d.extent[3] + dy];
    } else if (d.mode === 'resize') {
      extent = [...d.extent];
      if (d.edgeX === -1) extent[0] = Math.min(p[0], extent[2]);
      if (d.edgeX === 1) extent[2] = Math.max(p[0], extent[0]);
      if (d.edgeY === -1) extent[1] = Math.min(p[1], extent[3]);
      if (d.edgeY === 1) extent[3] = Math.max(p[1], extent[1]);
    } else extent = [Math.min(d.start[0], p[0]), oneDimensional ? 0 : Math.min(d.start[1], p[1]), Math.max(d.start[0], p[0]), oneDimensional ? 1 : Math.max(d.start[1], p[1])];
    updateHousingBrush({ source, extent });
  };
  return <svg data-housing-brush={source} data-osd-interactive="" width={width} height={height} viewBox={`0 0 ${width} ${height}`}
    role="application" aria-label={`Brush ${source === 'map' ? 'California map' : source === 'scatter' ? 'income and house value' : housingFields[source.slice(5) as HousingField].label}; drag to select, move or resize, double-click to clear`}
    tabIndex={0} style={{ position: 'absolute', inset: 0, touchAction: 'none', cursor: 'crosshair' }}
    onPointerDown={event => {
      if (event.button !== 0) return;
      event.preventDefault(); event.stopPropagation();
      const p = pointer(event), hit = own && p[0] >= own[0] - 9 / plotWidth && p[0] <= own[2] + 9 / plotWidth && p[1] >= own[1] - 9 / plotHeight && p[1] <= own[3] + 9 / plotHeight;
      const edgeX = hit && own ? Math.abs(p[0] - own[0]) < 9 / plotWidth ? -1 : Math.abs(p[0] - own[2]) < 9 / plotWidth ? 1 : 0 : 0;
      const edgeY = !oneDimensional && hit && own ? Math.abs(p[1] - own[1]) < 9 / plotHeight ? -1 : Math.abs(p[1] - own[3]) < 9 / plotHeight ? 1 : 0 : 0;
      drag.current = { start: p, extent: own ? [...own] : [p[0], p[1], p[0], p[1]], mode: hit ? edgeX || edgeY ? 'resize' : 'move' : 'new', edgeX, edgeY };
      event.currentTarget.setPointerCapture(event.pointerId);
      if (!hit) apply(p);
    }}
    onPointerMove={event => { if (drag.current) { event.stopPropagation(); apply(pointer(event)); } }}
    onPointerUp={event => { if (drag.current) { apply(pointer(event)); drag.current = null; event.currentTarget.releasePointerCapture(event.pointerId); event.stopPropagation(); } }}
    onPointerCancel={() => { drag.current = null; }}
    onClick={event => event.stopPropagation()}
    onDoubleClick={event => { event.stopPropagation(); updateHousingBrush(null); }}
    onKeyDown={event => { if (event.key === 'Delete' || event.key === 'Backspace') { event.preventDefault(); event.stopPropagation(); updateHousingBrush(null); } }}
    onTouchStartCapture={event => event.stopPropagation()} onTouchEndCapture={event => event.stopPropagation()}>
    <rect x={left} y={top} width={plotWidth} height={plotHeight} fill="transparent" />
    {own && <g><rect data-housing-selection="" x={left + own[0] * plotWidth} y={top + own[1] * plotHeight} width={(own[2] - own[0]) * plotWidth} height={(own[3] - own[1]) * plotHeight} fill={bostonAccent} fillOpacity={0.07} stroke={bostonAccent} strokeWidth={2} style={{ cursor: 'move' }} />
      {[own[0], own[2]].map((x, i) => <rect key={i} x={left + x * plotWidth - 3} y={top + (own[1] + own[3]) / 2 * plotHeight - 10} width={6} height={20} fill={bostonAccent} />)}
    </g>}
  </svg>;
};

const HousingDots = ({ source, width, height, bounds, selected, hasBrush }: { source: string; width: number; height: number; bounds: [number, number, number, number]; selected: Set<number>; hasBrush: boolean }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const context = canvas.getContext('2d'); if (!context) return;
    context.setTransform(2, 0, 0, 2, 0, 0); context.clearRect(0, 0, width, height);
    const draw = (highlight: boolean) => {
      context.fillStyle = highlight ? bostonAccent : '#000';
      context.globalAlpha = highlight ? 0.95 : hasBrush ? 0.13 : 0.36;
      for (const row of housingRows) {
        if (hasBrush && selected.has(row.id) !== highlight) continue;
        const [nx, ny] = housingCoordinates(row, source), x = bounds[0] + nx * bounds[2], y = bounds[1] + ny * bounds[3], r = highlight ? 3.5 : 2.7;
        context.beginPath(); context.arc(x, y, r, 0, Math.PI * 2); context.fill();
      }
    };
    draw(false); if (hasBrush) draw(true);
  }, [source, width, height, bounds, selected, hasBrush]);
  return <canvas ref={ref} data-housing-dots={source} data-selected-count={selected.size} width={width * 2} height={height * 2} style={{ position: 'absolute', inset: 0, width, height, pointerEvents: 'none' }} />;
};

const HousingMap = ({ left, top = 150, brush, selected, basemapOnly = false }: { left: number; top?: number; brush: HousingBrush; selected: Set<number>; basemapOnly?: boolean }) => {
  const clip = useId();
  return <div data-housing-map="" style={{ position: 'absolute', left, top, width: 720, height: 780 }}>
    <svg width={720} height={780} viewBox="0 0 720 780" style={{ position: 'absolute', inset: 0 }} aria-label="California with sampled census block groups at their recorded longitude and latitude">
      <defs><clipPath id={clip}><rect width={720} height={780} /></clipPath></defs>
      <g clipPath={`url(#${clip})`}>
        <rect width={720} height={780} fill="#f6f9fc" />
        {housingSource.shapes.map(shape => <path key={shape.name} d={shape.rings.map(ring => ring.map((p, i) => `${i ? 'L' : 'M'}${housingProject(p[0], p[1]).join(',')}`).join(' ') + 'Z').join(' ')} fill={shape.name === 'California' ? '#eef1f5' : '#fff'} stroke="#aeb8c7" strokeWidth={1.2} />)}
        <text x={496} y={208} fill="#8b929c" fontSize={24}>Nevada</text>
        <text x={258} y={22} fill="#8b929c" fontSize={24}>Oregon</text>
        <text x={608} y={611} fill="#8b929c" fontSize={24}>Arizona</text>
        <text x={87} y={595} fill="#a3b0bd" fontSize={25} transform="rotate(-30 87 595)">Pacific Ocean</text>
      </g>
    </svg>
    {!basemapOnly && <><HousingDots source="map" width={720} height={780} bounds={[0, 0, 720, 780]} selected={selected} hasBrush={!!brush} />
    <HousingBrushLayer source="map" width={720} height={780} bounds={[0, 0, 720, 780]} brush={brush} /></>}
  </div>;
};

const HousingScatter = ({ brush, selected }: { brush: HousingBrush; selected: Set<number> }) => (
  <div data-housing-scatter="" style={{ position: 'absolute', left: 924, top: 206, width: 880, height: 690 }}>
    <svg width={880} height={690} viewBox="0 0 880 690" style={{ position: 'absolute', inset: 0 }}>
      {[0, 100000, 200000, 300000, 400000, 500000].map(value => <g key={value}>
        <line x1={104} x2={856} y1={594 - value / 520000 * 554} y2={594 - value / 520000 * 554} stroke="#e9ecf0" />
        <text x={86} y={603 - value / 520000 * 554} textAnchor="end" fontSize={25} fill="#626b77">${value / 1000}k</text>
      </g>)}
      {[0, 5, 10, 15].map(value => <text key={value} x={104 + value / 16 * 752} y={632} textAnchor="middle" fontSize={25} fill="#626b77">{value}</text>)}
      <path d="M104 40 V594 H856" fill="none" stroke="#7b8594" strokeWidth={1.5} />
      <text x={104} y={28} fontSize={30}>Median house value</text>
      <text x={480} y={684} textAnchor="middle" fontSize={30}>Median income ($10,000)</text>
    </svg>
    <HousingDots source="scatter" width={880} height={690} bounds={[104, 40, 752, 554]} selected={selected} hasBrush={!!brush} />
    <HousingBrushLayer source="scatter" width={880} height={690} bounds={[104, 40, 752, 554]} brush={brush} />
  </div>
);

type HousingBrushGroup = { id: number; color: string; selected: Set<number>; isCurrent: boolean };

const HousingHistogram = ({ field, left, top, brush, selected, interactive = true, rows = housingRows, groups }: { field: HousingField; left: number; top: number; brush: HousingBrush; selected: Set<number>; interactive?: boolean; rows?: HousingRow[]; groups?: HousingBrushGroup[] }) => {
  const config = housingFields[field], n = 28;
  const all = useMemo(() => { const bins = Array(n).fill(0) as number[]; rows.forEach(row => bins[Math.min(n - 1, Math.floor(row[field] / config.max * n))]++); return bins; }, [field, config.max, rows]);
  const chosen = Array(n).fill(0) as number[];
  rows.forEach(row => { if (selected.has(row.id)) chosen[Math.min(n - 1, Math.floor(row[field] / config.max * n))]++; });
  const grouped = groups?.map(group => {
    const bins = Array(n).fill(0) as number[];
    rows.forEach(row => { if (group.selected.has(row.id)) bins[Math.min(n - 1, Math.floor(row[field] / config.max * n))]++; });
    return { ...group, bins };
  });
  const max = Math.ceil(Math.max(...all) / 100) * 100;
  return <div data-housing-histogram={field} data-hist-total={all.reduce((a, b) => a + b, 0)} data-hist-selected={chosen.reduce((a, b) => a + b, 0)} data-hist-brush-counts={grouped ? JSON.stringify(grouped.map(group => ({ id: group.id, color: group.color, count: group.bins.reduce((a, b) => a + b, 0) }))) : undefined} style={{ position: 'absolute', left, top, width: 436, height: 232 }}>
    <svg width={436} height={232} viewBox="0 0 436 232">
      <text x={48} y={26} fontSize={27}>{config.label}</text>
      <text x={47} y={65} fontSize={20} textAnchor="end" fill="#79818c">{max}</text>
      <text x={47} y={190} fontSize={20} textAnchor="end" fill="#79818c">0</text>
      <line x1={48} y1={60} x2={422} y2={60} stroke="#edf0f4" />
      {all.map((count, i) => <g key={i}><rect x={48 + i * 374 / n + 1} y={184 - count / max * 124} width={374 / n - 2} height={count / max * 124} fill={brush ? '#dce1e9' : bostonAccent} fillOpacity={brush ? 1 : 0.65} />
        {brush && (grouped ? grouped.map((group, g) => {
          const below = grouped.slice(0, g).reduce((sum, previous) => sum + previous.bins[i], 0);
          return <rect key={group.id} data-hist-brush={group.id} x={48 + i * 374 / n + 1} y={184 - (below + group.bins[i]) / max * 124} width={374 / n - 2} height={group.bins[i] / max * 124} fill={group.color} />;
        }) : <rect x={48 + i * 374 / n + 1} y={184 - chosen[i] / max * 124} width={374 / n - 2} height={chosen[i] / max * 124} fill={bostonAccent} />)}
      </g>)}
      <line x1={48} y1={184} x2={422} y2={184} stroke="#8993a0" />
      {config.ticks.map(tick => <text key={tick} x={48 + tick / config.max * 374} y={218} fontSize={22} textAnchor={tick === 0 ? 'start' : tick === config.max ? 'end' : 'middle'} fill="#626b77">{config.format(tick)}</text>)}
    </svg>
    {interactive && <HousingBrushLayer source={`hist-${field}`} width={436} height={232} bounds={[48, 60, 374, 124]} brush={brush} oneDimensional />}
  </div>;
};

const HousingScene = ({ view, showSemanticQuestion = false }: { view: 'map' | 'scatter' | 'histograms'; showSemanticQuestion?: boolean }) => {
  const { brush, selected } = useHousingSelection();
  return <section data-housing-scene={view} data-selection-source={brush?.source ?? ''} data-selected-ids={[...selected].join(',')} style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <HousingMap left={96} top={70} brush={brush} selected={selected} />
    {view === 'scatter' && <HousingScatter brush={brush} selected={selected} />}
    {view === 'histograms' && <>
      <HousingHistogram field="income" left={910} top={88} brush={brush} selected={selected} />
      <HousingHistogram field="value" left={1382} top={88} brush={brush} selected={selected} />
      <HousingHistogram field="age" left={910} top={354} brush={brush} selected={selected} />
      <HousingHistogram field="rooms" left={1382} top={354} brush={brush} selected={selected} />
      <HousingHistogram field="occupancy" left={910} top={620} brush={brush} selected={selected} />
      <HousingHistogram field="population" left={1382} top={620} brush={brush} selected={selected} />
    </>}
    {view === 'histograms' && !showSemanticQuestion && <p data-housing-gap-caption="" style={{ position: 'absolute', left: 80, right: 80, top: 924, margin: 0, fontSize: 44, lineHeight: 1.2, fontWeight: 400, whiteSpace: 'nowrap' }}><span style={{ fontWeight: '700' }}>{'A gap (or distortion) '}</span>exists between the visualization and the original multidimensional data</p>}
    {showSemanticQuestion && <h1 data-semantic-brushing-question="" style={{ position: 'absolute', left: 80, right: 80, top: 924, margin: 0, fontSize: 44, lineHeight: 1.2, fontWeight: 400, letterSpacing: -1.1, whiteSpace: 'nowrap', translate: '12.36px -21.59px' }}>
      {'Novice analysts cannot define and analyze '}<strong>multidimensional clusters</strong><br />
      that align with their analytical intent.
    </h1>}
  <PageCounter />
  </section>;
};

const SemanticBrushingQuestion: Page = () => <HousingScene view="histograms" showSemanticQuestion />;

const IntelligentBrushingSolution: Page = () => {
  const arrowId = useId();
  // Actual records illustrate the two views; recommendation itself is conceptual here.
  const records = housingRows.filter(row => row.income >= 4 && row.income <= 6 && row.value >= 190000 && row.value <= 280000).slice(0, 7);
  const marked = new Set(records.map(row => row.id));
  const context = housingRows.filter((_, i) => i % 10 === 0);
  const visibleRows = [...context, ...records];
  const minIncome = Math.min(...visibleRows.map(row => row.income)), maxIncome = Math.max(...visibleRows.map(row => row.income));
  const minValue = Math.min(...visibleRows.map(row => row.value)), maxValue = Math.max(...visibleRows.map(row => row.value));
  const scatterX = (income: number) => 16 + (income - minIncome) / (maxIncome - minIncome) * 528;
  const scatterY = (value: number) => 428 - (value - minValue) / (maxValue - minValue) * 412;
  const columns: HousingField[] = ['income', 'value', 'age', 'rooms', 'occupancy', 'population'];
  const cell = (row: HousingRow, field: HousingField) => field === 'value' ? `$${Math.round(row.value / 1000)}k` : field === 'income' || field === 'rooms' || field === 'occupancy' ? row[field].toFixed(2) : String(row[field]);
  return <section data-intelligent-brushing-solution="" style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <h1 style={{ position: 'absolute', left: 96, top: 86, margin: 0, fontSize: 56, lineHeight: 1.2, fontWeight: 400, whiteSpace: 'nowrap' }}>
      <strong>{''}</strong><span style={{ fontWeight: '400' }}>{'Make '}</span>brushing intelligent to...
    </h1>
    <p style={{ position: 'absolute', left: 96, top: 306, margin: 0, fontSize: 34, fontStyle: 'italic', translate: '94.99px 35px' }}>Visualization</p>
    <p style={{ position: 'absolute', left: 1232, top: 341, margin: 0, fontSize: 34, fontStyle: 'italic', translate: '11px 0px' }}>Dataset</p>
    <svg data-solution-scatter="" width={560} height={444} viewBox="0 0 560 444" role="img" aria-label="Scatterplot of median income and house value, with a brushed set of points highlighted" style={{ position: 'absolute', left: 96, top: 370, minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '468.74px', height: '444px', translate: '72px 0px' }}>
      {context.map(row => <circle key={row.id} cx={scatterX(row.income)} cy={scatterY(row.value)} r={4} fill="#000" fillOpacity={0.35} />)}
      <rect x={scatterX(4) - 12} y={scatterY(280000) - 12} width={scatterX(6) - scatterX(4) + 24} height={scatterY(190000) - scatterY(280000) + 24} fill={bostonAccent} fillOpacity={0.06} stroke={bostonAccent} strokeWidth={2} />
      {records.map(row => <circle key={row.id} cx={scatterX(row.income)} cy={scatterY(row.value)} r={6} fill={bostonAccent} />)}
    </svg>
    <div data-solution-table="" style={{ position: 'absolute', left: 1232, top: 414, width: 468.74, height: 356, translate: '11px 0px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', fontSize: 22, textAlign: 'center' }} aria-label="Six attributes of the highlighted census block groups">
        <thead><tr style={{ height: 48, background: '#f0f3f8', borderBottom: '1px solid #c7d0de' }}>
          <th style={{ fontWeight: 400 }}>Income</th>
          <th style={{ fontWeight: 400 }}>Value</th>
          <th style={{ fontWeight: 400 }}>Age</th>
          <th style={{ fontWeight: 400 }}>Rooms</th>
          <th style={{ fontWeight: 400 }}>People</th>
          <th style={{ fontWeight: 400 }}>Pop.</th>
        </tr></thead>
        <tbody>{records.map((row, i) => <tr key={row.id} data-solution-row={row.id} style={{ height: 44, background: i % 2 ? '#f8faff' : '#fff', color: marked.has(row.id) ? bostonAccent : '#000', borderBottom: '1px solid #e4e8ef' }}>
          {columns.map(field => <td key={field} style={{ padding: 0 }}>{cell(row, field)}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
      <defs><marker id={arrowId} viewBox="0 0 12 12" refX={11} refY={6} markerWidth={12} markerHeight={12} orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1 L11 6 L1 11" fill="none" stroke={bostonAccent} strokeWidth={2.4} /></marker></defs>
      <path data-solution-arrow="explore" d="M652.74 446 C780 306 1088 306 1216 446" fill="none" stroke={bostonAccent} strokeWidth={3} strokeLinecap="round" markerEnd={`url(#${arrowId})`} />
      <path data-solution-arrow="recommend" d="M1216 738 C1088 874 780 874 652.74 738" fill="none" stroke={bostonAccent} strokeWidth={3} strokeLinecap="round" markerEnd={`url(#${arrowId})`} />
    </svg>
    <p style={{ position: 'absolute', left: 480, top: 204, width: 928, margin: 0, fontSize: '40px', lineHeight: 1.3, textAlign: 'center', whiteSpace: 'nowrap', translate: '0px 41.95px' }}>
      (1) Continuously <span style={{ fontWeight: '700' }}>analyze</span> multidimensional data
    </p>
    <p style={{ position: 'absolute', left: 480, top: 940, width: 928, margin: 0, fontSize: '40px', lineHeight: 1.3, textAlign: 'center', whiteSpace: 'nowrap', translate: '0px -72.96px' }}>
      (2) <span style={{ fontWeight: '700' }}>Recommend</span> the next points to brush
    </p>
  <PageCounter />
  </section>;
};

const workflowStages = [
  { step: 0, role: 'Human', title: 'Inspect the projection', text: 'Look for visual clusters that reflect the multidimensional data.' },
  { step: 1, role: 'Human', title: 'Find a starting point', text: 'Find a region of interest and start brushing.' },
  { step: 2, role: 'Machine', title: 'Construct the lens', text: 'Enclose the seed points with an inner and an outer boundary.' },
  { step: 2, role: 'Machine', title: 'Relocate the points', text: 'Move non-neighbors in high-dimensional space out and bring neighbors closer.' },
  { step: 3, role: 'Human', title: 'Start brushing', text: 'Press the mouse button to select the points under the painter.' },
  { step: 3, role: 'Machine', title: 'Update the lens', text: 'Use the brushed points to reshape the lens and relocate nearby points.' },
  { step: 3, role: 'Human', title: 'Continue brushing', text: 'Drag to capture more points. The machine expands the lens and relocates nearby points as the selection grows.' },
  { step: 3, role: 'Human', title: 'Confirm the cluster', text: 'Release the mouse button to finish the selection.' },
] as const;

const workflowPoints = dabWorkflowSource.frames.map(frame => frame.map(point => {
  const dx = point.x - 598, dy = point.y - 568, distance = Math.hypot(dx, dy);
  const scale = distance > 100 ? 1 + .32 * (distance - 100) / distance : 1;
  return { ...point, x: 598 + dx * scale, y: 568 + dy * scale };
}));

const workflowColors: Record<string, number[]> = { dark: [35, 35, 35], gray: [176, 180, 186], white: [255, 255, 255], seed: [31, 61, 140] };

const workflowMix = (a: number, b: number, t: number) => a + (b - a) * t;

const workflowContour = (polygon: number[][] | null, radius: number) => Array.from({ length: 60 }, (_, i) => {
  if (!polygon) { const a = -Math.PI * .62 - i / 60 * Math.PI * 2; return [610 + Math.cos(a) * radius, 560 + Math.sin(a) * radius]; }
  const d = i / 60 * polygon.length, k = Math.floor(d), t = d - k;
  return polygon[k].map((v, axis) => workflowMix(v, polygon[(k + 1) % polygon.length][axis], t));
});

const workflowSnapshot = (stage: number) => ({
  points: workflowPoints[stage === 6 ? 7 : stage].map(p => ({ x: p.x, y: p.y, color: workflowColors[p.type], selected: p.type === 'seed' ? 1 : 0 })),
  inner: workflowContour(stage >= 5 ? dabWorkflowSource.inner : null, 96),
  outer: workflowContour(stage >= 5 ? dabWorkflowSource.outer : null, 225),
  lens: stage >= 2 && stage <= 6 ? 1 : 0,
  painter: stage > 0 && stage < 7 ? 1 : 0,
  cursor: stage === 0 ? [300, 790] : stage === 6 ? [660, 648] : stage === 7 ? [345, 385] : stage >= 4 ? [602, 551] : [598, 568],
});

type WorkflowSnapshot = ReturnType<typeof workflowSnapshot>;

const mixWorkflow = (a: WorkflowSnapshot, b: WorkflowSnapshot, t: number): WorkflowSnapshot => ({
  points: a.points.map((p, i) => ({ x: workflowMix(p.x, b.points[i].x, t), y: workflowMix(p.y, b.points[i].y, t), color: p.color.map((c, j) => workflowMix(c, b.points[i].color[j], t)), selected: workflowMix(p.selected, b.points[i].selected, t) })),
  inner: a.inner.map((p, i) => p.map((v, j) => workflowMix(v, b.inner[i][j], t))),
  outer: a.outer.map((p, i) => p.map((v, j) => workflowMix(v, b.outer[i][j], t))),
  lens: workflowMix(a.lens, b.lens, t), painter: workflowMix(a.painter, b.painter, t), cursor: a.cursor.map((v, i) => workflowMix(v, b.cursor[i], t)),
});

const workflowBrushingFrames = (() => {
  let frame = workflowSnapshot(5);
  const startPoints = frame.points.map(p => ({ ...p }));
  const desired = workflowPoints[7];
  const selected = new Set(frame.points.flatMap((p, i) => p.selected ? [i] : []));
  const initialCount = selected.size;
  const candidates = desired.flatMap((p, i) => p.type === 'seed' ? [i] : []);
  const frames: WorkflowSnapshot[] = [frame];
  const center = [610, 560];
  const baseInner = frame.inner.map(p => [...p]), baseOuter = frame.outer.map(p => [...p]);
  let target = -1, settle = 0;
  for (let tick = 0; tick < 720; tick++) {
    const remaining = candidates.filter(i => !selected.has(i));
    if (target < 0 || selected.has(target)) target = remaining.reduce((best, i) => best < 0 || Math.hypot(frame.points[i].x - frame.cursor[0], frame.points[i].y - frame.cursor[1]) < Math.hypot(frame.points[best].x - frame.cursor[0], frame.points[best].y - frame.cursor[1]) ? i : best, -1);
    const cursor = [...frame.cursor];
    if (target >= 0) {
      const dx = frame.points[target].x - cursor[0], dy = frame.points[target].y - cursor[1], distance = Math.hypot(dx, dy);
      const move = Math.min(1, 1.65 / Math.max(distance, 1));
      cursor[0] += dx * move; cursor[1] += dy * move;
    }
    for (const i of candidates) {
      if (Math.hypot(frame.points[i].x - cursor[0], frame.points[i].y - cursor[1]) <= 54) selected.add(i);
    }
    const growth = (selected.size - initialCount) / (candidates.length - initialCount);
    const points = frame.points.map((point, i) => {
      const mid = workflowPoints[6][i], end = desired[i];
      const pose = growth < .45
        ? { x: workflowMix(startPoints[i].x, mid.x, growth / .45), y: workflowMix(startPoints[i].y, mid.y, growth / .45) }
        : { x: workflowMix(mid.x, end.x, (growth - .45) / .55), y: workflowMix(mid.y, end.y, (growth - .45) / .55) };
      return { x: workflowMix(point.x, pose.x, .065), y: workflowMix(point.y, pose.y, .065), color: selected.has(i) ? workflowColors.seed : startPoints[i].color, selected: selected.has(i) ? 1 : 0 };
    });
    const inner = baseInner.map((base, i) => {
      const dx = base[0] - center[0], dy = base[1] - center[1], radius = Math.hypot(dx, dy), ux = dx / radius, uy = dy / radius;
      const support = Math.max(...[...selected].map(k => (points[k].x - center[0]) * ux + (points[k].y - center[1]) * uy)) + 23;
      const oldRadius = Math.hypot(frame.inner[i][0] - center[0], frame.inner[i][1] - center[1]);
      const newRadius = workflowMix(oldRadius, Math.max(oldRadius, radius, support), .1);
      return [center[0] + ux * newRadius, center[1] + uy * newRadius];
    });
    const outer = baseOuter.map((base, i) => {
      const dx = base[0] - center[0], dy = base[1] - center[1], radius = Math.hypot(dx, dy), ux = dx / radius, uy = dy / radius;
      const increase = Math.hypot(inner[i][0] - center[0], inner[i][1] - center[1]) - Math.hypot(baseInner[i][0] - center[0], baseInner[i][1] - center[1]);
      const oldRadius = Math.hypot(frame.outer[i][0] - center[0], frame.outer[i][1] - center[1]);
      const newRadius = workflowMix(oldRadius, Math.max(oldRadius, radius + increase * 1.4 + growth * 20), .1);
      return [center[0] + ux * newRadius, center[1] + uy * newRadius];
    });
    frame = { ...frame, points, cursor, inner, outer };
    frames.push(frame);
    if (selected.size === candidates.length && ++settle >= 110) break;
  }
  // Settle exactly at the final PPT pose before the release click; no point jumps on release.
  const last = frames[frames.length - 1];
  frames[frames.length - 1] = { ...last, points: desired.map(p => ({ x: p.x, y: p.y, color: workflowColors[p.type], selected: p.type === 'seed' ? 1 : 0 })) };
  return frames;
})();

const workflowEndSnapshot = (stage: number): WorkflowSnapshot => {
  const lastBrush = workflowBrushingFrames[workflowBrushingFrames.length - 1];
  return stage === 6 ? lastBrush : stage === 7
    ? { ...workflowSnapshot(7), inner: lastBrush.inner, outer: lastBrush.outer }
    : workflowSnapshot(stage);
};

let workflowHandoff: { stage: number; scene: WorkflowSnapshot } | null = null;

const BrushingWorkflowScene = ({ stage }: { stage: number }) => {
  const leaderId = useId();
  const active = useIsActivePage();
  const [scene, setScene] = useState(() => workflowEndSnapshot(stage));
  const entry = useRef<{ from: WorkflowSnapshot; skip: boolean } | null>(null);
  useLayoutEffect(() => {
    const to = workflowEndSnapshot(stage);
    if (!active) { entry.current = null; setScene(to); return; }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Cache the entry decision across React Strict Mode's effect replay.
    if (!entry.current) entry.current = {
      from: workflowHandoff?.stage === stage - 1 ? workflowHandoff.scene : workflowEndSnapshot(Math.max(0, stage - 1)),
      skip: stage === 0 || reduced || (workflowHandoff !== null && workflowHandoff.stage > stage),
    };
    const publish = (frame: WorkflowSnapshot) => {
      workflowHandoff = { stage, scene: frame };
      setScene(frame);
    };
    if (entry.current.skip) { publish(to); return; }
    const from = entry.current.from;
    publish(from);
    let raf = 0;
    const start = performance.now();
    const leadIn = 180;
    const duration = stage === 6 ? leadIn + workflowBrushingFrames.length / 60 * 1000 : stage === 3 || stage === 5 ? 1400 : 850;
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - start);
      const raw = Math.min(1, elapsed / duration), t = raw * raw * (3 - 2 * raw);
      let next = mixWorkflow(from, to, t);
      if (stage === 6) {
        if (elapsed < leadIn) {
          const lead = elapsed / leadIn;
          next = mixWorkflow(from, workflowBrushingFrames[0], lead * lead * (3 - 2 * lead));
        } else {
          const position = Math.min(1, (elapsed - leadIn) / (duration - leadIn)) * (workflowBrushingFrames.length - 1), index = Math.floor(position);
          next = mixWorkflow(workflowBrushingFrames[index], workflowBrushingFrames[Math.min(index + 1, workflowBrushingFrames.length - 1)], position - index);
        }
      }
      publish(next);
      if (raw < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, active]);
  const detail = workflowStages[stage], roleColor = detail.role === 'Human' ? bostonAccent : '#8b303a';
  const contour = (points: number[][]) => points.map(p => p.join(',')).join(' ');
  const neighborLeader = (startX: number, startY: number, pointIndex: number) => {
    const point = scene.points[pointIndex];
    const dx = startX - point.x, dy = startY - point.y, distance = Math.hypot(dx, dy);
    // End the arrow tip at the circle's outer edge, along the actual leader direction.
    const radius = 16 + .65;
    return `M${startX} ${startY} L${point.x + dx / distance * radius} ${point.y + dy / distance * radius}`;
  };
  return <section onClick={event => {
    if (!active) return;
    event.stopPropagation();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
  }} data-dab-workflow="" data-workflow-stage={stage} style={{ width: '100%', height: '100%', position: 'relative', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <svg width={1250} height={1030} viewBox="150 200 1020 860" style={{ position: 'absolute', left: 30, top: -5, overflow: 'visible' }} role="img" aria-label={`${detail.role}: ${detail.title}. Animated projection with 35 points.`}>
      <polygon data-workflow-lens="outer" points={contour(scene.outer)} fill="none" stroke="#b9653c" strokeWidth={3} opacity={scene.lens} />
      <polygon data-workflow-lens="inner" points={contour(scene.inner)} fill={bostonAccent} fillOpacity={.035 * scene.lens} stroke={bostonAccent} strokeWidth={3} opacity={scene.lens} />
      {scene.points.map((p, i) => <circle key={i} data-workflow-point={i} data-selected={p.selected > .5 ? "true" : "false"} cx={p.x} cy={p.y} r={16} fill={`rgb(${p.color.map(Math.round).join(',')})`} stroke={p.selected > .5 ? bostonAccent : '#383838'} strokeWidth={p.selected > .5 ? 3 : 1.3} strokeDasharray={stage > 0 && stage < 4 && p.selected > .5 ? '3 4' : undefined} />)}
      <g opacity={scene.painter} transform={`translate(${scene.cursor[0]} ${scene.cursor[1]})`}>
        <circle data-workflow-painter="" r={54} fill="#48b778" fillOpacity={.24} />
        {stage >= 4 && <circle r={54} fill="none" stroke="#32975c" strokeWidth={1.5} strokeDasharray="5 6" />}
      </g>
      <g opacity={stage === 0 ? 0 : 1} transform={`translate(${scene.cursor[0]} ${scene.cursor[1]})`}>
        <path d="M0 0 L0 44 L11 33 L21 55 L29 51 L18 29 L35 28 Z" fill="#111" stroke="#fff" strokeWidth={3} strokeLinejoin="round" />
        {stage >= 4 && stage <= 6 && <circle cx={-11} cy={-11} r={7} fill="#32975c" />}
      </g>
      {stage === 1 && <g fontSize={27} fill="#000">
        <defs><marker id={leaderId} viewBox="0 0 8 8" refX={8} refY={4} markerWidth={8} markerHeight={8} orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0 L8 4 L0 8" fill="none" stroke="#555" strokeWidth={1.3} /></marker></defs>
        <text textAnchor="end" dominantBaseline="middle"><tspan x={430} y={399}>False</tspan><tspan x={430} y={433}>neighbors</tspan></text>
        <path data-neighbor-leader="false" d={neighborLeader(442, 416, 13)} stroke="#555" strokeWidth={1.3} fill="none" markerEnd={`url(#${leaderId})`} />
        <text dominantBaseline="middle"><tspan x={1030} y={820}>Missing</tspan><tspan x={1030} y={854}>neighbors</tspan></text>
        <path data-neighbor-leader="missing" d={neighborLeader(1018, 837, 22)} stroke="#555" strokeWidth={1.3} fill="none" markerEnd={`url(#${leaderId})`} />
      </g>}
      {stage === 2 && <g fontSize={26}>
        <text x={300} y={322} fill="#b9653c">Outer boundary</text><path d="M487 330 L509 362" stroke="#b9653c" />
        <text x={880} y={405} fill={bostonAccent}>Inner boundary</text><path d="M868 415 L697 517" stroke={bostonAccent} />
      </g>}
    </svg>
    <div style={{ position: 'absolute', left: 1320, top: 296, width: 500 }}>
      <div style={{ display: 'flex', gap: 44, fontSize: 29, marginBottom: 44 }}>
        {['Human', 'Machine'].map(role => { const engaged = detail.role === role || stage === 6; const color = role === 'Human' ? bostonAccent : '#8b303a'; return <span key={role} style={{ color: engaged ? color : '#a5a9af', fontWeight: engaged ? 700 : 400, borderBottom: engaged ? `4px solid ${color}` : '4px solid transparent', paddingBottom: 12 }}>{role}</span>; })}
      </div>
      <h2 data-workflow-action="" style={{ margin: '0 0 26px', fontSize: 46, lineHeight: 1.16, fontWeight: 700, color: roleColor }}>{detail.title}</h2>
      <p style={{ margin: 0, fontSize: 34, lineHeight: 1.45 }}>{stage === 6 ? <>Drag to capture more points.<br /><span style={{ color: '#8b303a' }}>The machine expands the lens and relocates nearby points as the selection grows.</span></> : detail.text}</p>
      {stage >= 4 && <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 15, fontSize: 27 }}><span style={{ width: 17, height: 17, borderRadius: '50%', background: bostonAccent }} />Brushed points</div>}
    </div>
  <PageCounter />
  </section>;
};

const BrushingInspectProjection: Page = () => <BrushingWorkflowScene stage={0} />;

const BrushingFindStart: Page = () => <BrushingWorkflowScene stage={1} />;

const BrushingConstructLens: Page = () => <BrushingWorkflowScene stage={2} />;

const BrushingRelocatePoints: Page = () => <BrushingWorkflowScene stage={3} />;

const BrushingStartSelection: Page = () => <BrushingWorkflowScene stage={4} />;

const BrushingUpdateLens: Page = () => <BrushingWorkflowScene stage={5} />;

const BrushingContinueSelection: Page = () => <BrushingWorkflowScene stage={6} />;

const BrushingConfirmCluster: Page = () => <BrushingWorkflowScene stage={7} />;

const dabBrushColors = [bostonAccent, '#b43c45', '#287f82', '#a67624', '#7e5aa3', '#4b8849', '#b36032', '#76609a', '#4c7191', '#8a5468'];

type LiveDabPoint = { index: number; x: number; y: number; originalX: number; originalY: number; brushed: boolean; color: string };

type LiveDabBrush = { id: number; color: string; points: number[]; isCurrent: boolean };

type LiveDabFrame = {
  mode: string; points: LiveDabPoint[]; seedPoints: number[]; brushes: LiveDabBrush[];
  painter?: { x: number; y: number; radius: number; erasing: boolean };
  lens?: { type: 'circle'; x: number; y: number; radius: number; opacity: number } | { type: 'hull'; hull: number[][]; outerHull: number[][]; opacity: number };
};

type LiveDabEngine = {
  tick: (time?: number) => LiveDabFrame; getFrame: () => LiveDabFrame;
  pointerMove: (p: { x: number; y: number; shiftKey?: boolean }) => void;
  pointerDown: (p: { x: number; y: number; shiftKey?: boolean }) => void;
  pointerUp: () => void; wheel: (delta: number) => void; reset: () => void; addBrush: (restoreOriginal?: boolean) => number;
  restoreOriginalPositions: () => void;
};

const createHullDabEngine = (runtime: any, hullLogic: any, dataset: any, options: Record<string, unknown>): LiveDabEngine => {
  class HullDabEngine extends runtime.BrushingEngine {
    hullAnimation = false;
    pendingHullUpdate = false;
    pendingRelease = false;
    hullNeedsRelaxation = false;
    lastHullSelectionKey = '';
    frozenPositions = new Map<number, number[]>();

    colorFor(id: number) { return dabBrushColors[id % dabBrushColors.length]; }
    pointsWithinPainter() {
      const occupied = new Set<number>();
      this.brushes.forEach((points: Set<number>, id: number) => {
        if (id !== this.currentBrushId) points.forEach(index => occupied.add(index));
      });
      return super.pointsWithinPainter().filter((index: number) => !occupied.has(index));
    }
    addWithinPainter() {
      const brush: Set<number> = this.getCurrentBrushSet();
      this.pointsWithinPainter().forEach((index: number) => {
        if (!brush.has(index)) {
          brush.add(index);
          this.frozenPositions.set(index, [...this.currLd[index]]);
        }
      });
      this.applyDabRelocation(this.now());
    }
    eraseWithinPainter() {
      const brush: Set<number> = this.getCurrentBrushSet();
      this.pointsWithinPainter().forEach((index: number) => {
        if (brush.delete(index)) this.frozenPositions.delete(index);
      });
      this.applyDabRelocation(this.now());
    }
    restoreFrozenPositions() {
      this.frozenPositions?.forEach((position, index) => { this.currLd[index] = [...position]; });
    }
    startAnimation(to: number[][], duration: number, timestamp: number, finalMode?: string) {
      const targets = to.map((point, index) => [...(this.frozenPositions?.get(index) ?? point)]);
      super.startAnimation(targets, duration, timestamp, finalMode);
    }
    restoreOriginalPositions() {
      this.animation = undefined; this.hullAnimation = false;
      this.pendingHullUpdate = false; this.pendingRelease = false; this.hullNeedsRelaxation = false; this.lastHullSelectionKey = '';
      this.currLd = this.originalLd.map((point: number[]) => [...point]);
      this.frozenPositions.forEach((_, index) => this.frozenPositions.set(index, [...this.originalLd[index]]));
      this.mode = 'inspect'; this.pointer = undefined; this.erasing = false;
      this.seedPoints = []; this.lens = undefined;
      this.hoverStartedAt = undefined; this.hoverSeedKey = ''; this.hoverPointer = undefined;
    }
    addBrush(restoreOriginal = false) {
      if (!this.getCurrentBrushSet().size || this.brushes.size >= this.options.maxBrushes) return this.currentBrushId;
      this.advanceAnimation(this.now());
      this.restoreFrozenPositions();
      this.animation = undefined; this.hullAnimation = false;
      this.pendingHullUpdate = false; this.pendingRelease = false; this.hullNeedsRelaxation = false; this.lastHullSelectionKey = '';
      if (restoreOriginal) this.restoreOriginalPositions();
      this.currentBrushId = Math.max(...this.brushes.keys()) + 1;
      this.brushes.set(this.currentBrushId, new Set());
      this.modifiedBrushes.set(this.currentBrushId, new Set());
      // The next brush starts from the scene the user was viewing.
      this.mode = 'inspect'; this.pointer = undefined; this.erasing = false;
      this.seedPoints = []; this.lens = undefined;
      this.hoverStartedAt = undefined; this.hoverSeedKey = ''; this.hoverPointer = undefined;
      return this.currentBrushId;
    }

    applyDabRelocation(timestamp: number) {
      const brush: Set<number> = this.getCurrentBrushSet();
      const target = [...brush];
      if (!target.length) {
        this.hullAnimation = false; this.pendingHullUpdate = false; this.hullNeedsRelaxation = false;
        this.lastHullSelectionKey = ''; this.lens = undefined;
        super.applyDabRelocation(timestamp); return;
      }
      // Original updateLensWhileBrushing: hull of the currently brushed positions.
      const positions = target.map(index => [...this.currLd[index]]);
      let hull = hullLogic.convexHull(positions.map(point => [...point]));
      if (!hull || hull.length < 3) {
        // A collinear/coincident selection needs a finite thin hull, not a circle.
        const xs = positions.map(p => p[0]), ys = positions.map(p => p[1]);
        const x0 = Math.min(...xs) - 1, x1 = Math.max(...xs) + 1;
        const y0 = Math.min(...ys) - 1, y1 = Math.max(...ys) + 1;
        hull = hullLogic.convexHull([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]);
      }
      let outerHull = hullLogic.extendHull(hull, this.options.painterRadius * 2);
      if (!outerHull.every((p: number[]) => p.every(Number.isFinite))) outerHull = hull;
      this.lens = { type: 'hull', hull, outerHull, opacity: 1 };
      const key = `${this.options.painterRadius}:${target.join(',')}`;
      // Finish a bounded relocation before updating its target. Pointer events do not
      // restart the animation; selection and the hull still update during the drag.
      if (this.animation && this.hullAnimation) {
        this.pendingHullUpdate ||= key !== this.lastHullSelectionKey;
        return;
      }
      this.lastHullSelectionKey = key; this.pendingHullUpdate = false;
      const closeness = this.closeness(target, Math.max(1, target.length));
      const nextLd = hullLogic.findRelocationPositionsHull(
        brush, hull, this.currLd, closeness, this.options.painterRadius,
        Math.max(this.options.width, this.options.height),
      );
      // The upstream hull solver caps each pass at 0.3 × painter radius.
      // Continue these bounded passes while brushing, rather than stopping after one.
      this.hullNeedsRelaxation = nextLd.some((point: number[], index: number) =>
        !this.frozenPositions.has(index) && Math.hypot(point[0] - this.currLd[index][0], point[1] - this.currLd[index][1]) > .05);
      if (!this.hullNeedsRelaxation) return;
      this.startAnimation(nextLd, this.options.brushRelocationDuration, timestamp);
      this.hullAnimation = true;
    }

    advanceAnimation(timestamp: number) {
      if (!this.hullAnimation || !this.animation) { super.advanceAnimation(timestamp); this.restoreFrozenPositions(); return; }
      const animation = this.animation;
      const progress = Math.max(0, Math.min(1, (timestamp - animation.startedAt) / animation.duration));
      // Same easing as original performRelocationDuringBrushing.
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      this.currLd = animation.from.map((point: number[], i: number) => [
        point[0] + (animation.to[i][0] - point[0]) * eased,
        point[1] + (animation.to[i][1] - point[1]) * eased,
      ]);
      this.restoreFrozenPositions();
      if (progress >= 1) { this.animation = undefined; this.hullAnimation = false; }
    }

    tick(timestamp = performance.now()) {
      super.tick(timestamp);
      if (!this.animation) {
        if (this.pendingHullUpdate && this.mode === 'brush') this.applyDabRelocation(timestamp);
        if (!this.animation && this.pendingRelease) {
          this.pendingRelease = false; this.hullNeedsRelaxation = false; super.pointerUp();
        } else if (!this.animation && !this.pendingRelease && this.mode === 'brush' && this.hullNeedsRelaxation) {
          // Points arriving under a stationary painter join the selection too.
          if (this.erasing) this.eraseWithinPainter(); else this.addWithinPainter();
        }
      }
      return this.getFrame();
    }
    pointerMove(pointer: { x: number; y: number; shiftKey?: boolean }) {
      if (this.pendingRelease) { this.pointer = [pointer.x, pointer.y]; return; }
      super.pointerMove(pointer);
    }
    pointerDown(pointer: { x: number; y: number; shiftKey?: boolean }) {
      this.advanceAnimation(this.now());
      this.pendingRelease = false; this.pendingHullUpdate = false; this.hullAnimation = false;
      super.pointerDown(pointer);
    }
    pointerUp() {
      if (this.mode === 'brush' && (this.animation && this.hullAnimation || this.pendingHullUpdate)) this.pendingRelease = true;
      else super.pointerUp();
    }
    reset() {
      this.hullAnimation = false; this.pendingHullUpdate = false; this.pendingRelease = false; this.hullNeedsRelaxation = false;
      this.lastHullSelectionKey = ''; this.frozenPositions.clear(); super.reset();
    }
  }
  return new HullDabEngine(dataset, options) as unknown as LiveDabEngine;
};

const dabRows = (() => {
  const indices = housingRows.map((_, i) => i);
  let seed = 20261010;
  for (let i = indices.length - 1; i > 0; i--) {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    const j = Math.floor(seed / 4294967296 * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const keep = new Set(indices.slice(0, 1000));
  return housingRows.filter((_, i) => keep.has(i));
})();

const dabMapPositions = dabRows.map(row => housingProject(row.lon, row.lat));

const dabMinX = Math.min(...dabMapPositions.map(p => p[0])), dabMinY = Math.min(...dabMapPositions.map(p => p[1]));

const dabEngineWidth = (Math.max(...dabMapPositions.map(p => p[0])) - dabMinX) / .8;

const dabEngineHeight = (Math.max(...dabMapPositions.map(p => p[1])) - dabMinY) / .8;

const dabOffsetX = dabMinX - dabEngineWidth * .1, dabOffsetY = dabMinY - dabEngineHeight * .1;

const CaliforniaDabDemo: Page = () => {
  const active = useIsActivePage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<LiveDabEngine | null>(null);
  const hullRendererRef = useRef<((context: CanvasRenderingContext2D, hull: number[][], color: string, width: number, opacity: number) => void) | null>(null);
  const inside = useRef(false), dragging = useRef(false), radius = useRef(30);
  // Keep the visible painter tied to the cursor, even when a new brush clears engine.pointer.
  const painterPointer = useRef<{ x: number; y: number; shiftKey?: boolean } | null>(null);
  const originalRef = useRef(false), selectionKey = useRef('');
  const [original, setOriginal] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  const [groups, setGroups] = useState<HousingBrushGroup[]>([{ id: 0, color: dabBrushColors[0], selected: new Set(), isCurrent: true }]);
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const brush: HousingBrush = selected.size ? { source: 'dab', extent: [0, 0, 1, 1] } : null;

  const draw = (frame?: LiveDabFrame) => {
    const canvas = canvasRef.current, context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    context.setTransform(2, 0, 0, 2, 0, 0); context.clearRect(0, 0, 720, 780);
    const points = frame?.points;
    const chosen = points?.filter(p => p.brushed) ?? [];
    const seeds = new Set(frame?.seedPoints ?? []);
    const currentColor = frame?.brushes.find(group => group.isCurrent)?.color ?? dabBrushColors[0];
    const lens = !originalRef.current ? frame?.lens : undefined;
    if (lens?.type === 'hull') {
      context.save(); context.translate(dabOffsetX, dabOffsetY);
      hullRendererRef.current?.(context, lens.hull, currentColor, 1.2, .55);
      hullRendererRef.current?.(context, lens.outerHull, '#8b303a', 1.6, lens.opacity);
      context.restore();
    } else if (lens) {
      context.globalAlpha = lens.opacity;
      context.beginPath(); context.arc(lens.x + dabOffsetX, lens.y + dabOffsetY, lens.radius, 0, Math.PI * 2);
      context.strokeStyle = '#8b303a'; context.lineWidth = 1.6; context.stroke();
    }
    const drawPoint = (p: LiveDabPoint, highlight: boolean) => {
      const x = (originalRef.current ? p.originalX : p.x) + dabOffsetX;
      const y = (originalRef.current ? p.originalY : p.y) + dabOffsetY;
      context.globalAlpha = highlight ? .95 : chosen.length ? .16 : .36;
      context.fillStyle = highlight ? p.color : '#000';
      context.beginPath(); context.arc(x, y, highlight ? 3.5 : 2.7, 0, Math.PI * 2); context.fill();
      if (highlight) { context.globalAlpha = 1; context.strokeStyle = '#fff'; context.lineWidth = .6; context.stroke(); }
      if (!highlight && !originalRef.current && inside.current && seeds.has(p.index)) {
        context.globalAlpha = .95; context.strokeStyle = currentColor; context.lineWidth = 1.5;
        context.beginPath(); context.arc(x, y, 4.2, 0, Math.PI * 2); context.stroke();
      }
    };
    if (points) {
      points.forEach(p => { if (!p.brushed) drawPoint(p, false); });
      chosen.forEach(p => drawPoint(p, true));
    } else {
      context.fillStyle = '#000'; context.globalAlpha = .36;
      dabMapPositions.forEach(([x, y]) => { context.beginPath(); context.arc(x, y, 2.7, 0, Math.PI * 2); context.fill(); });
    }
    const painter = painterPointer.current;
    const painterVisible = inside.current && !originalRef.current && !!painter;
    if (painterVisible && painter) {
      context.globalAlpha = 1; context.beginPath();
      context.arc(painter.x + dabOffsetX, painter.y + dabOffsetY, radius.current, 0, Math.PI * 2);
      context.fillStyle = painter.shiftKey ? 'rgba(139,48,58,.18)' : 'rgba(72,183,120,.24)'; context.fill();
      context.strokeStyle = painter.shiftKey ? '#8b303a' : '#32975c'; context.lineWidth = 1; context.stroke();
    }
    context.globalAlpha = 1;
    canvas.dataset.painterVisible = String(painterVisible);
    canvas.dataset.painterRadius = String(radius.current);
    canvas.dataset.mode = frame?.mode ?? 'inspect';
    canvas.dataset.pointCount = String(points?.length ?? dabRows.length);
    canvas.dataset.lensRadius = String(lens?.type === 'circle' ? lens.radius : 0);
    canvas.dataset.lensType = lens?.type ?? 'none';
    canvas.dataset.lensHull = JSON.stringify(lens?.type === 'hull' ? lens.hull : []);
    canvas.dataset.lensOuterHull = JSON.stringify(lens?.type === 'hull' ? lens.outerHull : []);
    canvas.dataset.relocatedCount = String(points?.filter(p => Math.hypot(p.x - p.originalX, p.y - p.originalY) > .5).length ?? 0);
    canvas.dataset.selectedCount = String(chosen.length);
    canvas.dataset.brushes = JSON.stringify(frame?.brushes ?? []);
    canvas.dataset.brushedPositions = JSON.stringify(chosen.map(p => [p.index, p.x, p.y, p.color]));
    if (points) {
      const key = JSON.stringify(frame?.brushes ?? []);
      if (key !== selectionKey.current) {
        selectionKey.current = key;
        setSelected(new Set(chosen.map(p => dabRows[p.index].id)));
        setGroups((frame?.brushes ?? []).map(group => ({ id: group.id, color: group.color, isCurrent: group.isCurrent, selected: new Set(group.points.map(index => dabRows[index].id)) })));
      }
    }
  };

  useLayoutEffect(() => { draw(engineRef.current?.getFrame()); }, []);
  useEffect(() => {
    if (!active && !engaged) return;
    let disposed = false, raf = 0;
    const run = (time: number) => {
      if (disposed) return;
      draw(engineRef.current?.tick(time));
      raf = requestAnimationFrame(run);
    };
    if (engineRef.current) raf = requestAnimationFrame(run);
    else Promise.all([
      import('./assets/dab-runtime/engine.mjs'),
      import('./assets/dab-runtime/original-hull.mjs'),
      fetch(dabDatasetUrl).then(response => {
        if (!response.ok) throw new Error(`Housing DAB data: HTTP ${response.status}`);
        return response.json();
      }),
    ]).then(([runtime, hullLogic, source]) => {
      if (disposed) return;
      const dataset = source;
      if (dataset.hd.length !== dabRows.length || dataset.metadata.rowIds.some((id: number, i: number) => id !== dabRows[i].id)) throw new Error('Housing row identity mismatch');
      if (canvasRef.current) {
        canvasRef.current.dataset.snnK = String(dataset.similarity.params.k);
        canvasRef.current.dataset.neighborCount = String(dataset.knn[0].length);
      }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      hullRendererRef.current = hullLogic.convexHullBorderRenderer;
      engineRef.current = createHullDabEngine(runtime, hullLogic, dataset, {
        technique: 'dab', width: dabEngineWidth, height: dabEngineHeight,
        painterRadius: radius.current, pointSize: 2.7,
        showGlobalDensity: false, showLocalCloseness: false,
        initialRelocationDelay: 500, initialRelocationDuration: reduced ? 1 : 1200,
        brushRelocationDuration: reduced ? 1 : 550,
      });
      if (inside.current && painterPointer.current) engineRef.current.pointerMove(painterPointer.current);
      setReady(true); raf = requestAnimationFrame(run);
    }).catch(error => { if (!disposed) { console.error('DAB demo initialization failed', error); setFailed(true); } });
    return () => {
      disposed = true; cancelAnimationFrame(raf);
      if (dragging.current) engineRef.current?.pointerUp();
      dragging.current = false; inside.current = false;
    };
  }, [active, engaged]);

  const localPointer = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - bounds.left) * 720 / bounds.width - dabOffsetX, y: (event.clientY - bounds.top) * 780 / bounds.height - dabOffsetY, shiftKey: event.shiftKey };
  };
  const reset = () => {
    dragging.current = false; inside.current = false; originalRef.current = false; setOriginal(false);
    engineRef.current?.reset(); draw(engineRef.current?.getFrame());
  };
  const resumeOriginalBrush = () => {
    const engine = engineRef.current;
    if (!originalRef.current || !engine) return;
    const current = engine.getFrame().brushes.find(group => group.isCurrent);
    if (!current || current.points.length > 0) return;
    // An empty new brush resumes on the coordinates shown in Original positions.
    engine.restoreOriginalPositions();
    originalRef.current = false; setOriginal(false);
  };
  const buttonStyle = { fontFamily: 'Arial', fontSize: 26, padding: '12px 20px', border: '1px solid #c9ced6', borderRadius: 0, background: '#fff', color: '#172536', cursor: 'pointer' };
  return <section data-dab-live-demo="" data-ready={ready} data-position-view={original ? 'original' : 'relocated'} data-selected-ids={[...selected].join(',')} style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
    <style>{'[data-dab-live-demo] [data-dab-canvas]:focus { outline: none; } [data-dab-live-demo] [data-dab-canvas]:focus-visible { outline: 2px solid #1f3d8c; outline-offset: 3px; }'}</style>
    <HousingMap left={96} top={46} brush={null} selected={selected} basemapOnly />
    <canvas ref={canvasRef} data-dab-canvas="" data-osd-interactive="" width={1440} height={1560} tabIndex={0}
      role="application" aria-label="Distortion-aware brushing. Pause over points to relocate neighbors, then drag to brush. Scroll to resize the painter. Shift-drag to erase. Escape clears the selection."
      style={{ position: 'absolute', left: 96, top: 46, width: 720, height: 780, touchAction: 'none', cursor: original ? 'default' : 'crosshair' }}
      onPointerEnter={event => {
        resumeOriginalBrush();
        inside.current = true; painterPointer.current = localPointer(event);
        if (!originalRef.current) engineRef.current?.pointerMove(painterPointer.current);
        draw(engineRef.current?.getFrame());
        if (!active) setEngaged(true);
      }}
      onPointerMove={event => { event.stopPropagation(); resumeOriginalBrush(); if (!originalRef.current) {
        inside.current = true; painterPointer.current = localPointer(event);
        engineRef.current?.pointerMove(painterPointer.current); draw(engineRef.current?.getFrame());
      } }}
      onPointerDown={event => {
        event.stopPropagation(); event.preventDefault();
        resumeOriginalBrush();
        if (event.button !== 0 || originalRef.current || !engineRef.current) return;
        dragging.current = true; inside.current = true;
        event.currentTarget.focus({ preventScroll: true }); event.currentTarget.setPointerCapture(event.pointerId);
        painterPointer.current = localPointer(event);
        engineRef.current.pointerDown(painterPointer.current);
      }}
      onPointerUp={event => {
        event.stopPropagation(); if (!dragging.current) return;
        engineRef.current?.pointerUp(); dragging.current = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { engineRef.current?.pointerUp(); dragging.current = false; inside.current = false; }}
      onPointerLeave={() => { if (!dragging.current) { inside.current = false; engineRef.current?.pointerMove({ x: -10000, y: -10000 }); } }}
      onWheel={event => {
        event.stopPropagation(); if (originalRef.current || !engineRef.current) return;
        const next = Math.max(8, Math.min(60, radius.current + event.deltaY * .017));
        engineRef.current.wheel((next - radius.current) / .017); radius.current = next;
      }}
      onClick={event => event.stopPropagation()}
      onDoubleClick={event => { event.stopPropagation(); reset(); }}
      onKeyDown={event => { if (['Escape', 'Delete', 'Backspace'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); reset(); } }}
      onTouchStartCapture={event => event.stopPropagation()} onTouchEndCapture={event => event.stopPropagation()} />
    {(['income', 'value', 'age', 'rooms', 'occupancy', 'population'] as HousingField[]).map((field, i) => <HousingHistogram key={field} field={field} left={i % 2 === 0 ? 910 : 1382} top={64 + Math.floor(i / 2) * 266} brush={brush} selected={selected} interactive={false} rows={dabRows} groups={groups} />)}
    <h1 style={{ position: 'absolute', left: 96, top: 900, fontSize: 48, lineHeight: 1.2, fontWeight: 400, margin: 0 }}>Distortion-aware brushing demo</h1>
    <div data-brush-legend="" style={{ position: 'absolute', left: 96, top: 850, width: 1150, display: 'flex', flexWrap: 'wrap', gap: '12px 18px', fontSize: 22 }}>
      {groups.map(group => <span key={group.id} data-brush-legend-id={group.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, paddingBottom: 6, borderBottom: group.isCurrent ? `2px solid ${group.color}` : '2px solid transparent' }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: group.color }} />Brush {group.id + 1}
      </span>)}
    </div>
    <div data-osd-interactive="" style={{ position: 'absolute', right: 102, top: 890, display: 'flex', gap: 16 }} onClick={event => event.stopPropagation()}>
      <button type="button" disabled={!ready || !groups.some(group => group.isCurrent && group.selected.size > 0) || groups.length >= 10} style={buttonStyle} onClick={() => {
        inside.current = false; dragging.current = false;
        engineRef.current?.addBrush(originalRef.current);
        originalRef.current = false; setOriginal(false);
        draw(engineRef.current?.getFrame());
      }}>New brush</button>
      <button type="button" disabled={!ready} aria-pressed={original} style={{ ...buttonStyle, background: original ? bostonAccent : '#fff', color: original ? '#fff' : '#172536' }} onClick={() => {
        engineRef.current?.pointerUp(); inside.current = false;
        originalRef.current = !originalRef.current; setOriginal(originalRef.current);
        draw(engineRef.current?.getFrame());
      }}>Original positions</button>
      <button type="button" disabled={!ready} style={buttonStyle} onClick={reset}>Reset</button>
    </div>
    {failed && <p role="alert" style={{ position: 'absolute', left: 96, top: 858, margin: 0, fontSize: 25, color: '#8b303a' }}>Could not load the brushing engine. Reload this page.</p>}
    <PageCounter />
  </section>;
};

type MnistReplayFrame = { t: number; xy: number[]; selected: number[]; cursor: number[]; lens?: LiveDabFrame['lens']; pressed: boolean };

type MnistReplay = {
  labels: number[]; positions: number[][]; frames: MnistReplayFrame[]; center: number[];
  mbSteps: { r: number; selected: number[] }[]; ddSteps: { r: number; selected: number[] }[];
  summary: { duration: number; mbRadius: number; ddRadius: number; releaseTime: number; events: { t: number; type: string }[] };
};

let mnistReplayPromise: Promise<MnistReplay> | undefined;

const AccurateReadingHeadline = () => (
  <h1 data-accurate-reading-headline="" style={{ position: 'absolute', left: 96, top: 62, width: 1728, margin: 0, fontSize: 60, lineHeight: 1.22, fontWeight: 400 }}>
    Yes, novice analysts can now<br />
    more accurately and easily read multidimensional data
  </h1>
);

const MnistUserStudy: Page = () => {
  const active = useIsActivePage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [replay, setReplay] = useState<MnistReplay | null>(null);
  const [atlas, setAtlas] = useState<HTMLImageElement | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let disposed = false;
    mnistReplayPromise ??= fetch(mnistStudyReplayUrl).then(r => { if (!r.ok) throw new Error('MNIST replay unavailable'); return r.json(); });
    mnistReplayPromise.then(data => { if (!disposed) setReplay(data); }).catch(() => { if (!disposed) setFailed(true); });
    const image = new Image(); image.onload = () => { if (!disposed) setAtlas(image); }; image.onerror = () => { if (!disposed) setFailed(true); }; image.src = mnistAtlasUrl;
    return () => { disposed = true; };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !replay || !atlas) return;
    const sprites = ['#20252c', bostonAccent, '#b43c45'].map(color => {
      const sheet = document.createElement('canvas'); sheet.width = atlas.width; sheet.height = atlas.height;
      const c = sheet.getContext('2d')!; c.drawImage(atlas, 0, 0); c.globalCompositeOperation = 'source-in'; c.fillStyle = color; c.fillRect(0, 0, sheet.width, sheet.height); return sheet;
    });
    const glyph = (id: number, x: number, y: number, size: number, selected: boolean) => {
      ctx.globalAlpha = selected ? .98 : .45;
      ctx.drawImage(sprites[selected ? replay.labels[id] === 3 ? 1 : 2 : 0], id % 40 * 28, Math.floor(id / 40) * 28, 28, 28, x - size / 2, y - size / 2, size, size);
    };
    const ease = (n: number) => { const t = Math.max(0, Math.min(1, n)); return t * t * (3 - 2 * t); };
    const brushRadius = (progress: number, final: number) => {
      // Expand, inspect, tighten, then settle on the best sampled radius for this center.
      const stops = [[0, 5], [.18, final * .6], [.48, final * 1.45], [.74, final * .8], [1, final]];
      let k = 1; while (k < stops.length - 1 && progress > stops[k][0]) k++;
      const a = stops[k - 1], b = stops[k]; return a[1] + (b[1] - a[1]) * ease((progress - a[0]) / (b[0] - a[0]));
    };
    const cursor = (x: number, y: number, pressed: boolean) => {
      ctx.globalAlpha = 1; ctx.save(); ctx.translate(x, y); ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(0, 21); ctx.lineTo(5.5, 16); ctx.lineTo(10, 25); ctx.lineTo(14, 23); ctx.lineTo(9, 14); ctx.lineTo(17, 14); ctx.closePath();
      ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#111'; ctx.lineWidth = 1.5; ctx.stroke();
      if (pressed) { ctx.beginPath(); ctx.arc(3, 4, 3, 0, Math.PI * 2); ctx.fillStyle = '#32975c'; ctx.fill(); } ctx.restore();
    };
    const draw = (t: number) => {
      ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.clearRect(0, 0, 1760, 720);
      const time = Math.max(0, Math.min(t, replay.summary.duration)), frames = replay.frames;
      const index = Math.min(frames.length - 1, Math.floor(time / 100)), a = frames[index], b = frames[Math.min(index + 1, frames.length - 1)];
      const mix = Math.min(1, Math.max(0, (time - a.t) / Math.max(1, b.t - a.t)));
      const brushing = time > 1800 && time < replay.summary.duration - 600;
      const progress = Math.max(0, Math.min(1, (time - 1800) / (replay.summary.duration - 4000)));
      const counts: number[][] = [];
      for (let column = 0; column < 3; column++) {
        ctx.save(); ctx.translate(column * 600 + 8, 0);
        const r = column === 1 ? brushRadius(progress, replay.summary.mbRadius) : brushRadius(progress, replay.summary.ddRadius);
        const steps = column === 1 ? replay.mbSteps : replay.ddSteps;
        const step = steps.reduce((best, next) => Math.abs(next.r - r) < Math.abs(best.r - r) ? next : best);
        const selection = column === 0 ? a.selected : time < 1800 ? [] : step.selected;
        const selected = new Set(selection);
        counts.push([selection.filter(i => replay.labels[i] === 3).length, selection.filter(i => replay.labels[i] !== 3).length]);
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 544, 594); ctx.clip();
        if (column === 0 && a.lens && time < replay.summary.duration - 600) {
          ctx.globalAlpha = .75 * a.lens.opacity; ctx.lineWidth = 1.2; ctx.strokeStyle = '#8b303a';
          ctx.beginPath();
          if (a.lens.type === 'circle') ctx.arc(a.lens.x, a.lens.y, a.lens.radius, 0, 2 * Math.PI);
          else a.lens.outerHull.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
          ctx.closePath(); ctx.stroke();
        }
        const position = (id: number) => column === 0 ? [a.xy[id * 2] + (b.xy[id * 2] - a.xy[id * 2]) * mix, a.xy[id * 2 + 1] + (b.xy[id * 2 + 1] - a.xy[id * 2 + 1]) * mix] : replay.positions[id];
        for (let i = 0; i < 1200; i++) if (!selected.has(i)) { const p = position(i); glyph(i, p[0], p[1], 14, false); }
        selection.forEach(i => { const p = position(i); glyph(i, p[0], p[1], 15, true); });
        if (column === 0 ? time >= replay.summary.events[0].t && time < replay.summary.releaseTime : brushing) {
          ctx.globalAlpha = 1; ctx.strokeStyle = '#32975c'; ctx.fillStyle = 'rgba(72,183,120,.13)'; ctx.lineWidth = 1.3;
          let x: number, y: number;
          if (column === 0) {
            x = a.cursor[0] + (b.cursor[0] - a.cursor[0]) * mix; y = a.cursor[1] + (b.cursor[1] - a.cursor[1]) * mix;
            ctx.beginPath(); ctx.arc(x, y, 18, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
          } else if (column === 1) {
            const [cx, cy] = replay.center; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); x = cx + r; y = cy;
          } else {
            const [cx, cy] = replay.center; ctx.fillRect(cx - r * .85, cy - r, r * 1.7, r * 2); ctx.strokeRect(cx - r * .85, cy - r, r * 1.7, r * 2); x = cx + r * .85; y = cy + r;
          }
          cursor(x, y, column === 0 ? a.pressed : true);
        }
        ctx.restore();
        ctx.globalAlpha = 1; ctx.fillStyle = '#444'; ctx.font = '22px Arial'; ctx.fillText('Selected digits', 6, 620);
        // Uniform sample in row order, not hand-picked mistakes.
        const sample = selection.length <= 48 ? selection : Array.from({ length: 48 }, (_, i) => selection[Math.floor(i * (selection.length - 1) / 47)]);
        sample.forEach((id, i) => glyph(id, 17 + i % 24 * 22, 650 + Math.floor(i / 24) * 27, 25, true));
        ctx.restore();
      }
      ctx.globalAlpha = 1; canvas.dataset.replayTime = String(Math.round(time)); canvas.dataset.selectionCounts = JSON.stringify(counts); canvas.dataset.pointCount = '1200'; canvas.dataset.dabPressed = String(a.pressed); canvas.dataset.dabCursor = JSON.stringify(a.cursor);
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    draw(active && reduced ? replay.summary.duration : 0);
    if (!active || reduced) return;
    let raf = 0; const started = performance.now();
    const animate = (now: number) => { draw(((now - started) * 1.25) % (replay.summary.duration + 8500)); raf = requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate); return () => cancelAnimationFrame(raf);
  }, [active, replay, atlas]);
  return <section data-mnist-study="" data-ready={!!replay && !!atlas} style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', fontFamily: 'Arial', color: '#000' }}>
    <AccurateReadingHeadline />
    <p style={{ position: 'absolute', right: 100, top: 76, margin: 0, fontSize: 23, color: '#555' }}>{''}<br />{''}</p>
    <p style={{ position: 'absolute', right: 100, top: 151, margin: 0, fontSize: 25, color: '#555' }}>{''}<br />{''}</p>
    {['Distortion-aware brushing', 'M-BALL brushing', 'Data-driven brushing'].map((name, i) => <h2 key={name} style={{ position: 'absolute', left: 136 + i * 552, top: 231, margin: 0, fontSize: 32, fontWeight: i === 0 ? 700 : 400 }}>{name}</h2>)}
    <canvas ref={canvasRef} data-mnist-replay="" width={3520} height={1440} role="img" aria-label="Automatic task replay on 1,200 MNIST handwritten digits projected onto PC2 and PC3. Distortion-aware, M-BALL, and Data-driven brushing select digit threes. Blue marks selected threes; red marks selected zeros and ones." style={{ position: 'absolute', left: 128, top: 271, width: 1619.2, height: 662.4, pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', left: 136, top: 936, display: 'flex', gap: 32, fontSize: 22 }}>
      <span style={{ color: bostonAccent }}>● Selected 3</span><span style={{ color: '#b43c45' }}>● Selected 0 or 1</span>
    </div>
    {failed && <p role="alert" style={{ position: 'absolute', left: 96, top: 480, fontSize: 28 }}>Could not load the task replay.</p>}
    <PageCounter />
  </section>;
};

const DistortionBrushingResultsScene = ({ withMoreFun = false }: { withMoreFun?: boolean }) => {
  const active = useIsActivePage();
  const highResults = <div data-results-high="" style={{ position: 'absolute', inset: 0 }}>
        <img src={dabResultsHigh} alt="High-distortion accuracy distributions from the supplied results slide" style={{ position: 'absolute', inset: 0, width: 1920, height: 1080 }} />
        <span style={{ position: 'absolute', left: 96, top: 722, fontSize: 42, lineHeight: 1.15, fontWeight: 700, translate: '78px -2px' }}>High distortion</span>
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }} aria-hidden="true"><path d="M495 746H510" stroke="#333" strokeWidth={2} /></svg>
      </div>;
  return <section data-dab-results="" onClick={event => {
    // The player's last-page click guard ignores pending steps. Forward the
    // first chart click through its normal keyboard/step controller instead.
    if (active && event.currentTarget.querySelector('[data-osd-step="pending"]')) {
      event.stopPropagation();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    }
  }} style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', color: '#000', fontFamily: 'Arial' }}>
  <AccurateReadingHeadline />
  <div data-results-chart="" style={{ position: 'absolute', inset: 0, translate: '-26px -80px' }}>
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }} aria-label="Accuracy axis from zero to one">
    <path d="M510 377V905H1798" fill="none" stroke="#333" strokeWidth={2.5} />
    <path d="M495 492H510" fill="none" stroke="#333" strokeWidth={2} />
    {[0, .25, .5, .75, 1].map(value => <g key={value}>
      <path d={`M${560 + value * 1180} 905v13`} stroke="#333" strokeWidth={2} />
      <text x={560 + value * 1180} y={961} textAnchor="middle" fill="#333" fontFamily="Arial" fontSize={30}>{value.toFixed(2)}</text>
    </g>)}
    <text x={1150} y={1014} textAnchor="middle" fill="#000" fontFamily="Arial" fontSize={34}>Accuracy</text>
  </svg>
  <img data-results-low="" src={dabResultsLow} alt="Low-distortion accuracy distributions from the supplied results slide" style={{ position: 'absolute', inset: 0, width: 1920, height: 1080 }} />
  <span style={{ position: 'absolute', left: 96, top: 468, fontSize: 42, lineHeight: 1.15, translate: '117.4px -2px' }}>Low distortion</span>
  <span style={{ position: 'absolute', right: 180, top: 342, color: '#E41A1C', fontSize: 30 }}>Distortion-aware brushing</span>
  {withMoreFun ? highResults : <Steps><Step duration={0}>{highResults}</Step></Steps>}
  </div>
  <PageCounter />
</section>;
};

const DistortionBrushingResults: Page = () => <DistortionBrushingResultsScene />;

export const sourcePages = {
  17: UnreliableAnalysisProblem,
  18: DimensionalityReductionFocus,
  20: DimensionalityReductionUsagePatterns,
  21: WhyOverreliance,
  22: WhyCherryPicking,
  23: InevitableInformationLoss,
  24: IntelligentBrushingMitigatesLoss,
  25: SemanticBrushingQuestion,
  26: IntelligentBrushingSolution,
  27: BrushingInspectProjection,
  28: BrushingFindStart,
  29: BrushingConstructLens,
  30: BrushingRelocatePoints,
  31: BrushingStartSelection,
  32: BrushingUpdateLens,
  33: BrushingContinueSelection,
  34: BrushingConfirmCluster,
  35: CaliforniaDabDemo,
  36: MnistUserStudy,
  37: DistortionBrushingResults,
};
