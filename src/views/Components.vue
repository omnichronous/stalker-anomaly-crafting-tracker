<template>
  <div class="pa-sm-4">
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="name"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Components</v-toolbar-title>
        </v-toolbar>
      </template>
      <template #[`item.count`]="{ item }">
        <div class="mt-6 mt-sm-0">
          <v-edit-dialog
            :return-value="editedValue"
            @save="save(item.id)"
          >
            <v-text-field
              :value="quantities[item.id]"
              label="Quantity"
              hide-details
              :single-line="!$vuetify.breakpoint.mobile"
              readonly
              class="text-sm-right"
            />
            <template #input>
              <v-text-field
                :value="editedValue"
                label="Set"
                type="number"
                hint="Press Enter to save or click outside to cancel"
                single-line
                class="d-inline-block"
                @input="handleInput"
              />
            </template>
          </v-edit-dialog>
        </div>
      </template>
      <template #[`item.name`]="{ item }">
        <div class="py-4">
          <div class="text-h6 text-left">
            {{ item.name }}
          </div>
          <div class="text--secondary text-justify text-sm-left">
            {{ item.description }}
          </div>
        </div>
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}

      <template #action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="snack = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { filter, endsWith, map, find, uniqBy } from 'lodash'
import { mapMutations, mapState } from 'vuex'
import parts from '../../public/gamedata/config/st_items_parts'

export default {
  name: 'ViewComponents',

  data () {
    return {
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: 'Quantity',
          value: 'count',
        },
        {
          text: 'Name',
          value: 'name',
        },
      ],
      items: this.parseData(parts),
      minZero: (v) => v >= 0 || 'Quantity can only be 0 or more',
      snack: false,
      snackColor: '',
      snackText: '',
      editedValue: null,
    }
  },

  computed: {
    ...mapState(['quantities']),
  },

  methods: {
    ...mapMutations(['SET_QUANTITIES']),
    parseData (items) {
      const descriptionMarker = '_descr'
      const nameObjects = filter(items, (item) => !endsWith(item['@id'], descriptionMarker))
      const combinedObjects = map(nameObjects, (item) => {
        const descriptionObject = find(items, { '@id': `${item['@id']}${descriptionMarker}` })
        return {
          id: item['@id'],
          name: item.text,
          description: descriptionObject.text,
        }
      })
      return uniqBy(combinedObjects, 'name')
    },
    handleInput (value) {
      this.editedValue = Number(value)
    },
    save (id) {
      this.SET_QUANTITIES({ [id]: this.editedValue })
      this.editedValue = null
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Quantity set'
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table__mobile-row__header {
  display: none;
}
</style>
