const babel = require('gulp-babel');
const gulp = require('gulp');
const gulpDebug = require('gulp-debug');
const gulpIf = require('gulp-if');
const path = require('path');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const MVN_OUTPUT_DIR = path.join('target', 'classes');
const FRONTEND_SRC_DIR = path.join('src', 'main', 'resources');
const jsFiles = path.join(FRONTEND_SRC_DIR, '**', '*.js');

//
// Define low-level, compose-able sub-steps for our gulp tasks
//

function errorHandler(inWatchTask) {
    // we want to be lenient on syntax and compilation errors in development,
    // but harsh when building our plugin for distribution. Therefore,
    // we only activate plumber if we're running gulp via our watch task.
    return gulpIf(inWatchTask, plumber());
}

function processOurJavaScript(watching = false) {
    return gulp.src(jsFiles)
        .pipe(errorHandler(watching))
        .pipe(babel())
        .pipe(gulp.dest(MVN_OUTPUT_DIR))
        .pipe(gulpDebug({title: 'transpiled'}))
        .pipe(uglify())
        .pipe(rename({ suffix: '-min' }))
        .pipe(gulpDebug({title: 'minified'}))
        .pipe(gulp.dest(MVN_OUTPUT_DIR));
}

function processJs(watching = false) {
    return processOurJavaScript.bind(this, watching);
}

function watchJs() {
    gulp.watch(jsFiles, processJs(true));
}

//
// Define our high-level tasks as a composition of our
// sub-steps...
//

/**
 * I use a parallel task here, because later I can also add compilation
 * processes for our non-JavaScript assets, like our CSS and templates.
 */
let processResources = gulp.parallel(processJs(false));
let watchAllResources = gulp.parallel(watchJs);

//
// And finally, export so that gulp can run the tasks
//

gulp.task('build', processResources);
gulp.task('default', processResources);
gulp.task('watch', watchAllResources);
