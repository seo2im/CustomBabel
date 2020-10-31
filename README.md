# Babel Custom Package

> OBJECT

1. Knownledge what is **babel**
2. Knownledge what is **babel plugin**
3. Knownledge what is **babel preset**


## What is Babel
**Babel is code compiler with js.** Initial babel made ES6 to ES5. This time, can make JSX, ts, code compress ... to ES5.

## How to exec babel
1. @babel/cli
	- use babel in command line 
2. Webpack
	- babel-loader module used when build in webpack
3. @babel/core
	- use core file in js code
4. @babel/register
	- dynamically exec when `require()` in **Node.js**

## Use in command line [babel#1]()
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

## Use in Webpack [babel#2]()
**Webpack** is bundling architecture, build tool. If you learn about webpack, [this]().



