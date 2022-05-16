import 'dotenv/config'
import fs from 'fs-extra'
import path from 'path'
import parseCraftManifest from './utils/parseCraftManifest.mjs'

const inputBaseDir = process.env.GAMEDATA_OUTPUT
const fileName = '/craft.json'
const inputFilePath = inputBaseDir + fileName
const outputDir = process.env.COMBINED_OUTPUT
const outputPath = path.format({
  dir: outputDir,
  name: 'recipes',
  ext: '.json',
})

const craftManifest = await fs.readJson(inputFilePath, 'utf-8')

console.time('File generated')
const parsed = parseCraftManifest(craftManifest)
fs.outputJson(outputPath, parsed)
console.timeEnd('File generated')
