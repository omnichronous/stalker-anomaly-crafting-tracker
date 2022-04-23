<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      dark
      class="pt-4"
      color="grey darken-4"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Dajbog
          </v-list-item-title>
          <v-list-item-subtitle>
            Stalker Anomaly crafting tracker
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  //
}
</script>
