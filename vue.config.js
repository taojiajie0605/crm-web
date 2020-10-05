const path = require('path');
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const { getThemeColors, modifyVars } = require('./src/utils/themeUtil');
const { resolveCss } = require('./src/utils/theme-color-replacer-extend');
// function resolve(dir) {
//     return path.join(__dirname, dir);
// }

module.exports = {
    devServer: {
        port: 8080,
        //跨域问题
        //proxy: 'http://172.20.16.15:8888',
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/theme/theme.less')],
        },
    },
    configureWebpack: (config) => {
        config.entry.app = ['babel-polyfill', 'whatwg-fetch', './src/main.js'];
        config.plugins.push(
            new ThemeColorReplacer({
                fileName: 'css/theme-colors-[contenthash:8].css',
                matchColors: getThemeColors(),
                injectCss: true,
                resolveCss,
            }),
        );
        // config.module.rules.push({
        //     test: /\.svg$/,
        //     loader: 'svg-sprite-loader',
        //     include: [resolve('/src/assets/icons')],
        //     options: {
        //         symbolId: 'icon-[name]',
        //     },
        // });
    },
    chainWebpack: (config) => {
        // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
        if (process.env.NODE_ENV === 'production') {
            config.plugin('optimize-css').tap((args) => {
                args[0].cssnanoOptions.preset[1].colormin = false;
                return args;
            });
        }
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: modifyVars(),
                    javascriptEnabled: true,
                },
            },
        },
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
};
