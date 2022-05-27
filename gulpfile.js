var gulp = require('gulp');
var ts = require('gulp-typescript');
var run = require('gulp-run');

gulp.task('compile', function () {
    // Get TS Project for compilation
    var tsProject = ts.createProject('tsconfig.json');

    // Compile
    var result = tsProject.src().pipe(ts(tsProject));

    // Output to ./out
    return result.js.pipe(gulp.dest('out'));
});

gulp.task('sync', function () {
    var cmd = new run.Command('npm');
    cmd.exec('run sync'); // npm run sync
})

gulp.task('watch', ['compile'], function () {
    gulp.watch('src/**/*.ts', ['compile']);
});

gulp.task('watch-sync', ['compile', "sync"], function () {
    gulp.watch('src/**/*.ts', ['compile', "sync"]);
});