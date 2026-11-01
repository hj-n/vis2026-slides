// Upstream @dabrush/schema (MIT), https://github.com/distortion-aware-brushing/schema @ b83bdbd304f066fb03a288ac50d7b9f3c6f868c1
const c = "1.0";
function u(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function h(e, r, a) {
  const t = [];
  if (!Array.isArray(e))
    return { errors: [`${r} must be a 2D numeric array.`] };
  if (e.length === 0)
    return { errors: [`${r} must contain at least one row.`] };
  let s = a;
  return e.forEach((i, n) => {
    if (!Array.isArray(i)) {
      t.push(`${r}[${n}] must be an array.`);
      return;
    }
    if (i.length === 0) {
      t.push(`${r}[${n}] must contain at least one value.`);
      return;
    }
    s === void 0 && (s = i.length), i.length !== s && t.push(`${r}[${n}] has ${i.length} columns; expected ${s}.`), i.forEach((o, m) => {
      (typeof o != "number" || !Number.isFinite(o)) && t.push(`${r}[${n}][${m}] must be a finite number.`);
    });
  }), { matrix: t.length === 0 ? e : void 0, errors: t };
}
function l(e) {
  var i;
  const r = [];
  if (!u(e))
    return { ok: !1, errors: ["input must be an object."] };
  const a = h(e.hd, "hd"), t = h(e.ld, "ld", 2);
  r.push(...a.errors, ...t.errors);
  const s = (i = a.matrix) == null ? void 0 : i.length;
  return s !== void 0 && t.matrix !== void 0 && t.matrix.length !== s && r.push(`ld row count ${t.matrix.length} must match hd row count ${s}.`), e.labels !== void 0 && (Array.isArray(e.labels) ? s !== void 0 && e.labels.length !== s ? r.push(`labels length ${e.labels.length} must match hd row count ${s}.`) : e.labels.some((n) => !["string", "number"].includes(typeof n)) && r.push("labels may only contain strings or numbers.") : r.push("labels must be an array when provided.")), e.features !== void 0 && (!Array.isArray(e.features) || e.features.some((n) => typeof n != "string") ? r.push("features must be an array of strings when provided.") : a.matrix !== void 0 && e.features.length !== a.matrix[0].length && r.push(`features length ${e.features.length} must match hd column count ${a.matrix[0].length}.`)), e.metadata !== void 0 && !u(e.metadata) && r.push("metadata must be an object when provided."), { ok: r.length === 0, errors: r };
}
function y(e) {
  const r = l(e);
  if (!r.ok)
    throw new Error(r.errors.join(`
`));
}
function f(e) {
  const r = [], a = l(e);
  if (r.push(...a.errors), !u(e))
    return { ok: !1, errors: r };
  e.schemaVersion !== "1.0" && r.push('schemaVersion must be "1.0".');
  const t = Array.isArray(e.hd) ? e.hd.length : void 0, s = e.similarity;
  return u(s) ? (s.format !== "csr" && r.push('similarity.format must be "csr".'), s.metric !== "snn" && r.push('similarity.metric must be "snn".'), (!Array.isArray(s.data) || s.data.some((i) => typeof i != "number" || !Number.isFinite(i))) && r.push("similarity.data must be an array of finite numbers."), (!Array.isArray(s.indices) || s.indices.some((i) => !Number.isInteger(i) || i < 0)) && r.push("similarity.indices must be an array of non-negative integers."), (!Array.isArray(s.indptr) || s.indptr.some((i) => !Number.isInteger(i) || i < 0)) && r.push("similarity.indptr must be an array of non-negative integers."), !Array.isArray(s.shape) || s.shape.length !== 2 || !s.shape.every((i) => Number.isInteger(i) && i >= 0) ? r.push("similarity.shape must be a [rows, columns] integer tuple.") : t !== void 0 && (s.shape[0] !== t || s.shape[1] !== t) && r.push(`similarity.shape must be [${t}, ${t}].`), Array.isArray(s.data) && Array.isArray(s.indices) && s.data.length !== s.indices.length && r.push("similarity.data length must match similarity.indices length."), Array.isArray(s.indptr) && t !== void 0 && s.indptr.length !== t + 1 && r.push(`similarity.indptr length must be ${t + 1}.`)) : r.push("similarity must be an object."), Array.isArray(e.knn) ? t !== void 0 && e.knn.length !== t ? r.push(`knn row count ${e.knn.length} must match hd row count ${t}.`) : e.knn.forEach((i, n) => {
    (!Array.isArray(i) || i.some((o) => !Number.isInteger(o) || o < 0 || t !== void 0 && o >= t)) && r.push(`knn[${n}] must contain valid point indices.`);
  }) : r.push("knn must be a 2D integer array."), { ok: r.length === 0, errors: r };
}
function d(e) {
  const r = f(e);
  if (!r.ok)
    throw new Error(r.errors.join(`
`));
}
export {
  c as DAB_SCHEMA_VERSION,
  d as assertDabDataset,
  y as assertRawInput,
  f as validateDabDataset,
  l as validateRawInput
};
