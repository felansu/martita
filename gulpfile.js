var del = require('del');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var util = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');

var ambiente = util.env.prod ? 'prod' : 'dev';
var configFile = './app/env/' + ambiente + '.js';

var path = {
    VENDOR: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-material/angular-material.js',
        'bower_components/materialize/dist/js/materialize.js',
        'bower_components/angular-material-sidemenu/dest/angular-material-sidemenu.js',
        'bower_components/firebase/firebase.js',
        'bower_components/angularfire/dist/angularfire.js',
        'bower_components/angular-materialize/src/angular-materialize.js',
        'bower_components/chart.js/dist/Chart.min.js',
        'bower_components/angular-chart.js/dist/angular-chart.min.js'
    ],
    APP: [
        'app/assets/**/*.js',
        'app/config/interceptor.js',
        'app/config/rotas.js',
        'app/config/auth.service.js',
        'app/shared/directives/**/**/*.js',
        'app/shared/services/fs-alert.service.js',
        'app/shared/services/fs-service.service.js',
        'app/views/dashboard/dashboard.controller.js',
        'app/views/dashboard/dashboard.service.js'

    ],
    HTML: [
        'app/**/**/*.json',
        'app/**/**/*.css',
        'app/**/**/*.html',
        'app/*.html'
    ],
    CSS: [
        'bower_components/angular-material/angular-material.min.css',
        'bower_components/angular-material-sidemenu/dest/angular-material-sidemenu.css',
        'bower_components/material-design-icons/iconfont/material-icons.css',
        'bower_components/materialize/dist/css/materialize.min.css',
        'app/assets/css/style.css',
        'app/views/dashboard/dashboard.style.css',
        'app/assets/css/animate.css'

    ],
    ROBOTO: [
        'bower_components/materialize/fonts/**/*.{ttf,woff,woff2}'
    ],
    ICONS: [
        'bower_components/material-design-icons/iconfont/**/*.{ttf,woff,woff2}'
    ],
    IMAGES: [
        'app/assets/img/*.*'
    ]
};

gulp.task('revision-code', function () {
    return gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('vendor-deploy', function () {
    return gulp.src(path.VENDOR, [configFile])
        .pipe(ngAnnotate())
        .pipe(util.env.prod ? uglify().on('error', util.log) : util.noop())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('app-deploy', function () {
    return gulp.src(path.APP, [configFile])
        .pipe(ngAnnotate())
        .pipe(util.env.prod ? uglify().on('error', util.log) : util.noop())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('styles-deploy', function () {
    gulp.src(path.CSS)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public'))
});

gulp.task('icons-deploy', function () {
    gulp.src(path.ICONS)
        .pipe(gulp.dest('./public'))
});

gulp.task('roboto-deploy', function () {
    gulp.src(path.ROBOTO)
        .pipe(gulp.dest('./public/fonts'))
});

gulp.task('images-deploy', function () {
    gulp.src(path.IMAGES)
        .pipe(gulp.dest('./public/assets/img/'))
});

gulp.task('html-deploy', function () {
    gulp.src(path.HTML)
        .pipe(gulp.dest('./public/'))
});

gulp.task('browserify', function () {
    return browserify('./app/config/module.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('build', [
    'clean',
    'revision-code',
    'vendor-deploy',
    'app-deploy',
    'styles-deploy',
    'icons-deploy',
    'roboto-deploy',
    'images-deploy',
    'html-deploy',
    'browserify'
]);

gulp.task('browser-sync', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: "./public",
            routes: {
                "/bower_components": "bower_components",
                "/node_modules": "node_modules"
            }
        },
        browser: "chrome"
    });
    console.log('  -------------------------------------  ');
    console.log('\tRodando em ambiente ' + ambiente);
    console.log('  -------------------------------------  ');
});

gulp.task('clean', function () {
    del.sync('public');
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(path.HTML, ["html-deploy"]).on('change', browserSync.reload);
    gulp.watch(path.IMAGES, ["images-deploy"]).on('change', browserSync.reload);
    gulp.watch(path.APP, ["app-deploy"]).on('change', browserSync.reload);
    gulp.watch(path.CSS, ["styles-deploy"]).on('change', browserSync.reload);
});