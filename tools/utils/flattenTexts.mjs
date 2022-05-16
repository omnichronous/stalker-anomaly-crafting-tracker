import _ from 'lodash'

export default function flatten (texts) {
  return _(texts)
    .map('STRING_TABLE.STRING')
    .flatten()
    .map((item) => [item.$.ID, item.TEXT[0]])
    .fromPairs()
    .value()
}
