var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
gulp.task("sass", function() {
  return gulp
    .src("style/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"));
});
