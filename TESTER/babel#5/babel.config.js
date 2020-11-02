const presets = [
	[
		'@babel/preset-env',
		{
			targets : {
				chrome : '40' // This is browser version, get polyfills refering this version
			},
			useBuiltIns : 'usage', //This only get polyfills for browser, if you use 'usage', get polyfills only using in code
			corejs : {
				version : 3, 
				proposal : true 
			}
		}
	]
];

module.exports = { presets };