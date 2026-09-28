function deviceLabels(devices) {
  if (!Array.isArray(devices)) return [];
  const flags = new Set(devices);
  const hasComputer = flags.has("computer");
  const hasPhone = flags.has("phone");
  if (hasComputer && hasPhone) return ["Computer possible", "Phone possible"];
  if (hasComputer) return ["Computer required"];
  if (hasPhone) return ["Phone possible"];
  return [];
}
