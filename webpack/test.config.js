/*eslint no-undef:0*/
const config = require("./prod.config");
const path   = require("path");

module.exports = {
	output : {
		libraryTarget: "commonjs2"
	},
	resolve: {
		root    : [
			path.join(__dirname, "../app/scripts")
		],
		fallback: [
			path.join(__dirname, "/node_modules")
		],
		alias   : {
			styles    : path.join(__dirname, "../app/styles"),
			images    : path.join(__dirname, "../app/images"),
			actions   : path.join(__dirname, "../app/scripts/actions"),
			components: path.join(__dirname, "../app/scripts/components"),
			containers: path.join(__dirname, "../app/scripts/containers"),
			model     : path.join(__dirname, "../app/scripts/model"),
			records   : path.join(__dirname, "../app/scripts/records"),
			reducers  : path.join(__dirname, "../app/scripts/reducers"),
			scripts   : path.join(__dirname, "../app/scripts"),
			utils     : path.join(__dirname, "../app/scripts/utils")
		}
	},
	module : {
		loaders: config.module.loaders.slice(1)  // remove babel-loader
	}
};
