var gulp = require('gulp'),
del = require('del'),
changed = require('gulp-changed'),
imagemin = require('gulp-imagemin'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
typescript = require('gulp-typescript'),
tscConfig = require('./angular/tsconfig.json');

gulp.task('default', ['watch', 'compile']);

gulp.task('compile', ['images', 'sass', 'javascript']);

gulp.task('clean', function(cb) {
    return del(["./public/assets/*"], cb);
});


gulp.task('images', ['clean'], function() {
    var srcPath = "./app/assets/images/**",
        destPath = "./public/assets/images";

    return gulp.src(srcPath)
      .pipe(changed(destPath)) // Ignore unchanged files
      .pipe(imagemin()) // Optimize images
      .pipe(gulp.dest(destPath)); //Write images to public dir
});


gulp.task('sass', ['clean'], function() {
    var srcPath = "./app/assets/stylesheets/**/*.scss",
        destPath = "./public/assets";

    return gulp.src(srcPath, { base: 'app/assets' })
      .pipe(sourcemaps.init({loadMaps: true})) // Tell gulp we want sourcemaps too
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('application.css'))
      .pipe(sourcemaps.write())
      .pipe(autoprefixer({ browsers: ['last 2 version'] })) //Browser specific prefixes
      .pipe(gulp.dest(destPath));
});


gulp.task('javascript', ['js', 'compileTS', 'copy:libs'])

gulp.task('js', ['clean'], function() {
    var srcPath = "./app/assets/javascripts/**/*.js",
        destPath = "./public/assets";

    return gulp.src(srcPath)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('application.js')) // Merge into 1 file
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(destPath));
});

gulp.task('compileTS', ['clean'], function() {
    var srcPath = "./angular/app/**/*.ts",
        destPath = "./public/assets/app",
        htmlsrcPath = "./angular/app/**/*.html",
        cssSrcPath = "./angular/app/**/*.css";

    gulp.src(htmlsrcPath)
      .pipe(gulp.dest(destPath));
    gulp.src(cssSrcPath)
      .pipe(gulp.dest(destPath));

    return gulp.src(srcPath)
      .pipe(sourcemaps.init())
      .pipe(typescript(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(destPath));
});

gulp.task('copy:libs', ['clean'], function() {
    return gulp.src([
        './angular/node_modules/es6-shim/es6-shim.min.js',
        './angular/node_modules/systemjs/dist/system-polyfills.js',
        './angular/node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',

        './angular/node_modules/angular2/bundles/angular2-polyfills.js',
        './angular/node_modules/systemjs/dist/system.src.js',
        './angular/node_modules/rxjs/bundles/Rx.js',
        './angular/node_modules/angular2/bundles/angular2.dev.js',
        './angular/node_modules/angular2/bundles/router.dev.js',
        './angular/node_modules/angular2/bundles/http.dev.js'
    ])
    .pipe(gulp.dest('./public/assets/libs'));
});


gulp.task('watch', function() {
    gulp.watch("./app/assets/stylesheets/**/*", ['compile']);
    gulp.watch("./app/assets/javascripts/**/*", ['compile']);
    gulp.watch("./app/assets/images/*", ['compile']);
    gulp.watch("./angular/app/**/*", ['compile']);
});

