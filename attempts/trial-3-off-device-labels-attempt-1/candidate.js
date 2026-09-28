function deviceLabels(devices) {
  if (!Array.isArray(devices) || devices.length === 0) return [];
  
  const hasComputer = devices.includes("computer");
  const hasPhone = devices.includes("phone");
  
  const result = [];
  
  if (hasComputer) {
    result.push(hasPhone ? "Computer possible" : "Computer required");
  }
  
  if (hasPhone) {
    result.push("Phone possible");
  }
  
  return result;
}
