import 'dotenv/config'
import fs from 'fs-extra'
import path from 'path'
import readdir from 'recursive-readdir'
import ltxToJson from './utils/ltxToJson.mjs'

const itemsPath = '/configs/configs/items'
const inputBaseDir = process.env.GAMEDATA_INPUT
const inputDir = inputBaseDir + itemsPath
const outputBaseDir = process.env.GAMEDATA_OUTPUT
const outputDirItems = outputBaseDir + itemsPath

const files = await readdir(inputDir, ['**base**'])

console.time('Files converted')
for (const filePath of files) {
  convertFile(filePath)
}
console.timeEnd('Files converted')

function generateOutputPath (filePath) {
  const relativePath = path.relative(inputDir, filePath)
  const relativeDirName = path.dirname(relativePath)
  const fileName = path.basename(relativePath, path.extname(relativePath))
  const outputDir = path.join(outputDirItems, relativeDirName)
  const outputPath = path.format({
    dir: outputDir,
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
