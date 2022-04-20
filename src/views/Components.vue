<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Components</v-toolbar-title>
      </v-toolbar>
    </template>
    <template #expanded-item="{ headers: { length: columnCount }, item }">
      <td
        :colspan="columnCount"
        class="py-6"
      >
        {{ item.description }}
      </td>
    </template>
    <template #[`item.count`]="{ item }">
      <v-chip dark>
        {{ getCount(item) }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { filter, endsWith, map, find, uniqBy } from 'lodash'
import parts from '../../public/gamedata/config/st_items_parts'

export default {
  name: 'ViewComponents',

  data () {
    return {
      expanded: [],
      singleExpand: false,
      headers: [
        // {
        //   text: 'Image',
        //   align: 'end',
        //   sortable: false,
        //   value: 'image',
        // },
        {
          text: 'Quantity',
          align: 'end',
          value: 'count',
        },
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        { text: '', value: 'data-table-expand' },
      ],
      items: Object.freeze(this.parseData(parts)),
    }
  },

  methods: {
    parseData (items) {
      const descriptionMarker = '_descr'
      const nameObjects = filter(items, (item) => !endsWith(item['@id'], descriptionMarker))
      const combinedObjects = map(nameObjects, (item) => {
        const descriptionObject = find(items, { '@id': `${item['@id']}${descriptionMarker}` })
        return {
          name: item.text,
          description: descriptionObject.text,
        }
      })
      return uniqBy(combinedObjects, 'name')
    },
    getCount (item) {
      return Math.floor(Math.random() * (10 - 0 + 1)) + 0
    },
  },
}
</script>
