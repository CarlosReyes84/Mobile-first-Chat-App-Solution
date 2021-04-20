const {series, watch, src, dest} = require('gulp');
const sass = require('gulp-dart-sass'); //a partir de este todos son plugins de gulp
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const browser = require('browser-sync');

const paths= {
    css: 'src/scss/app.scss'
}

const css =() => {
    return src(paths.css)
    .pipe(sass())
    .pipe(dest('./build/css'))
    .pipe(browser.stream())
}
const deployment = () => {
    return src(paths.css)
    .pipe(sass())
    .pipe(postcss(cssnano()))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(dest('./build/css'))
}
const watchArchivos = () => {
    browser.init({
        server: {
            baseDir: './'
        }
    })
    watch('src/scss/**/*.scss', css);
    watch('./*.html').on('change', browser.reload);
}


exports.css = css;
exports.default = watchArchivos;
exports.deploy = deployment;
