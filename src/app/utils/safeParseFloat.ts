
function safeParseFloat(value: string, defaultValue: number): number {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
}

export {
    safeParseFloat
}