module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  // devServer: {
  //   port: 8080,
  //   open: true,
  //   disableHostCheck: true,
  //   proxy: {
  //     '/api': {
  //       target: 'http://47.88.9.231:81',
  //       ws: true,
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //     }
  //   },
  // },
};
