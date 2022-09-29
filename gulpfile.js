const { series, parallel, dest, watch, src } = require("gulp"),
    concat = require("gulp-concat"),
    concatCss = require("gulp-concat-css"),
    autoprefixer = require("gulp-autoprefixer"),
    uglifyjs = require("uglify-js"),
    composer = require("gulp-uglify/composer"),
    uglify = composer(uglifyjs, console),
    scss = require("gulp-sass")(require("sass")),
    cleanCSS = require("gulp-clean-css"),
    gzip = require("gulp-gzip"),
    imagemin = require("gulp-imagemin"),
    del = require("del");

function baseLibCss() {
    return src("node_modules/normalize.css/normalize.css")
        .pipe(concatCss("lib.css"))
        .pipe(cleanCSS())
        .pipe(dest("build/base/css"))
        .pipe(gzip())
        .pipe(dest("build/base/css"));
}

function baseLibJs() {
    return src("node_modules/jquery/dist/jquery.min.js")
        .pipe(src("node_modules/handlebars/dist/handlebars.min.js"))
        .pipe(concat("lib.js"))
        .pipe(dest("build/base/js"))
        .pipe(gzip())
        .pipe(dest("build/base/js"));
}

function baseMainCss() {
    return src("assets/scss/basis/base-style.scss")
        .pipe(scss())
        .pipe(concat("main.css"))
		.pipe(autoprefixer({
			cascade: false
		}))
        .pipe(cleanCSS())
        .pipe(dest("build/base/css"))
        .pipe(gzip())
        .pipe(dest("build/base/css"));
}

/* function baseMainJs() {
    return src("assets/js/basis/notifications.js")
        .pipe(src("assets/js/drugstore.js"))
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest("build/base/js"))
        .pipe(gzip())
        .pipe(dest("build/base/js"));
} */

function homeMainCss() {
    return src("assets/scss/pages/home.scss")
        .pipe(scss())
        .pipe(concat("main.css"))
		.pipe(autoprefixer({
			cascade: false
		}))
        .pipe(cleanCSS())
        .pipe(dest("build/home/css"))
        .pipe(gzip())
        .pipe(dest("build/home/css"));
}

function homeMainJs() {
    return src("assets/js/main.js")
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest("build/home/js"))
        .pipe(gzip())
        .pipe(dest("build/home/js"));
}

function imgCompress() {
    return src("assets/img/**/*")
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(dest("build/img"));
}

function cleanBuildFolder() {
    return del("build");
}

function fonts() {
    return src("assets/fonts/**/*").pipe(dest("build/fonts"));
}

function watching() {
    watch(["assets/scss/**/*.scss"], exports.compilingCssFiles);
    watch(["assets/js/**/*.js"], exports.compilingJsFiles);
    watch(["node_modules/**/*"], exports.compilingLibFiles);
}

exports.compilingLibFiles = parallel(baseLibCss);

exports.compilingJsFiles = parallel(homeMainJs);
exports.compilingCssFiles = parallel(baseMainCss, homeMainCss);


exports.compilingFiles = parallel(
    exports.compilingCssFiles,
    exports.compilingJsFiles,
    exports.compilingLibFiles
);

exports.cleanBuildFolder = cleanBuildFolder;
exports.watching = watching;

exports.default = series(
    cleanBuildFolder,
    fonts,
    imgCompress,
    exports.compilingFiles
);
