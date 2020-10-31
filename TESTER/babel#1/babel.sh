# set plugins & preset
npx babel before.js \
	--plugins=@babel/plugin-transform-arrow-functions,@babel/plugin-transform-template-literals \
	--presets=@babel/preset-react \
	--out-file after.js 

:<< "END"
if config file in directory only like below

	npx babel before.js --out-file after.js
END