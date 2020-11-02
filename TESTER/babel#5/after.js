"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.values");

require("core-js/modules/es.string.includes");

var arr = Object.values({
  a: 1
});
var exist = arr.includes(1);

