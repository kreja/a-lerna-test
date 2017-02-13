/**
 * 说明: webpack的配置请在该文件进行修改
 * webpack配置文档请查看:https://webpack.github.io/docs/configuration.html
 */

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var precss = require('precss');
var glob = require('glob');
var autoprefixer = require('autoprefixer');

var componentName = 'Layer',
    srcPath = path.resolve(__dirname, './src'),
    demoPath = path.resolve(__dirname, './demo'),
    outputPath = path.resolve(__dirname, './build');


var config = {

    //服务器开启的端口号
    port : '3000',

    context: srcPath,

    //webpack 编译的入口文件
    entry: {
        index: ['./index.scss', './index.jsx']
    },

    //输出的文件配置
    output: {
        path: outputPath,
        filename: '[name].js',
        publicPath: '/build/',
        //设置library 则可以直接通过 window.xxx 访问到
        library: componentName,
        libraryTarget: 'umd'
    },

    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx'],
        alias : {
            '@alife/blue-layer' : srcPath,
            '@alife/blue-layer/lib' : srcPath
        }
    },

    externals: [{
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    }, {
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    }],

    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel', 'eslint']
        }, {
            test: /\.less/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style', 'raw!postcss!less')
        }, {
            test: /\.scss/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style', 'raw!postcss!@ali/sass-loader')
        }]
    },

    postcss: function () {
        return [precss, autoprefixer];
    },

    plugins: [
        //允许错误不打断程序
        new webpack.NoErrorsPlugin(),
        //查找相等或近似的模块，避免在最终生成的文件中出现重复的模块。
        new webpack.optimize.DedupePlugin(),
        //Webpack gives IDs to identify your modules. With this plugin,
        // Webpack will analyze and prioritize often used modules assigning them the smallest ids.
        new webpack.optimize.OccurenceOrderPlugin(),

        //进度插件
        new webpack.ProgressPlugin((percentage, msg) => {
            const stream = process.stderr;
            if (stream.isTTY && percentage < 0.71) {
                stream.cursorTo(0);
                stream.write(`📦   ${msg}`);
                stream.clearLine(1);
            }
        })
    ]
};


/**
 * 获取demo文件夹中的入口文件
 * @param cwd
 * @returns {{}}
 */
function getDevEntry(cwd){

    var entry = {};
    glob.sync('*.jsx', {cwd: cwd}).forEach(function (item, i) {
        var file = item.replace('.jsx','');
        entry[file] = [
            'webpack-dev-server/client?http://0.0.0.0:' + config.port + '/',
            'webpack/hot/only-dev-server',
            file + '.scss',
            item
        ];
    });
    return entry;
}

/**
 * 开发环境及demo编译时的配置
 * @returns {*}
 */
function dev(){

    var _config = _.cloneDeep(config);

    _config.context = demoPath;
    _config.resolve.root = demoPath;
    _config.output = {
        path: demoPath,
        filename: '[name].js',
        publicPath: '/demo/'
    };
    _config.externals = null;

    _config.plugins.push(
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify('development') },
            "__DEV__": JSON.stringify(JSON.parse('true'))
        }),

        //代码热替换
        new webpack.HotModuleReplacementPlugin(),

        new ExtractTextPlugin('[name].css', { allChunks: true })
    );

    //添加soure-map
    _config.devtool = 'source-map';
    //入口文件添加server 和 hrm
    _config.entry = getDevEntry(demoPath);

    return _config;
}


/**
 * 编译到demo文件夹的配置
 * 与dev的区别是不需要调试相关的配置
 */
function demo(){
    var _config = _.cloneDeep(config);
    _config.context = demoPath;
    _config.resolve.root = demoPath;
    _config.output = {
        path: demoPath,
        filename: '[name].js',
        publicPath: '/demo/'
    };
    _config.externals = null;

    _config.plugins.push(
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify('production') },
            "__DEV__": JSON.stringify(JSON.parse('false'))
        }),

        new ExtractTextPlugin('[name].css', { allChunks: true })

    );

    _config.entry = getDevEntry(demoPath);

    //删除dev相关设置
    for(var i in _config.entry){
        _config.entry[i] = _config.entry[i].slice(2);
    }

    return _config;
}


/**
 * 发布到cdn及tnpm时的配置
 * @returns {*}
 */
function prod(){

    var _config = _.cloneDeep(config);
    //build环境
    _config.plugins.push(
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify('production') },
            "__DEV__": JSON.stringify(JSON.parse('false'))
        }),

        new ExtractTextPlugin('[name].css', { allChunks: true }),

        //压缩代码
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: { warnings: false },
            output: { comments: false }
        })
    );

    return _config;
}

module.exports = {

    dev : dev,

    demo : demo,

    prod : prod

};
