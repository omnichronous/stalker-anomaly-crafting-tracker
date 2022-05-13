import 'dotenv/config'
import fs from 'fs-extra'
import { combine } from 'combine-json'
import path from 'path'
import _ from 'lodash'

const textsPath = '/configs/text/eng'
const inputBaseDir = process.env.GAMEDATA_OUTPUT
const inputDir = inputBaseDir + textsPath
const outputDir = './src/locales'
const outputPath = path.format({
  dir: outputDir,
  name: 'en',
  ext: '.json',
})

await fs.remove(outputPath)
await fs.ensureFile(outputPath)

console.time('Files combined')
const combined = await combine(inputDir)
const flattened = flatten(combined)
fs.outputJson(outputPath, flattened)
console.timeEnd('Files combined')

function flatten (texts) {
  return _(texts)
    .map('STRING_TABLE.STRING')
    .flatten()
    .map((item) => [item.$.ID, item.TEXT[0]])
    .fromPairs()
    .value()
}
