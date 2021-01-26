module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.2.105/api/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}