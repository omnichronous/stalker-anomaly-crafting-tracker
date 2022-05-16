import transform from 'lodash/transform.js'

export default function (input) {
  const lineRegex = /\n/g
  const betweenBracketsRegex = /(?<=\[).+?(?=\])/g
  const lines = input.split(lineRegex)
  const nonBlankLines = lines.filter((line) => line.length)
  const sectionHeadingLines = nonBlankLines.filter((line) => betweenBracketsRegex.test(line))
  const sectionHeadingIndices = sectionHeadingLines.map((line) => lines.indexOf(line))
  const sectionBoundaries = [0, ...sectionHeadingIndices, lines.length]
  const sections = transform(
    sectionBoundaries,
    (sectionsResult, sectionStartIndex, sectionIndex) => {
      const id = lines[sectionStartIndex]?.match(betweenBracketsRegex)?.[0]
      const sectionEndIndex = sectionBoundaries[sectionIndex + 1]
      const sectionLines = lines.slice(sectionStartIndex + 1, sectionEndIndex)
      const sanitizedSectionLines = sectionLines.map((line) => line.replace(/[\t\r\s]/g, ''))
      const keyValueLines = sanitizedSectionLines.filter((line) => line.split('=').length === 2)
      const uncommentedKeyValueLines = keyValueLines.filter((line) => !line.startsWith(';') || line.startsWith(';inv_name'))
      const parsedKeyValuePairs = transform(
        uncommentedKeyValueLines,
        (jsonResult, line) => {
          const lineParts = line.split('=')
          const key = lineParts[0]
          const value = lineParts[1].replace('=', '')
          jsonResult[key] = value
        },
        {},
      )
      sectionsResult[id] = parsedKeyValuePairs
    },
    {},
  )
  return sections
}
