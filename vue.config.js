module.exports = {
  publicPath: '/',
  assetsDir: 'assets',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://blogapi.evacgn.com/api/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    disableHostCheck: true
  }
}
