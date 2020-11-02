const babel = require('@babel/core');
const fs = require('fs');

const filename = "./before.js";
const before = fs.readFileSync(filename, 'utf8');

const presets = ['@babel/preset-react'];

const { ast } = babel.transformSync(before, {
	filename,
	ast : true, //this set make compling to ast code
	code : false, //this set block compling to code
	presets,
	configFile : false
})

const { code : after1 } = babel.transformFromAstSync(ast, before, {
	filename,
	plugins : ['@babel/plugin-transform-template-literals'],
	configFile : false
})

const { code : after2 } = babel.transformFromAstSync(ast, before, {
	filename,
	plugins : ['@babel/plugin-transform-arrow-functions'],
	configFile : false
})

fs.writeFileSync("./afterAst1.js", after1);
fs.writeFileSync("./afterAst2.js", after2);
