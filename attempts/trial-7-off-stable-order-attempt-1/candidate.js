function orderActions(records) {
  const hasFinite = r => typeof r.priority === 'number' && Number.isFinite(r.priority);
  const cmp = (a, b) => {
    const aF = hasFinite(a);
    const bF = hasFinite(b);
    if (aF && bF) {
      if (a.priority < b.priority) return -1;
      if (a.priority > b.priority) return 1;
    } else if (aF) {
      return -1;
    } else if (bF) {
      return 1;
    }
    const aId = typeof a.id === 'string' ? a.id : '';
    const bId = typeof b.id === 'string' ? b.id : '';
    if (aId < bId) return -1;
    if (aId > bId) return 1;
    return 0;
  };
  return records.map((r, i) => ({ r, i })).sort((x, y) => {
    const c = cmp(x.r, y.r);
    return c !== 0 ? c : x.i - y.i;
  }).map(item => item.r);
}
