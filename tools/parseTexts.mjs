import 'dotenv/config'
import fs from 'fs-extra'
import path from 'path'
import flattenTexts from './utils/flattenTexts.mjs'

const textsFileName = '/texts.json'
const textsInputFilePath = process.env.GAMEDATA_OUTPUT + textsFileName
const outputDir = process.env.COMBINED_OUTPUT
const outputPath = path.format({
  dir: outputDir,
  name: 'texts',
  ext: '.json',
})

const texts = await fs.readJson(textsInputFilePath, 'utf-8')

console.time('File generated')
fs.outputJson(outputPath, flattenTexts(texts))
console.timeEnd('File generated')
