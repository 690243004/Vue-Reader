const webpack = require('webpack')
const path = require('path')
// 她可以将打包后的内容束展示为方便交互的直观树状图，让你明白你所构建包中真正引入的内容
const {
    BundleAnalyzerPlugin
  } = require('webpack-bundle-analyzer')

const vendor = [ 'vue','vuex','vue-router' ]

const dllPath = path.join(__dirname, 'dll');

module.exports = {
  entry: {
    dll: vendor
  },

  output: {
    path: dllPath,
    filename: "[name].js",
    library: "_dll_[name]"
  },

  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.join(__dirname, 'dll','manifest.json'),
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: 'static'
    }),
  ],
}
