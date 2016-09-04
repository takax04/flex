var gulp         = require( "gulp"         ); // gulp
var sass         = require( "gulp-sass"    ); // sass
var plumber      = require( "gulp-plumber" ); // エラー時にwatchが終了しないようにする
var postcss      = require( "gulp-postcss" ); // CSSの整形をまとめて行う
var mqpacker     = require( "css-mqpacker" ); // メディアクエリをまとめる
var autoprefixer = require( "autoprefixer" ); // Can I Use をもとに、prefix をつける
var cssnano      = require( "gulp-cssnano" ); // CSSを圧縮する
var rename       = require( "gulp-rename"  ); // サフィックスをつけてリネーム

gulp.task("sass", function() {
	var processors = [
		autoprefixer( { browsers: ['last 1 version'] } ),
		mqpacker
	];
	
	return gulp.src("scss/**/*scss")
	.pipe( plumber({
		errorHandler: function(err) {
			console.log(err.messageFormatted);
			this.emit('end');
		}
	}))
	.pipe( sass()                      )
	.pipe( postcss( processors )       )
	.pipe( gulp.dest( "./css" )        )
	.pipe( cssnano()                   )
	.pipe( rename( { suffix: ".min"} ) )
	.pipe( gulp.dest( "./min" )        );
});

gulp.task( "default", function(){
	gulp.watch( "scss/**/*.scss", ["sass"] );
});

