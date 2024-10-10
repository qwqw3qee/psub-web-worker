const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 处理字体文件，使用 url-loader 内联嵌入字体
    config.module
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: 100000, // 设置为小于10KB的字体文件内联
      name: 'fonts/[name].[hash:8].[ext]'
    })
    .end()

    // 禁用 preload 对 css 和 js 的预加载
    config.plugin('preload')
    .tap(args => {
      args[0].fileBlacklist.push(/\.css/, /\.js/)
      return args
    })
    config.plugin('inline-source')
      .use(require('html-webpack-inline-source-plugin'))
    config.plugin('html')
      .tap(args => {
        args[0].title = 'Subscription Converter'
        args[0].inlineSource = '(\.woff|\.ttf|\.css|\.js$)'
        return args
      })

  },
  productionSourceMap: false,
  pwa: {
    workboxOptions: {
      // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
      skipWaiting: true,
      clientsClaim: true,
      importWorkboxFrom: 'local',
      importsDirectory: 'js',
      navigateFallback: '/',
      navigateFallbackBlacklist: [/\/api\//]
    }
  }
};