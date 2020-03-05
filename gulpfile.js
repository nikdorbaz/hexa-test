'use strict';
const gulp            = require('gulp');
const sass            = require('gulp-sass');
const autoprefixer    = require('gulp-autoprefixer');
const cssmin          = require('gulp-cssmin');
const livereload      = require('gulp-livereload');
const plumber         = require('gulp-plumber');
const concat          = require('gulp-concat');
const uglify          = require('gulp-uglify');
const rename          = require("gulp-rename");

// =============================================================================
// Settings variables
// =============================================================================
const src = {
    sassWatch: './src/sass/**/*.scss',
    sass: './src/sass/*.scss',
    jsMain: './src/js/modules/**/*.js'
};

const dest = {
    sass: './public/css',
    js: './public/js'
};


// =============================================================================
// Task: sass-nested (compile Sass to css)
// =============================================================================
gulp.task( 'sass:nested', function(cb) {
    try {
        return gulp.src( src.sass)
            .pipe(sass({
                style: 'compressed',
                errLogToConsole: true
            }).on('error',sass.logError))
            .pipe( autoprefixer( {
                browsers: [ 'last 15 versions' ],
                cascade: false
            } ) )
            .pipe(cssmin())
            .pipe( gulp.dest( dest.sass ) )
            .pipe(livereload());
    } catch(err){
        console.log('error ',err);
        if (cb) cb();
    }

} );
// =============================================================================
// Task: js-libs (compile all js libs to 1 minify file)
// =============================================================================
gulp.task( 'js:libs', function() {
    return gulp.src(src.jsLibs)
        .pipe( plumber() )
        .pipe( concat( 'libs.js' ) )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min', extname: '.js' } ) )
        .pipe( gulp.dest( dest.js ) );
});
gulp.task( 'js:main', function() {
    return gulp.src(src.jsMain)
        .pipe( plumber() )
        .pipe( concat( 'main.js' ) )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min', extname: '.js' } ) )
        .pipe( gulp.dest( dest.js ) );
});
// =============================================================================
// Task: watch (changes scanner)
// =============================================================================
gulp.task( 'watch', function() {
    livereload.listen();
    gulp.watch( src.sassWatch, gulp.series('sass:nested', function() { 
        // default task code here
    }));
    gulp.watch( src.jsMain, gulp.series('js:main', function() { 
        // default task code here
    }));
});

// =============================================================================
// Task: build (build all files)
// =============================================================================
gulp.task( 'build', ('sass:nested','js:main', () => {
    // Build task code here
}));

// =============================================================================
// Task: default
// =============================================================================

gulp.task( 'default', gulp.series('watch', function() { 
    // default task code here
}));