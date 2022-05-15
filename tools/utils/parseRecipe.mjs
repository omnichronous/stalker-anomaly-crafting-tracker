import _ from 'lodash'
import getToolkitName from './getToolkitName.mjs'

export default function parseRecipe (schema) {
  const [
    toolsId,
    book,
    ...ingredients
  ] = schema.split(',')
  return {
    tools: getToolkitName(toolsId),
    book,
    ingredients: _.fromPairs(
      _.chunk(ingredients, 2),
    ),
  }
}
