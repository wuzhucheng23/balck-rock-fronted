const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            minimizer: [    // 图片压缩
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: [
                                ['gifsicle', {interlaced: true}],
                                ['jpegtran', {progressive: true}],
                                ['optipng', {optimizationLever: 5}],
                                ['svgo', {
                                    plugins: [
                                        ['preset-default', 'prefixIds', {
                                            name: 'sortAttrs',
                                            params: {
                                                xmlnsOrder: 'alphabetical'
                                            }
                                        }]
                                    ]
                                }
                                ]
                            ]
                        }
                    }
                })
            ]
        }
    }
};
