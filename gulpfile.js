"use strict";
//coreect the bug

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./src/css/style.css'
    	],
		dist: './dist',
		mainJs: './src/main.js',
		jsrc: './src/js/'

	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open('', { url: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist+"/scripts/html"))
		.pipe(connect.reload());
});

gulp.task('js', function() {

    browserify(config.paths.mainJs)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(uglify())
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
	browserify(config.paths.jsrc+'background.js')
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('background.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
	browserify(config.paths.jsrc+'controllers/weatherController.js')
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
	browserify(config.paths.jsrc+'services/weatherService.js')
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('weatherService.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
	browserify(config.paths.jsrc+'angular.min.js')
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('angular.min.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());

/*	browserify(config.paths.jsrc+'weather.js')
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('weather.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
*/


});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/scripts/css'));
});

// Migrates images to dist folder
// Note that I could even optimize my images here
gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/scripts/images'))
        .pipe(connect.reload());

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
});

//gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);

gulp.task('default', function() {
	gulp.start('html', 'js', 'css', 'images', 'open', 'watch');
});