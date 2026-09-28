function deviceLabels(devices) {
  if (!Array.isArray(devices)) return [];
  const flags = new Set(devices);
  const hasComputer = flags.has("computer");
  const hasPhone = flags.has("phone");
  const result = [];
  if (hasComputer) result.push(hasPhone ? "Computer possible" : "Computer required");
  if (hasPhone) result.push("Phone possible");
  return result;
}
