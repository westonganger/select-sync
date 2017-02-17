var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    del = require('del');

var paths = {
  src: './src/*.js',
  dist: './dist/'
};

gulp.task('default', ['minify']);

gulp.task('minify', [], function(cb){
  del(paths.dist+"*");

  pump([
    gulp.src(paths.src), 
    uglify({
      preserveComments: 'license'
    }), 
    rename({
      suffix: '.min'
    }),
    gulp.dest(paths.dist)
  ], cb);
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['minify']);
});
