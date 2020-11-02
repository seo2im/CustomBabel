# Babel Custom Package

> OBJECT

1. Knownledge what is **babel**
2. Knownledge what is **babel plugin**
3. Knownledge what is **babel preset**
</br></br>

## What is Babel
**Babel is code compiler with js.** Initial babel made ES6 to ES5. This time, can make JSX, ts, code compress ... to ES5.
</br></br>

## How to exec babel
1. @babel/cli
	- use babel in command line 
2. Webpack
	- babel-loader module used when build in webpack
3. @babel/core
	- use core file in js code
4. @babel/register
	- dynamically exec when `require()` in **Node.js**
</br></br>

## Use in command line : ([babel#1](https://github.com/seo2im/CustomBabel/tree/master/TESTER/babel%231))
```shell
npm install @babel/core @babel/cli
```

`@babel/core` must be intalled for using babel. `@babel/cli` is command line tool. work like below.

```shell
npx babel someJsFile.js
```

Anything changed not yet. babel only **parsing** & **printing**. **Transform** worked in **Plugin**. install and command like below.

```shell
npm install @babel/plugin-transform-arrow-functions @babel/plugin-transform-template-literals

npx babel someJsFile.js --plugins=@babel/plugin-transform-arrow-functions,@babel/plugin-transform-template-literals
```

Each plugins convert arrow functions & template-literals(ES6) to ES5 js code.

Plugins are too many, too complicated. So, we can use **preset**. Preset is set of plugins in one objective. use like below.

```shell
# preset-react for react babel plugins set
npm install @babel/preset-react

npx babel someJsFile.js --presets=@babel/preset-react
```

This settings are commented in config file. Use `.babelrc`(under 7) or `babel.config.js`(since 7)

Example of babel.config.js
```javascript
const plugins = [
	'@babel/plugin-transform-arrow-functions',
	'@babel/plugin-transform-template-literals'
];
const presets = ['@babel/preset-react'];

module.exports = { plugins, presets };

/*
command line only use like below
 	npx babel someJsFile.js
*/
```
</br></br>

## Use in Webpack : ([babel#2](https://github.com/seo2im/CustomBabel/tree/master/TESTER/babel%232))
**Webpack** is bundling architecture, build tool. If you learn about webpack, [this]().

Webpack uses loaders when building output. `babel-loader` compiles **not ES5 code** to **ES5 code** when webpack running. install below

```shell
# webpack-cli is command line tool
npm install webpack webpack-cli babel-loader
```

webpack bundling with config file `webpack.config.js`. write like below. If you want to get more explanation, [this]()

```javascript
const path = require('path');

module.exports = {
	entry : './before.js',
	output : {
		path : path.resolve(__dirname, 'dist'),
		filename : 'after.js'
	},
	module : {
		rules: [{ test : /\.js$/, use : 'babel-loader'}]
	},
	// This option prevent compressing js file. 
	optimazation : { minimizer: [] }
}
```

And copy `babel.config.js` at working directoy. `babel-loader` refer to babel configuration file. exec like below.

```shell
npx webpack
```
</br></br>

## Use babel/core ([babel#3](https://github.com/seo2im/CustomBabel/tree/master/TESTER/babel%233))

`@babel/core` is core module for using babel. Import module in js, convert file directly. ref [here]()</br></br>Use core directly, better degrees of freedom. Assume that different two setting in same code like below.

```javascript
// Set 1
const presets = ['@babel/preset-react'];
const plugins = ['@babel/plugin-transform-template-literals'];

// Set 2
const presets = ['@babel/preset-react'];
const plugins = ['@babel/plugin-transform-arrow-functions'];
```

If you use `loader` or `cli`, build it twice. But use `core`, effiienctly work possible.</br></br>babel compile **AST** code through 'parse-transform-generate'. In js code, AST code can be re-useable. ref [here]()</br></br>If you want know AST code, ref [here](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
</br></br>

## Babel Attributes ([babel#4](https://github.com/seo2im/CustomBabel/tree/master/TESTER/babel%234))

There are many attributes in babel config, let's show `extended`, `env`, `overrides`.

### .babelrc vs babel.config.js

These two files configuration file for babel. But `babel.config.js` is global setting, `.babelrc` is local setting.

```javascript
//babel.config.js -> root directory
const plugins = ['@babel/plugin-transform-arrow-functions']

//.babelrc -> src directory
const plugins = ['@babel/plugin-transform-template-literals'];
```

Assume that code1.js and `babel.config.js` are at root, code2.js and `.babelrc` are in root/src directory. compiling them with babel, code1 affected only 'arrow plugin' and code2 affeted both.

### extended
`exteneded` is **import** other config setting. It overwrite same setting. Look below.

```javascript
//.babelrc -> root
{
	"presets" : ['@babel/preset-react'],
	"plugins" : [
		[
			"@babel/plugin-transform-template-literals",
			{
				"loose" : true //This is template plugins option, make literal with '+', not concat
			}
		]
	]
}
//.babelrc -> root/src
{
	"extends" : "../.babelrc",
	"plugins" : [		
		"@babel/plugin-transform-template-literals",
		"@babel/plugin-transform-arrow-functions"
	]
}
```

`code.js` is in src directory, compiling with babel, `code.js` affected with 'react preset' and two plugins. Template plugin's 'loose option' not work because of overwritting.

### env

Environment in babel refer to `process.env.BABEL_ENV || process.env.NODE_ENV || "development"`</br></br>We set 'env' option in config file, apply plugins & presets differently.

```javascript
//.babelrc
{
	"presets" : ["@babel/preset-react"],
	"env" : {
		"production" : {
			"presets" : ["minify"] //minify compress code.
		}
	}
}
```
`minify` affect compiling only `process.NODE_ENV == "production"`

### overrides

`overrides` concludes **include path** and **exclude path**. Include path is affected by overriding plugin, exclude is not.

```javascript
{
	"preset" : ["@babel/preset-react"],
	"plugins" : [		
		"@babel/plugin-transform-template-literals"
	],
	"overrides" : [
		{
			"include" : "./src",
			"exclude" : "./src/code2.js",
			"plugins" : ["@babel/plugin-transform-arrow-functions"] 
		}
	]
}
```

Above, src directory's files ars affected by arrow plugin without `code2.js`.
</br></br>

## Babel polyfill ([babel#5](https://github.com/seo2im/CustomBabel/tree/master/TESTER/babel%235))

**Poliyfill** add funcs in runtime if they are not existed. For example, `Object.values` is not work in normal, but use polyfill, work it possible.</br></br>Before, babel-polyfill module standard way to apply polyfill, but now, it depeciated because of crashing & sizing. This time, use `core-js` module for polyfill.

```javascript
//in js file
imoirt 'core-js'
const coreTest = Object.values({a : 1});

//in webpack
module.exports = {
	entry : ['core-js', './index.js']
}
```

`core-js` also have problem for sizing(bundle is bigger). But import polyfill only need possible.

```javascript
import 'code-js/feature/object/values';
```

In babel, using it with `preset-env`. `preset-env` work automatically with information about environment. look below.

```javascript
const presets = [
	[
		'@babel/preset-env',
		{
			target : {
				chrome : '40' // This is browser version, get polyfills refering this version
			},
			useBuiltIns : 'entry', //This only get polyfills for browser, if you use 'usage', get polyfills only using in code
			corejs : {
				version : 3, 
				proposal : ture 
			}
		}
	]
];

module.exports = { presets };
```
