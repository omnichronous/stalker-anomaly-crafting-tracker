import 'dotenv/config'
import fs from 'fs-extra'
import { combine } from 'combine-json'
import path from 'path'

const textsPath = '/configs/configs/text/eng'
const inputBaseDir = process.env.GAMEDATA_OUTPUT
const inputDir = inputBaseDir + textsPath
const outputDir = process.env.COMBINED_OUTPUT
const outputPath = path.format({
  dir: outputDir,
  name: 'texts',
  ext: '.json',
})

await fs.remove(outputPath)
await fs.ensureFile(outputPath)

console.time('Files combined')
const combined = await combine(inputDir)
fs.outputJson(outputPath, combined)
console.timeEnd('Files combined')
