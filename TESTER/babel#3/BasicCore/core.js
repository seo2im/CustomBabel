const babel = require('@babel/core');
const fs = require('fs');

const filename = "./before.js";
const before = fs.readFileSync(filename, 'utf8');

const plugins = [
	'@babel/plugin-transform-template-literals',
	'@babel/plugin-transform-arrow-functions'
];
const presets = ['@babel/preset-react'];

const { code : after } = babel.transformSync(before, {
	filename,
	presets,
	plugins,
	configFile : false
})

fs.writeFileSync("./after.js", after);
