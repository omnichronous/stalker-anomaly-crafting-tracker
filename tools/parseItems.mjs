import { filterDeep, reduceDeep } from 'deepdash-es/standalone'
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
  filterDeep(
    items,
    (_value, key, _parent) => {
      const isItemValid = _.some([
        'inv_',
        'description',
      ], (keyword) => key.includes(keyword))
      if (isItemValid) return true
    // if (parent.inv_name) return true
    },
  ),
  (result, value, key) => {
    if (value.inv_name) result[key] = value
    return result
  },
)
fs.outputJson(outputPath, parsed)
console.timeEnd('File generated')
