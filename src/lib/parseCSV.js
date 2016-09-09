// Functions that returns itself
const identity = x => x

export default function parseCSV(csvString, { transform = identity } = {}) {
  const lines = csvString.trim().split(/\r?\n/)
  // todo check there's at least one line
  const keys = lines[0].split(',')
  const data = []
  for ( let lineNum = 1; lineNum < lines.length; lineNum++ ) {
    const values = lines[lineNum].trim().split(',')
    const record = {}
    for ( let i=0; i<values.length; i++) {
      let value = values[i]
      try {
        // Don't parse empty strings
        if (value) value = JSON.parse(value)
      } catch (err) {
        console.warn(`Error trying to parse CSV value "${value}" on line ${lineNum}: ${err.message}`)
      }
      const key = keys[i]
      record[key] = value
    }
    const transformedRecord = transform(record)
    data.push(transformedRecord)
  }
  return data
}
