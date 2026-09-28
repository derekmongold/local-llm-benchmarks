function orderActions(records) {
  const priority = r => typeof r.priority === "number" && Number.isFinite(r.priority) ? r.priority : Infinity;
  return records.slice().sort((a,b) => priority(a)-priority(b));
}
