var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', function () {
  return gulp.src([ 'lib/**' ])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
