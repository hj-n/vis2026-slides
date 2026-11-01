// Upstream @dabrush/engine (MIT), https://github.com/distortion-aware-brushing/engine @ 388243dcd239a477deca9016f6b8cba8f362db27
var b = Object.defineProperty;
var v = (a, t, i) => t in a ? b(a, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : a[t] = i;
var c = (a, t, i) => v(a, typeof t != "symbol" ? t + "" : t, i);
import { assertDabDataset as S } from "./schema.mjs";
const y = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf"
];
class P {
  constructor(t) {
    c(this, "rows");
    const { data: i, indices: s, indptr: e } = t.similarity;
    this.rows = Array.from({ length: t.hd.length }, (r, n) => {
      const h = /* @__PURE__ */ new Map();
      for (let u = e[n]; u < e[n + 1]; u += 1)
        h.set(s[u], i[u]);
      return h;
    });
  }
  get(t, i) {
    var s;
    return ((s = this.rows[t]) == null ? void 0 : s.get(i)) ?? 0;
  }
  rowSum(t) {
    var s;
    let i = 0;
    return (s = this.rows[t]) == null || s.forEach((e) => {
      i += e;
    }), i;
  }
  neighborsAbove(t, i) {
    var e;
    const s = [];
    return (e = this.rows[t]) == null || e.forEach((r, n) => {
      r >= i && s.push(n);
    }), s;
  }
}
function w(a, t, i) {
  const s = a.map((l) => l[0]), e = a.map((l) => l[1]), r = Math.min(...s), n = Math.max(...s), h = Math.min(...e), u = Math.max(...e), o = t * 0.1, d = i * 0.1, p = n - r || 1, m = u - h || 1;
  return a.map((l) => [
    o + (l[0] - r) / p * (t - 2 * o),
    d + (l[1] - h) / m * (i - 2 * d)
  ]);
}
function f(a, t) {
  return Math.hypot(a[0] - t[0], a[1] - t[1]);
}
function R(a) {
  return Array.from(new Set(a));
}
function B(a, t, i) {
  const s = Math.min(t[0], i[0]), e = Math.max(t[0], i[0]), r = Math.min(t[1], i[1]), n = Math.max(t[1], i[1]);
  return a[0] >= s && a[0] <= e && a[1] >= r && a[1] <= n;
}
function M(a, t, i) {
  return f(a, t) <= f(t, i);
}
class A {
  constructor(t, i = {}) {
    c(this, "dataset");
    c(this, "similarity");
    c(this, "options");
    c(this, "originalLd");
    c(this, "currLd");
    c(this, "density");
    c(this, "densityMax");
    c(this, "mode", "inspect");
    c(this, "technique");
    c(this, "pointer");
    c(this, "startPoint");
    c(this, "seedPoints", []);
    c(this, "erasing", !1);
    c(this, "currentBrushId", 0);
    c(this, "brushes", /* @__PURE__ */ new Map([[0, /* @__PURE__ */ new Set()]]));
    c(this, "modifiedBrushes", /* @__PURE__ */ new Map([[0, /* @__PURE__ */ new Set()]]));
    c(this, "currentRegion", /* @__PURE__ */ new Set());
    c(this, "animation");
    c(this, "hoverStartedAt");
    c(this, "hoverSeedKey", "");
    c(this, "hoverPointer");
    c(this, "lens");
    S(t), this.dataset = t, this.similarity = new P(t), this.options = {
      technique: i.technique ?? "dab",
      width: i.width ?? 800,
      height: i.height ?? 800,
      painterRadius: i.painterRadius ?? 30,
      pointSize: i.pointSize ?? 5,
      showGlobalDensity: i.showGlobalDensity ?? !0,
      showLocalCloseness: i.showLocalCloseness ?? !0,
      maxBrushes: i.maxBrushes ?? 10,
      similarityRadius: i.similarityRadius ?? 0.5,
      initialRelocationDelay: i.initialRelocationDelay ?? 500,
      initialRelocationDuration: i.initialRelocationDuration ?? 650,
      brushRelocationDuration: i.brushRelocationDuration ?? 260
    }, this.technique = this.options.technique, this.originalLd = w(t.ld, this.options.width, this.options.height), this.currLd = this.originalLd.map((s) => [...s]), this.density = t.hd.map((s, e) => this.similarity.rowSum(e)), this.densityMax = Math.max(...this.density, 1);
  }
  pointerMove(t) {
    const i = [t.x, t.y];
    if (this.technique === "dab" && this.mode === "initiate" && this.hoverPointer && f(i, this.hoverPointer) > this.options.painterRadius * 0.35 && (this.startAnimation(this.originalLd, this.options.initialRelocationDuration / 2, this.now(), "inspect"), this.lens = void 0), this.pointer = i, this.erasing = !!t.shiftKey, this.mode === "brush") {
      this.technique === "ddb" || this.technique === "mbb" ? this.updateRegion() : this.erasing ? this.eraseWithinPainter() : this.addWithinPainter();
      return;
    }
    this.seedPoints = this.findSeedPoints(), this.updateHoverCandidate();
  }
  pointerDown(t) {
    if (this.pointer = [t.x, t.y], this.erasing = !!t.shiftKey, this.animation = void 0, this.hoverStartedAt = void 0, this.erasing) {
      this.mode = "brush", this.eraseWithinPainter();
      return;
    }
    if (this.technique === "ddb" || this.technique === "mbb") {
      this.mode = "brush", this.startPoint = [t.x, t.y], this.updateRegion();
      return;
    }
    this.mode = "brush", this.addWithinPainter();
  }
  pointerUp() {
    if (this.technique === "ddb" || this.technique === "mbb") {
      const t = this.getCurrentBrushSet();
      this.currentRegion.forEach((i) => t.add(i)), this.currentRegion.clear(), this.startPoint = void 0;
    }
    this.mode = this.getCurrentBrushSet().size > 0 ? "rest" : "inspect", this.erasing = !1, this.seedPoints = [], this.hoverStartedAt = void 0, this.lens = void 0;
  }
  wheel(t) {
    this.options.painterRadius = Math.max(5, this.options.painterRadius + t * 0.017), this.hoverStartedAt = void 0;
  }
  tick(t = this.now()) {
    return this.advanceAnimation(t), this.maybeStartInitialRelocation(t), this.getFrame();
  }
  reset() {
    this.mode = "inspect", this.currentBrushId = 0, this.brushes = /* @__PURE__ */ new Map([[0, /* @__PURE__ */ new Set()]]), this.modifiedBrushes = /* @__PURE__ */ new Map([[0, /* @__PURE__ */ new Set()]]), this.currentRegion.clear(), this.animation = void 0, this.hoverStartedAt = void 0, this.hoverSeedKey = "", this.hoverPointer = void 0, this.lens = void 0, this.currLd = this.originalLd.map((t) => [...t]), this.seedPoints = [];
  }
  addBrush() {
    const t = Array.from(this.brushes.keys()), i = Math.max(...t) + 1;
    return i >= this.options.maxBrushes ? this.currentBrushId : (this.currentBrushId = i, this.brushes.set(i, /* @__PURE__ */ new Set()), this.modifiedBrushes.set(i, /* @__PURE__ */ new Set()), this.mode = "inspect", this.currLd = this.originalLd.map((s) => [...s]), i);
  }
  removeBrush(t) {
    this.brushes.size !== 1 && (this.brushes.delete(t), this.modifiedBrushes.delete(t), this.currentBrushId === t && (this.currentBrushId = Array.from(this.brushes.keys())[0]));
  }
  setTechnique(t) {
    this.technique = t, this.reset();
  }
  getMode() {
    return this.mode;
  }
  getBrushes() {
    return Array.from(this.brushes.entries()).map(([t, i]) => ({
      id: t,
      points: Array.from(i).sort((s, e) => s - e),
      color: this.colorFor(t),
      isCurrent: t === this.currentBrushId
    }));
  }
  getFrame() {
    const t = Array(this.dataset.hd.length).fill("#111827"), i = Array(this.dataset.hd.length).fill(!1), s = Array(this.dataset.hd.length).fill(!1), e = this.density.map(
      (n) => this.options.showGlobalDensity ? 0.15 + 0.85 * (n / this.densityMax) : 0.9
    );
    this.brushes.forEach((n, h) => {
      (this.technique === "sb" ? this.modifiedBrushes.get(h) ?? n : n).forEach((o) => {
        t[o] = this.colorFor(h), s[o] = !0;
      }), n.forEach((o) => {
        i[o] = h === this.currentBrushId;
      });
    }), this.currentRegion.forEach((n) => {
      t[n] = this.colorFor(this.currentBrushId), s[n] = !0, i[n] = !0;
    });
    const r = this.currentTargetCloseness();
    return this.options.showLocalCloseness && r && r.forEach((n, h) => {
      e[h] = Math.max(e[h], 0.15 + 0.85 * n);
    }), {
      mode: this.mode,
      technique: this.technique,
      width: this.options.width,
      height: this.options.height,
      painter: this.pointer ? {
        x: this.pointer[0],
        y: this.pointer[1],
        radius: this.options.painterRadius,
        erasing: this.erasing
      } : void 0,
      region: this.startPoint && this.pointer && (this.technique === "ddb" || this.technique === "mbb") ? {
        type: this.technique === "ddb" ? "rect" : "circle",
        x0: this.startPoint[0],
        y0: this.startPoint[1],
        x1: this.pointer[0],
        y1: this.pointer[1]
      } : void 0,
      lens: this.lens,
      seedPoints: this.seedPoints,
      brushes: this.getBrushes(),
      points: this.currLd.map((n, h) => ({
        index: h,
        x: n[0],
        y: n[1],
        originalX: this.originalLd[h][0],
        originalY: this.originalLd[h][1],
        color: t[h],
        opacity: s[h] ? 1 : e[h],
        size: this.options.pointSize,
        brushed: s[h],
        border: i[h]
      }))
    };
  }
  colorFor(t) {
    return y[t % y.length];
  }
  getCurrentBrushSet() {
    let t = this.brushes.get(this.currentBrushId);
    return t || (t = /* @__PURE__ */ new Set(), this.brushes.set(this.currentBrushId, t)), t;
  }
  getCurrentModifiedSet() {
    let t = this.modifiedBrushes.get(this.currentBrushId);
    return t || (t = /* @__PURE__ */ new Set(), this.modifiedBrushes.set(this.currentBrushId, t)), t;
  }
  pointsWithinPainter() {
    return this.pointer ? this.currLd.map((t, i) => ({ index: i, within: f(t, this.pointer) <= this.options.painterRadius })).filter((t) => t.within).map((t) => t.index) : [];
  }
  findSeedPoints() {
    var e;
    const t = this.pointsWithinPainter();
    if (!t.length) return [];
    const i = t.reduce((r, n) => this.density[n] > this.density[r] ? n : r, t[0]), s = ((e = this.dataset.knn[i]) == null ? void 0 : e.filter((r) => t.includes(r))) ?? [];
    return R([i, ...s]);
  }
  addWithinPainter() {
    const t = this.pointsWithinPainter(), i = this.getCurrentBrushSet();
    t.forEach((s) => i.add(s)), this.technique === "sb" && this.updateSimilarityBrush(), this.technique === "dab" && this.applyDabRelocation(this.now());
  }
  eraseWithinPainter() {
    const t = new Set(this.pointsWithinPainter()), i = this.getCurrentBrushSet();
    t.forEach((s) => i.delete(s)), this.technique === "sb" && this.updateSimilarityBrush(), this.technique === "dab" && this.applyDabRelocation(this.now());
  }
  updateSimilarityBrush() {
    const t = this.getCurrentBrushSet(), i = 1 - this.options.similarityRadius, s = this.getCurrentModifiedSet();
    s.clear(), t.forEach((e) => {
      s.add(e), this.similarity.neighborsAbove(e, i).forEach((r) => s.add(r));
    });
  }
  updateRegion() {
    !this.startPoint || !this.pointer || (this.currentRegion.clear(), this.currLd.forEach((t, i) => {
      (this.technique === "ddb" ? B(t, this.startPoint, this.pointer) : M(t, this.startPoint, this.pointer)) && this.currentRegion.add(i);
    }));
  }
  currentTargetCloseness() {
    const t = this.mode === "inspect" && this.seedPoints.length ? this.seedPoints : Array.from(this.technique === "sb" ? this.getCurrentModifiedSet() : this.getCurrentBrushSet());
    if (t.length)
      return this.closeness(t, Math.max(1, t.length));
  }
  closeness(t, i) {
    const s = new Set(t);
    return this.dataset.knn.map((e, r) => {
      const n = e.slice(0, Math.min(i, e.length));
      let h = 0, u = 0;
      return n.forEach((o) => {
        const d = this.similarity.get(r, o);
        h += d, s.has(o) && (u += d);
      }), h > 0 ? u / h : 0;
    });
  }
  applyDabRelocation(t) {
    const i = this.getCurrentBrushSet(), s = Array.from(i);
    if (!s.length) {
      this.startAnimation(this.originalLd, this.options.brushRelocationDuration, t);
      return;
    }
    const e = this.closeness(s, Math.max(1, s.length)), r = s.map((o) => this.currLd[o]), n = [
      r.reduce((o, d) => o + d[0], 0) / r.length,
      r.reduce((o, d) => o + d[1], 0) / r.length
    ], h = Math.max(this.options.painterRadius, ...r.map((o) => f(o, n))), u = this.currLd.map((o, d) => {
      if (i.has(d)) return o;
      const p = e[d];
      if (p <= 0) return o;
      const m = [o[0] - n[0], o[1] - n[1]], l = Math.hypot(m[0], m[1]) || 1, g = h + this.options.painterRadius * (2 - p);
      return [n[0] + m[0] / l * g, n[1] + m[1] / l * g];
    });
    this.startAnimation(u, this.options.brushRelocationDuration, t), this.lens = {
      type: "circle",
      x: n[0],
      y: n[1],
      radius: h + this.options.painterRadius * 2,
      opacity: 1
    };
  }
  now() {
    return typeof performance < "u" ? performance.now() : Date.now();
  }
  updateHoverCandidate() {
    if (this.technique !== "dab" || this.mode !== "inspect") return;
    const t = this.seedPoints.join(","), i = this.hoverPointer && this.pointer ? f(this.hoverPointer, this.pointer) < 2 : !1;
    if (!this.seedPoints.length) {
      this.hoverStartedAt = void 0, this.hoverSeedKey = "", this.hoverPointer = this.pointer ? [...this.pointer] : void 0, this.lens = void 0;
      return;
    }
    (t !== this.hoverSeedKey || !i) && (this.hoverSeedKey = t, this.hoverPointer = this.pointer ? [...this.pointer] : void 0, this.hoverStartedAt = void 0);
  }
  maybeStartInitialRelocation(t) {
    if (this.technique !== "dab" || this.mode !== "inspect" || this.animation || !this.pointer || !this.seedPoints.length)
      return;
    if (this.hoverStartedAt === void 0) {
      this.hoverStartedAt = t;
      return;
    }
    if (t - this.hoverStartedAt < this.options.initialRelocationDelay)
      return;
    const i = this.closeness(this.seedPoints, Math.max(1, this.seedPoints.length)), s = new Set(this.seedPoints), e = this.pointer, r = this.currLd.map((n, h) => {
      if (s.has(h)) return n;
      const u = i[h], o = n[0] - e[0], d = n[1] - e[1], p = Math.hypot(o, d) || 1, m = f(n, e);
      if (u >= 1 && m <= this.options.painterRadius || u <= 0 && m > this.options.painterRadius * 3) return n;
      const l = u >= 1 ? this.options.painterRadius : u <= 0 ? this.options.painterRadius * 4 : this.options.painterRadius * (3 - 2 * u);
      return [e[0] + o / p * l, e[1] + d / p * l];
    });
    this.lens = {
      type: "circle",
      x: e[0],
      y: e[1],
      radius: this.options.painterRadius * 3,
      opacity: 0
    }, this.startAnimation(r, this.options.initialRelocationDuration, t, "initiate");
  }
  startAnimation(t, i, s, e) {
    this.advanceAnimation(s), this.animation = {
      from: this.currLd.map((r) => [...r]),
      to: t.map((r) => [...r]),
      startedAt: s,
      duration: Math.max(1, i),
      finalMode: e
    };
  }
  advanceAnimation(t) {
    if (!this.animation) return;
    const i = Math.min(1, Math.max(0, (t - this.animation.startedAt) / this.animation.duration)), s = 1 - Math.pow(1 - i, 3);
    if (this.currLd = this.animation.from.map((e, r) => [
      e[0] + (this.animation.to[r][0] - e[0]) * s,
      e[1] + (this.animation.to[r][1] - e[1]) * s
    ]), this.lens && this.mode === "inspect" && (this.lens = {
      ...this.lens,
      opacity: i
    }), i >= 1) {
      const e = this.animation.finalMode;
      this.animation = void 0, e && (this.mode = e, e === "initiate" && this.lens && (this.lens = { ...this.lens, opacity: 1 }));
    }
  }
}
function x(a, t = {}) {
  return new A(a, t);
}
export {
  A as BrushingEngine,
  x as createBrushingEngine
};
