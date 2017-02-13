var path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    babel = require('gulp-babel'),
    del = require('del'),
    open = require('open'),
    webpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config');


gulp.task('clean', function (cb) {
    del(['build','lib']).then(function(){
        cb();
    })
});

gulp.task('start', function (cb) {
    var buildFirstTime = true;
    var webpackConfig = config.dev();
    var compiler = webpack(webpackConfig);

    compiler.plugin('done', stats => {
        if (stats.hasErrors()) {
            console.log(stats.toString({ colors: true }));
        }
        //只有第一次启动start的时候才执行
        if(buildFirstTime){
            buildFirstTime = false;
            cb && cb();
            // listening
            gutil.log("[webpack-dev-server]", gutil.colors.magenta("http://localhost:" + webpackConfig.port));
            gutil.log("[webpack-dev-server]", "To stop service, press [Ctrl + C] ..");
            open('http://localhost:'+ webpackConfig.port +'/demo/index.html');

        }
    });

    var server = new webpackDevServer(compiler, {
        hot: true,
        inline: true,
        // stats: { colors: true },
        quiet: true,
        publicPath: webpackConfig.output.publicPath,
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentBase: path.resolve(__dirname, './')
    }).listen(webpackConfig.port, '0.0.0.0', function (err) {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err)
        }

    });
});

gulp.task('build:dist',['clean'], function (cb) {

    var webpackConfig = config.prod();
    var compiler = webpack(webpackConfig, function (err, stats) {
        if (err) {
            gutil.log(err);
        }

        gutil.log(stats.toString({
            colors: true,
            chunks: false
        }));
    });
    compiler.plugin('done', stats => {
        if (stats.hasErrors()) {
            console.log(stats.toString({ colors: true }));
        }
        cb && cb();
    });

});


gulp.task('build:demo',['clean'], function (cb) {

    var webpackConfig = config.demo();

    var compiler = webpack(webpackConfig, function (err, stats) {
        if (err) {
            gutil.log(err);
        }

        gutil.log(stats.toString({
            colors: true,
            chunks: false
        }));
    });
    compiler.plugin('done', stats => {
        if (stats.hasErrors()) {
            console.log(stats.toString({ colors: true }));
        }
        cb && cb();
    });

});

gulp.task('build:lib',['clean'], function () {

    gulp.src(['src/**/*.less','src/**/*.scss'])
        .pipe(gulp.dest('lib'));

    return gulp.src('src/**/*.js?(x)')
        .pipe(babel())
        .pipe(gulp.dest('lib'));

});

gulp.task('default', ['start']);
gulp.task('build', ['build:dist', 'build:lib','build:demo']);