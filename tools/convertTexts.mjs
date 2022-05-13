import 'dotenv/config'
import fs from 'fs-extra'
import path from 'path'
import readdir from 'recursive-readdir'
import xml2js from 'xml2js'

const textsPath = '/configs/text/eng'
const inputBaseDir = process.env.GAMEDATA_INPUT
const inputDir = inputBaseDir + textsPath
const outputBaseDir = process.env.GAMEDATA_OUTPUT
const outputDirTexts = outputBaseDir + textsPath

const files = await readdir(inputDir, [function (file) {
  return !/(?:st_items.*|ui_st_inventory.*)/.test(file)
}])

console.time('Files converted')
for (const filePath of files) {
  convertFile(filePath)
}
console.timeEnd('Files converted')

function generateOutputPath (filePath) {
  const fileName = path.basename(filePath, path.extname(filePath))
  const outputPath = path.format({
    dir: outputDirTexts,
    name: fileName,
    ext: '.json',
  })
  return outputPath
}

async function convertFile (filePath) {
  const originalContent = await fs.readFile(filePath, 'utf-8')
  const withoutComments = originalContent.replaceAll(/(?=<!--)([\s\S]*?)-->/g, '')
  try {
    const parsedContent = await xml2js.parseStringPromise(withoutComments, { strict: false })
    if (parsedContent) fs.outputJson(generateOutputPath(filePath), parsedContent)
  } catch (err) {
    console.group(`Error converting ${filePath}`)
    console.error(err)
    console.groupEnd()
  }
}
