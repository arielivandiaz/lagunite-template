var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const cleanCSS = require("gulp-clean-css");
var uglify = require('gulp-uglify');
var concatJS = require('gulp-concat');
var concatCss = require('gulp-concat-css');
const purgecss = require('gulp-purgecss');
var htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');

var fs = require('fs');
var file_path = 'version.json';



var pathsCSS = {
    source: './src/*.css',
    destination: './public/dist'
};

var pathsJS = {
    source: './src/*.js',
    destination: './public/dist'
};

var pathsHTML = {
    source: '*.html',
    destination: './public'
};

var pathsImgs = {
    source: './img/*',
    destination: './public/img'
};



let getVersion = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                obj = JSON.parse(data);
                obj.rev += 1;
                json = JSON.stringify(obj);
                fs.writeFile(file_path, json, 'utf8', () => {
                    console.log("Updated version: " + obj.version + "." + obj.rev);
                    resolve(obj.version + "." + obj.rev);
                });
            }
        });
    });
}

gulp.task('css', () => {
    return gulp.src(pathsCSS.source)
        .pipe(concatCss("bundle.css"))
        .pipe(purgecss({
            content: ['*.html']
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(minify())
        .pipe(gulp.dest(pathsCSS.destination));
});


gulp.task('js', () => {
    return gulp.src(pathsJS.source)
        .pipe(concatJS('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(pathsJS.destination));
});


gulp.task('html', async () => {
    getVersion().then((v) => {
        return gulp.src(pathsHTML.source)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: 'partials'
            }))
            .pipe(htmlreplace({
                'css': 'dist/bundle.css?v=' + v,
                'js': 'dist/scripts.js?v=' + v
            }))

            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(pathsHTML.destination));

    }).catch((reject) => {
        console.log("File Read Failed");
        console.log(reject);
    });
});


gulp.task('img', () => {
    return gulp.src(pathsImgs.source)
        .pipe(imagemin())
        .pipe(gulp.dest(pathsImgs.destination));
});
