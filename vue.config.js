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
  publicPath: process.env.NODE_ENV === 'production'
    ? '/stalker-anomaly-crafting-tracker'
    : '/',
})
