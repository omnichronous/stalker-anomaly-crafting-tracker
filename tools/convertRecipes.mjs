import 'dotenv/config'
import fs from 'fs-extra'
import path from 'path'
import ltxToJson from './utils/ltxToJson.mjs'

const inputRelativeFilePath = '/configs/items/settings/craft.ltx'
const inputBaseDir = process.env.GAMEDATA_INPUT
const inputFilePath = inputBaseDir + inputRelativeFilePath
const outputBaseDir = './src/gamedata'

console.time('Recipes converted')
convertFile(inputFilePath)
console.timeEnd('Recipes converted')

function generateOutputPath (filePath) {
  const fileName = path.basename(filePath, path.extname(filePath))
  const outputPath = path.format({
    dir: outputBaseDir,
    name: fileName,
    ext: '.json',
  })
  return outputPath
}

async function convertFile (filePath) {
  const originalContent = await fs.readFile(filePath, 'utf-8')
  const parsedContent = ltxToJson(originalContent)
  fs.outputJson(generateOutputPath(filePath), parsedContent)
}
