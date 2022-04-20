const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  productionSourceMap: false,

  css: {
    sourceMap: true,
  },
})
