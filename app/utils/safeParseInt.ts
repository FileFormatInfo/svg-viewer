

function safeParseInt(value: string, defaultValue: number): number {
    const parsedValue = parseInt(value, 10)
    return isNaN(parsedValue) ? defaultValue : parsedValue
}

export {
    safeParseInt
}