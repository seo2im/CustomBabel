const preset = ['@babel/preset-react'];
const plugins = [
	[
		'@babel/plugins-transform-template-literals',
		{
			"loose" : true
		}
	]
];

module.export = { preset, plugins };