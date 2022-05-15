import _ from 'lodash'
import parseRecipe from './parseRecipe.mjs'

export default function parseCraftManifest (manifest) {
  return _.mapValues(manifest, (group) => {
    const { title: category, ...recipes } = group
    return _.transform(
      recipes,
      (result, recipe, product) => {
        result.push({
          ...parseRecipe(recipe),
          name: product.replace('x_', ''),
          category,
        })
      },
      [])
  })
}
