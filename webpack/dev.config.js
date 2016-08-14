/*eslint no-undef:0*/
const path         = require("path");
const webpack      = require("webpack");
const autoprefixer = require("autoprefixer");

const host       = "localhost";
const port       = 3000;
const customPath = path.join(__dirname, "./customPublicPath");
const hotScript  = "webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true";

const baseDevConfig = () => ({
	devtool      : "eval-cheap-module-source-map",
	entry        : {
		app       : [
			path.join(__dirname, "../app/scripts/polyfills.js"),
			path.join(__dirname, "../app/scripts/bootstrap.js"),
			customPath,
			hotScript,
			path.join(__dirname, "../chrome/extension/app")],
		background: [
			customPath,
			hotScript,
			path.join(__dirname, "../chrome/extension/background")
		]
	},
	devMiddleware: {
		publicPath: `http://${host}:${port}/js`,
		stats     : {
			colors: true
		},
		noInfo    : true
	},
	hotMiddleware: {
		path: "/js/__webpack_hmr"
	},
	output       : {
		path         : path.join(__dirname, "../dev/js"),
		filename     : "[name].bundle.js",
		chunkFilename: "[id].chunk.js"
	},
	plugins      : [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
		new webpack.DefinePlugin({
			__HOST__     : `"${host}"`,
			__PORT__     : port,
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		})
	],
	postcss() {
		return [autoprefixer({
			browsers: [
				"last 3 versions",
				"> 1%",
				"ie >= 10"
			],
			cascade : false
		})];
	},
	resolve      : {
		root    : [
			path.join(__dirname, "../app/scripts")
		],
		fallback: [
			path.join(__dirname, "/node_modules")
		],
		alias   : {
			styles    : path.join(__dirname, "../app/styles"),
			scripts   : path.join(__dirname, "../app/scripts"),
			components: path.join(__dirname, "../app/scripts/components"),
			images    : path.join(__dirname, "../app/images")
		}
	},
	// Only look in node_modules instead of starting from root
	resolveLoader: {
		root    : [
			path.join(__dirname, "/node_modules")
		],
		fallback: [
			path.join(__dirname, "/node_modules")
		]
	},
	module       : {
		loaders: [
			{
				test   : /\.js$/,
				include: [
					path.join(__dirname, "../app/scripts"),
					path.join(__dirname, "../chrome/extension")
				],
				loader : "babel",
				exclude: /node_modules/,
				query  : {
					presets       : ["react", "es2015", "stage-0"],
					plugins       : [
						// Instead of polyfilling everything use global functions, otherwise would have to inline helpers everytime they are used per module
						// For example, createClass
						"transform-runtime",
						"transform-decorators-legacy",
						["react-transform", {
							transforms: [{
								// Hot reloader
								transform: "react-transform-hmr",
								imports  : ["react"],
								locals   : ["module"]
							}, {
								// Wraps every render function in try/catch, then paints error info
								transform: "react-transform-catch-errors",
								imports  : ["react", "redbox-react"]
							}]
						}]
					],
					// Caches files between loader uses; when running the dev server, close, then run again, will reuse the files (babel loader repo docs)
					cacheDirectory: true
				}
			},
			{
				test  : /\.scss$/,
				loader: "style!css?modules&importLoaders=1!postcss!sass"
			},
			{
				test   : /\.css$/,
				loaders: [
					"style?sourceMap",
					"style!css!postcss"
				]
			},
			{
				test  : /\.(woff|woff2|ttf|eot|svg|png|gif|jpg)$/,
				loader: "url"
			}
		]
	}
});

const appConfig = baseDevConfig();

module.exports = [
	appConfig
];
