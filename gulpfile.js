/**
 * Created by diogoxiang on 2016/4/20.
 */
var gulp = require('gulp');
var gutil = require('gulp-util'); //让命令行输出的文字带颜色
var uglify = require('gulp-uglify'); //丑化(Uglify)
var cssnano = require('gulp-cssnano');  // 获取 minify-css 模块（用于压缩 CSS）这个是最新的
var imagemin = require('gulp-imagemin');  // 获取 gulp-imagemin 模块
var sass = require('gulp-ruby-sass');     // 获取 gulp-ruby-sass 模块
var rename = require('gulp-rename');      //重命名
var concat  = require('gulp-concat');     //合并文件

//默认方法
gulp.task('default', function () {
    gutil.log('message');
    gutil.log(gutil.colors.red('error'));
    gutil.log(gutil.colors.green('message:') + "some");
});

//配置 JS 任务
gulp.task('uglifyjs', function () {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});