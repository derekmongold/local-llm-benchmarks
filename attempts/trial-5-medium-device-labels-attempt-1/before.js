function deviceLabels(devices) {
  if (!Array.isArray(devices)) return [];
  const flags = new Set(devices);
  return [flags.has("phone") ? "Phone possible" : null, flags.has("computer") ? "Computer required" : null].filter(x => x !== null);
}
