var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var util = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');

var ambiente = util.env.prod ? 'prod' : 'dev';
var configFile = './app/env/' + ambiente + '.js';

var path = {
	DEPENDENCIES: [
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/angular/angular.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'node_modules/angular-aria/angular-aria.min.js',
		'node_modules/angular-material/angular-material.min.js',
		'node_modules/angular-ui-grid/ui-grid.min.js',
		'node_modules/angular-materialize/src/angular-materialize.min.js',
		'node_modules/materialize-css/dist/js/materialize.min.js',
		'node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.js',
		'node_modules/angularfire/dist/angularfire.min.js',
		'node_modules/firebase/firebase.js',
		'node_modules/chart.js/dist/Chart.min.js',
		'node_modules/angular-chart.js/dist/angular-chart.min.js',
		'node_modules/tc-angular-chartjs/dist/tc-angular-chartjs.min.js'
	],
	JS: [
		'app/assets/**/*.js',
		'app/config/rotas.js',
		'app/config/auth.service.js',
		'app/views/main/main.controller.js',
		'app/views/main/main.service.js',
		'app/views/main/main.directive.js'
	],
	JSON: [
		'app/views/**/*.json'
	],
	CSS: [
		'app/**/*.html',
		'app/**/*.css',
		'app/**/*.json',
		'node_modules/angular-material/angular-material.min.css',
		'node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.css',
		'node_modules/angular-ui-grid/ui-grid.min.css',
		'node_modules/material-design-icons/iconfont/material-icons.css',
		'node_modules/materialize-css/dist/css/materialize.min.css',
		'node_modules/material-design-icons/iconfont/**/*.{ttf,woff,woff2,eof,svg}',
		'node_modules/angular-ui-grid/**/*.{ttf,woff,woff2,eof,svg}'
	],
	FONTES: [
		'node_modules/materialize-css/fonts/**/*.{ttf,woff,woff2,eof,svg}'
	]
};
gulp.task('lint', function () {
	return gulp.src('./app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('dependencies', function () {
	return gulp.src(path.DEPENDENCIES, [configFile])
		.pipe(ngAnnotate())
		.pipe(util.env.prod ? uglify() : util.noop())
		.pipe(concat('dependencies.min.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('scripts', function () {
	return gulp.src(path.JS, [configFile])
		.pipe(ngAnnotate())
		.pipe(util.env.prod ? uglify() : util.noop())
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('browserify', function () {
	return browserify('./app/config/module.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('copy', ['browserify'], function () {
	gulp.src(path.CSS)
		.pipe(gulp.dest('./public'))
		.pipe(browserSync.stream())
});

gulp.task('fontes', ['browserify'], function () {
	gulp.src(path.FONTES)
		.pipe(gulp.dest('./public/fonts'))
		.pipe(browserSync.stream())
});

gulp.task('build', ['lint', 'copy', 'fontes', 'dependencies', 'scripts']);

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
	console.log('Rodando em ambiente ' + ambiente);
});

gulp.task('default', ['browser-sync'], function () {

	gulp.watch(["./app/views/**/*.*", "./app/*.*"], ["build"]);
	gulp.watch("./public/**/*.*").on('change', browserSync.reload);
});