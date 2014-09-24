var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var handlebars = require('gulp-ember-handlebars');
var transpiler = require('gulp-es6-module-transpiler');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var less = require('gulp-less');

var paths = {
    templates: [
        'js/templates/**/*.handlebars'
    ],
    jshint: [
        'js/app/**/*.js',
        'js/tests/**/*.js'
    ],
    concatDist: [
        'js/vendor/jquery/dist/jquery.js',
        'vendor/fastclick.js',
        'js/vendor/bootstrap/dist/js/bootstrap.min.js',
        'js/vendor/handlebars/handlebars.js',
        'js/vendor/ember/ember.min.js',
        'js/vendor/ember-loader/loader.js',
        'js/vendor/ember-resolver/dist/ember-resolver.js',
        'js/vendor/bootstrap/dist/js/boostrap.min.js',
        'js/dist/tmpl.min.js',
        'js/app/**/*.js'
    ],
    concatTest: [
        'js/vendor/jquery/dist/jquery.js',
        'vendor/fastclick.js',
        'js/vendor/fauxjax/dist/fauxjax.min.js',
        'js/vendor/bootstrap/dist/js/bootstrap.min.js',
        'js/vendor/handlebars/handlebars.js',
        'js/vendor/ember/ember.js',
        'js/vendor/ember-loader/loader.js',
        'js/vendor/ember-resolver/dist/ember-resolver.js',
        'js/dist/tmpl.min.js',
        'js/app/**/*.js',
        'js/tests/**/*.js',
        'vendor/test-loader.js'
    ],
    concatCss: [
        'js/vendor/bootstrap/dist/css/bootstrap.min.css',
        'css/app/**/*.css'
    ]
};

var filter = gulpFilter(function(file) {
  var vendor = file.path.indexOf('vendor') === -1;
  var templates = file.path.indexOf('dist') === -1;
  return vendor && templates;
});

gulp.task('default', [
    'jshint', 
    'emberhandlebars', 
    'minify-css'
], function(){
    return gulp.src(paths.concatDist)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('test', ['jshint', 'emberhandlebars'], function(){
    return gulp.src(paths.concatTest)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('js/dist/'))
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }));
});

gulp.task('emberhandlebars', function(){
    return gulp.src(paths.templates)
        .pipe(handlebars({outputType: 'browser'}))
        .pipe(concat('tmpl.min.js'))
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('jshint', function() {
    return gulp.src(paths.jshint)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lessify', function() {
    return gulp.src('css/app/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('css/app'));
});

gulp.task('minify-css', [
    'lessify'
], function() {
    return gulp.src(paths.concatCss)
    .pipe(minifyCss({ keepBreaks: true }))
    .pipe(concatCss('app.min.css'))
    .pipe(gulp.dest('css/dist/'));
});
