function orderActions(records) {
  const n = records.length;
  const indices = Array.from({ length: n }, (_, i) => i);
  const isFiniteNum = r => typeof r.priority === 'number' && Number.isFinite(r.priority);
  
  indices.sort((i, j) => {
    const a = records[i];
    const b = records[j];
    const aFin = isFiniteNum(a);
    const bFin = isFiniteNum(b);
    
    if (aFin && bFin) {
      const diff = a.priority - b.priority;
      if (diff !== 0) return diff;
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    }
    
    if (aFin) return -1;
    if (bFin) return 1;
    
    return 0;
  });
  
  return indices.map(i => records[i]);
}
