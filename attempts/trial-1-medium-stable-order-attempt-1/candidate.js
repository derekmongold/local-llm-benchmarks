function orderActions(records) {
  const hasFinite = r => typeof r.priority === "number" && Number.isFinite(r.priority);
  return records.slice().sort((a, b) => {
    const aF = hasFinite(a);
    const bF = hasFinite(b);
    if (aF && bF) {
      if (a.priority !== b.priority) return a.priority - b.priority;
    } else if (aF) return -1;
    else if (bF) return 1;
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}
