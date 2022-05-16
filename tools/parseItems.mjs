import { reduceDeep } from 'deepdash-es/standalone'
import 'dotenv/config'
import fs from 'fs-extra'
import _ from 'lodash'
import path from 'path'

const inputBaseDir = process.env.GAMEDATA_OUTPUT
const fileName = '/items.json'
const inputFilePath = inputBaseDir + fileName
const outputDir = process.env.COMBINED_OUTPUT
const outputPath = path.format({
  dir: outputDir,
  name: 'items',
  ext: '.json',
})

const items = await fs.readJson(inputFilePath, 'utf-8')

console.time('File generated')
const parsed = reduceDeep(
  items,
  (acc, value, key, _parent, _ctx) => {
    if (_.has(value, 'inv_name') || _.has(value, 'inv_name_short')) acc[key] = value
    return acc
  },
  {},
)
fs.outputJson(outputPath, parsed)
console.timeEnd('File generated')
