const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ],
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    sourceMap: true,
  },
})
