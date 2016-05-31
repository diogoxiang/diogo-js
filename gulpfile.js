/**
 * Created by diogoxiang on 2016/4/20.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'), //让命令行输出的文字带颜色
    uglify = require('gulp-uglify'), //丑化(Uglify)
    cssnano = require('gulp-cssnano'), // 获取 minify-css 模块（用于压缩 CSS）这个是最新的
    imagemin = require('gulp-imagemin'), // 获取 gulp-imagemin 模块
    sass = require('gulp-ruby-sass'), // 获取 gulp-ruby-sass 模块
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    watchPath = require('gulp-watch-path'), //实际上我们只需要重新编译被修改的文件
    combiner = require('stream-combiner2'), //监听错误
    sourcemaps = require('gulp-sourcemaps'), //map调试
    clean = require('gulp-clean'); //清空文件夹
///var inject=require('gulp-inject'); // 功能 很强大的插入数据插件

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin))
};

var distpath='dist/';
//默认方法
gulp.task('default', function() {
    gutil.log('message');
    gutil.log(gutil.colors.red('error'));
    gutil.log(gutil.colors.green('message:') + "some");
});

//合并js模块
gulp.task('buildJs',function () {

    var combined = combiner.obj([
        gulp.src('src/js/verdor/*.js'),
        concat('verdor.js'),
        uglify(),
        gulp.dest('dist/js')
    ]);

    combined.on('error', handleError);


});

//配置 JS 任务 压缩JS
gulp.task('uglifyjs', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watchjs', function () {
    gulp.watch('src/js/**/*.js', function (event) {
        var paths = watchPath(event, 'src/', 'dist/');
        /*
         paths
         { srcPath: 'src/js/log.js',
         srcDir: 'src/js/',
         distPath: 'dist/js/log.js',
         distDir: 'dist/js/',
         srcFilename: 'log.js',
         distFilename: 'log.js' }
         */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ]);

        combined.on('error', handleError)
    })
});


gulp.task('watchcss', function () {
    gulp.watch('src/css/**/*.css', function (event) {
        var paths = watchPath(event, 'src/', 'dist/');

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);
        gulp.src(paths.srcPath)
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: 'last 2 versions'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
            .pipe(rename({suffix: '.min' }))
            .pipe(cssnano())//精简
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
});

//压缩所有css
gulp.task('minifycss', function () {
    gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(rename({suffix: '.min' }))
        .pipe(cssnano())//精简
        .pipe(gulp.dest('dist/css/'))
});


//监听图片变化
gulp.task('watchimage', function() {
    gulp.watch('src/images/**/*', function(event) {
        var paths = watchPath(event, 'src/', 'dist/');

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
});
//直接全部压缩
gulp.task('image', function () {
    gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
});

//配置文件复制任务
gulp.task('copy', function () {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
});

//清理 dist 目录 的数据
gulp.task('cleanDist',function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});



//配置文件复制任务 复制文件到 上一级目录中去
gulp.task('copydir', function () {
    gulp.src('src/js/**/*')
        .pipe(gulp.dest('../name/'))
});


//测试目录 监听

gulp.task('watchTestsass',function () {
    var cssSrc = 'test/ranking/sass/*.scss',
        cssSrca= 'test/ranking/css';//源码也输出一份

    gulp.watch('test/ranking/sass/**/*.scss', function (event) {
        var paths = watchPath(event,'test/ranking/sass/','test/ranking/css/');

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcPath)
        return sass(cssSrc, {style: 'expanded'})
            .pipe(gulp.dest(cssSrca))
            .pipe(rename({suffix: '.min' }))
            .pipe(cssnano())//精简
            .pipe(gulp.dest(cssSrca))
            .on('error', function (err) {
                console.error('Error!', err.message);
            });

    })



});

gulp.task('sass', function() {
    var cssSrc = './src/sass/*.scss',
        cssSrca= './src/css';//源码也输出一份


    gulp.src(cssSrc)
    // .pipe(sass({ style: 'expanded'}))
    return sass(cssSrc, {style: 'expanded'})
        .pipe(gulp.dest(cssSrca))
        .pipe(rename({suffix: '.min' }))
        .pipe(cssnano())//精简
        .pipe(gulp.dest(cssSrca))
        .on('error', function (err) {
            console.error('Error!', err.message);
        });

});