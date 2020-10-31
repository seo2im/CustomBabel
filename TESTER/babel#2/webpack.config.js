module.exports = {
	entry : './before.js',
	output : {
		path : __dirname,
		filename : 'after.js'
	},
	module : {
		rules: [{ test : /\.js$/, use : 'babel-loader'}]
	},
	// This option prevent compressing js file. 
	optimization : { minimizer: []}
}