!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.Layer=t(require("react")):e.Layer=t(e.React)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="/build/",t(0)}([function(e,t,r){r(1),e.exports=r(2)},function(e,t){},function(e,t,r){try{(function(){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var f=r(3),a=n(f),p=function(e){function t(){return i(this,t),u(this,e.apply(this,arguments))}return c(t,e),t.prototype.render=function(){return a.default.createElement("div",{className:"c-layer"},"im layer")},t}(f.Component);p.propTypes={},p.defaultProps={},t.default=p,e.exports=t.default}).call(this)}finally{}},function(t,r){t.exports=e}])});