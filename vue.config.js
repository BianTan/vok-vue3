module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    disableHostCheck: true
  }
}