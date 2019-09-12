const gulp = require(`gulp`);


module.exports = {
    default: gulp.parallel(minifyJs, minifyCss, copyHtml)
};


const minify = require(`gulp-minify`);
const csso = require(`gulp-csso`);

const src = `./`;
const dest = `./docs/`;


function minifyJs() {
    return gulp.src(`${src}app.js`)
        .pipe(minify({
            ext: { min: `.js` },
            noSource: true,
        }))
        .pipe(gulp.dest(dest));
}

function minifyCss() {
    return gulp.src(`${src}styles.css`)
        .pipe(csso())
        .pipe(gulp.dest(dest));
}

function copyHtml() {
    return gulp.src(`${src}index.html`)
        .pipe(gulp.dest(dest));
}
