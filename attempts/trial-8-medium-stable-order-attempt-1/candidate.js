function orderActions(records) {
  const isFiniteNum = r => typeof r.priority === "number" && Number.isFinite(r.priority);
  const cmpId = (a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  return records.slice().sort((a, b) => {
    const aOk = isFiniteNum(a);
    const bOk = isFiniteNum(b);
    if (aOk && bOk) {
      if (a.priority < b.priority) return -1;
      if (a.priority > b.priority) return 1;
      return cmpId(a, b);
    }
    if (aOk) return -1;
    if (bOk) return 1;
    return cmpId(a, b);
  });
}
