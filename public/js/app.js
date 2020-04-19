/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("VueLoading",[],e):"object"==typeof exports?exports.VueLoading=e():t.VueLoading=e()}("undefined"!=typeof self?self:this,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){},function(t,e,i){"use strict";i.r(e);var n="undefined"!=typeof window?window.HTMLElement:Object,r={mounted:function(){document.addEventListener("focusin",this.focusIn)},methods:{focusIn:function(t){if(this.isActive&&t.target!==this.$el&&!this.$el.contains(t.target)){var e=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||e&&e.contains(t.target))&&(t.preventDefault(),this.$el.focus())}}},beforeDestroy:function(){document.removeEventListener("focusin",this.focusIn)}};function a(t,e,i,n,r,a,o,s){var u,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=i,l._compiled=!0),n&&(l.functional=!0),a&&(l._scopeId="data-v-"+a),o?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=u):r&&(u=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),u)if(l.functional){l._injectStyles=u;var c=l.render;l.render=function(t,e){return u.call(e),c(t,e)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,u):[u]}return{exports:t,options:l}}var o=a({name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}},function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:this.width,height:this.height,stroke:this.color}},[e("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{transform:"translate(1 1)","stroke-width":"2"}},[e("circle",{attrs:{"stroke-opacity":".25",cx:"18",cy:"18",r:"18"}}),e("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18"}},[e("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.8s",repeatCount:"indefinite"}})],1)])])])},[],!1,null,null,null).exports,s=a({name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}},function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:this.color,width:this.width,height:this.height}},[e("circle",{attrs:{cx:"15",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"60",cy:"15",r:"9","fill-opacity":"0.3"}},[e("animate",{attrs:{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"105",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})])])},[],!1,null,null,null).exports,u=a({name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}},function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:this.height,width:this.width,fill:this.color}},[e("rect",{attrs:{x:"0",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"10",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"20",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}})])])},[],!1,null,null,null).exports,l=a({name:"vue-loading",mixins:[r],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,n],isFullPage:{type:Boolean,default:!0},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:function(){}},color:String,backgroundColor:String,opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},data:function(){return{isActive:this.active}},components:{Spinner:o,Dots:s,Bars:u},beforeMount:function(){this.programmatic&&(this.container?(this.isFullPage=!1,this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted:function(){this.programmatic&&(this.isActive=!0),document.addEventListener("keyup",this.keyPress)},methods:{cancel:function(){this.canCancel&&this.isActive&&(this.hide(),this.onCancel.apply(null,arguments))},hide:function(){var t=this;this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(function(){var e;t.$destroy(),void 0!==(e=t.$el).remove?e.remove():e.parentNode.removeChild(e)},150))},keyPress:function(t){27===t.keyCode&&this.cancel()}},watch:{active:function(t){this.isActive=t}},beforeDestroy:function(){document.removeEventListener("keyup",this.keyPress)}},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:t.transition}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"vld-overlay is-active",class:{"is-full-page":t.isFullPage},style:{zIndex:this.zIndex},attrs:{tabindex:"0","aria-busy":t.isActive,"aria-label":"Loading"}},[i("div",{staticClass:"vld-background",style:{background:this.backgroundColor,opacity:this.opacity},on:{click:function(e){return e.preventDefault(),t.cancel(e)}}}),i("div",{staticClass:"vld-icon"},[t._t("before"),t._t("default",[i(t.loader,{tag:"component",attrs:{color:t.color,width:t.width,height:t.height}})]),t._t("after")],2)])])},[],!1,null,null,null).exports,c=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{show:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i,a=Object.assign({},e,n,{programmatic:!0}),o=new(t.extend(l))({el:document.createElement("div"),propsData:a}),s=Object.assign({},i,r);return Object.keys(s).map(function(t){o.$slots[t]=s[t]}),o}}};i(0);l.install=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=c(t,e,i);t.$loading=n,t.prototype.$loading=n};e.default=l}]).default});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(46)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./vue-loading.css", function() {
			var newContent = require("!!../../css-loader/index.js!./vue-loading.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(43)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(8);
var isBuffer = __webpack_require__(19);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(6);
var normalizeHeaderName = __webpack_require__(21);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(10);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(10);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var settle = __webpack_require__(22);
var buildURL = __webpack_require__(24);
var parseHeaders = __webpack_require__(25);
var isURLSameOrigin = __webpack_require__(26);
var createError = __webpack_require__(11);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(27);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(28);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(23);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_administrador_PersonaComponent_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_administrador_PersonaComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_administrador_PersonaComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_administrador_UsuarioComponent_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_administrador_UsuarioComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_administrador_UsuarioComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_administrador_AuditoriaComponent_vue__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_administrador_AuditoriaComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_administrador_AuditoriaComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_administrador_EstudianteComponent_vue__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_administrador_EstudianteComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_administrador_EstudianteComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_administrador_PromocionComponent_vue__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_administrador_PromocionComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_administrador_PromocionComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_administrador_CicloAcademicoComponent_vue__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_administrador_CicloAcademicoComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_administrador_CicloAcademicoComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_administrador_DocenteComponent_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_administrador_DocenteComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_administrador_DocenteComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_administrador_MatriculaComponent_vue__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_administrador_MatriculaComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_administrador_MatriculaComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_administrador_AsignarCursoComponent_vue__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_administrador_AsignarCursoComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_administrador_AsignarCursoComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_administrador_EvaluarEstudianteComponent_vue__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_administrador_EvaluarEstudianteComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_administrador_EvaluarEstudianteComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_JefeDepartamento_AsignarDocenteComponent_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_JefeDepartamento_AsignarDocenteComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_JefeDepartamento_AsignarDocenteComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_Docente_AsignaturasComponent_vue__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_Docente_AsignaturasComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_Docente_AsignaturasComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_Docente_ContenidosComponent_vue__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_Docente_ContenidosComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__components_Docente_ContenidosComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_Docente_MatriculadosDocenteComponent_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_Docente_MatriculadosDocenteComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__components_Docente_MatriculadosDocenteComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_JefeDepartamento_MallaCurricularComponent_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_JefeDepartamento_MallaCurricularComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__components_JefeDepartamento_MallaCurricularComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_JefeDepartamento_ModuloComponent_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_JefeDepartamento_ModuloComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__components_JefeDepartamento_ModuloComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_administrador_CursosCursandoComponent_vue__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_administrador_CursosCursandoComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__components_administrador_CursosCursandoComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_JefeDepartamento_AreaConocimientoComponent_vue__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_JefeDepartamento_AreaConocimientoComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__components_JefeDepartamento_AreaConocimientoComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_JefeDepartamento_ContenidoComponent_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_JefeDepartamento_ContenidoComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__components_JefeDepartamento_ContenidoComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_JefeDepartamento_ModuloMatriculaComponent_vue__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_JefeDepartamento_ModuloMatriculaComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__components_JefeDepartamento_ModuloMatriculaComponent_vue__);
__webpack_require__(16);




//academia












//JEFE DEPARTAMENTO INICIO


//JEFE DEPARTAMENTO FIN

//DOCENTE INICIO




//DOCENTE FIN


//MALLA CURRICULAR







__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [
  //Docente
  { name: 'asiganturascargo', path: '/asiganturascargo', component: __WEBPACK_IMPORTED_MODULE_13__components_Docente_AsignaturasComponent_vue___default.a }, { name: 'contenidosasignatura/:idarea/:iddocentearea', path: '/contenidosasignatura/:idarea/:iddocentearea', component: __WEBPACK_IMPORTED_MODULE_14__components_Docente_ContenidosComponent_vue___default.a, props: true }, { name: 'especialistasmatriculados/:idarea/:iddocentearea', path: '/especialistasmatriculados/:idarea/:iddocentearea', component: __WEBPACK_IMPORTED_MODULE_15__components_Docente_MatriculadosDocenteComponent_vue___default.a, props: true },
  //MALLA CURRICULAR
  { name: 'mallacurricular', path: '/mallacurricular', component: __WEBPACK_IMPORTED_MODULE_16__components_JefeDepartamento_MallaCurricularComponent_vue___default.a }, { name: 'matricular/:idciclo', path: '/matricular/:idciclo', component: __WEBPACK_IMPORTED_MODULE_9__components_administrador_MatriculaComponent_vue___default.a, props: true }, { name: 'modulos', path: '/modulos', component: __WEBPACK_IMPORTED_MODULE_17__components_JefeDepartamento_ModuloComponent_vue___default.a }, { name: 'asignaturas/:idciclo/:idmatricula/:idmodulo', path: '/asignaturas/:idciclo/:idmatricula/:idmodulo', component: __WEBPACK_IMPORTED_MODULE_18__components_administrador_CursosCursandoComponent_vue___default.a, props: true }, { name: 'areaconocimiento/:idmodulo', path: '/areaconocimiento/:idmodulo', component: __WEBPACK_IMPORTED_MODULE_19__components_JefeDepartamento_AreaConocimientoComponent_vue___default.a, props: true }, { name: 'contenidos/:idmodulo/:idarea', path: '/contenidos/:idmodulo/:idarea', component: __WEBPACK_IMPORTED_MODULE_20__components_JefeDepartamento_ContenidoComponent_vue___default.a, props: true }, { name: 'modulomatricula/:idciclo/:idmatricula', path: '/modulomatricula/:idciclo/:idmatricula', component: __WEBPACK_IMPORTED_MODULE_21__components_JefeDepartamento_ModuloMatriculaComponent_vue___default.a, props: true },

  //ACADEMIA

  { name: 'persona', path: '/persona', component: __WEBPACK_IMPORTED_MODULE_2__components_administrador_PersonaComponent_vue___default.a }, { name: 'usuarios', path: '/usuarios', component: __WEBPACK_IMPORTED_MODULE_3__components_administrador_UsuarioComponent_vue___default.a }, { name: 'auditoria', path: '/auditoria', component: __WEBPACK_IMPORTED_MODULE_4__components_administrador_AuditoriaComponent_vue___default.a }, { name: 'docentes', path: '/docentes', component: __WEBPACK_IMPORTED_MODULE_8__components_administrador_DocenteComponent_vue___default.a }, { name: 'estudiantes', path: '/estudiantes', component: __WEBPACK_IMPORTED_MODULE_5__components_administrador_EstudianteComponent_vue___default.a }, { name: 'promociones', path: '/promociones', component: __WEBPACK_IMPORTED_MODULE_6__components_administrador_PromocionComponent_vue___default.a }, { name: 'cicloacademico/:idpromocion', path: '/cicloacademico/:idpromocion', component: __WEBPACK_IMPORTED_MODULE_7__components_administrador_CicloAcademicoComponent_vue___default.a, props: true }, { name: 'asignarcurso/:idpromocion/:idciclo', path: '/asignarcurso/:idpromocion/:idciclo', component: __WEBPACK_IMPORTED_MODULE_10__components_administrador_AsignarCursoComponent_vue___default.a, props: true }, { name: 'evaluacion/:idpromocion/:idciclo/:idmatricula/:idasignatura', path: '/evaluacion/:idpromocion/:idciclo/:idmatricula/:idasignatura', component: __WEBPACK_IMPORTED_MODULE_11__components_administrador_EvaluarEstudianteComponent_vue___default.a, props: true },

  //JEFE DEPARTAMENTO
  { name: 'asignardocente/:idpromocion', path: '/asignardocente/:idpromocion', component: __WEBPACK_IMPORTED_MODULE_12__components_JefeDepartamento_AsignarDocenteComponent_vue___default.a, props: true }],
  mode: 'history'
});

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  el: '#app',
  router: router,
  methods: {
    logout: function logout() {
      document.getElementById('logout-form').submit();
    }
  }
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

window.axios = __webpack_require__(17);

//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


//cdcdwindow.axios.defaults.baseURL = 'http://localhost:8000/sistemaalmacencite/public/';


//window.axios.defaults.baseURL = 'http://www.leondeorohospedaje.com/';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

//let token = document.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var bind = __webpack_require__(8);
var Axios = __webpack_require__(20);
var defaults = __webpack_require__(7);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(13);
axios.CancelToken = __webpack_require__(34);
axios.isCancel = __webpack_require__(12);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(35);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(7);
var utils = __webpack_require__(6);
var InterceptorManager = __webpack_require__(29);
var dispatchRequest = __webpack_require__(30);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(11);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var transformData = __webpack_require__(31);
var isCancel = __webpack_require__(12);
var defaults = __webpack_require__(7);
var isAbsoluteURL = __webpack_require__(32);
var combineURLs = __webpack_require__(33);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(13);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.17
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (true) {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.17';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (true) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        "development" !== 'production' &&
        "development" !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ("development" !== 'production' &&
      "development" !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (true) {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(37).setImmediate))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(38);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(9)))

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (true) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(44)
/* template */
var __vue_template__ = __webpack_require__(48)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/PersonaComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52c9823a", Component.options)
  } else {
    hotAPI.reload("data-v-52c9823a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("c153bfa8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52c9823a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PersonaComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52c9823a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PersonaComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.pagination li.active {\n    background-color: rgb(0,128,128);\n}\n.breadcrumb:before {\n    color: #999999;\n}\n.breadcrumb {\n \n  font-size: 13px;\n \n  color: #999999;\n}\n.breadcrumb:before {\n \n    color: #999999;\n}\n.breadcrumb:last-child {\n \n  color: #999999 ;\n}\n.divsearch{\n    text-align: center;\n    padding-bottom: 3px;\n    padding-left: 65px;\n}\n.divsearch>input{\n    size: 150px;\n}\n.divoptions{\n    text-align: right;\n}\n.content{\n    margin:15px;\n    margin-bottom: 25px;\n    max-height: calc(65vh);\n        overflow-y: scroll;\n        font-size: 12px;\n}\n#tablecontent{\n    font-size: 11px;\n}\n\n", ""]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      usuario: global.user,

      fillpersona: { 'cedula': '', 'nombres': '', 'appaterno': '', 'apmaterno': '', 'celular': '', 'correo': '', 'direccion': '', 'estado': '', 'fecha_nacimiento': '', 'estado_civil': '', 'genero': '', 'tipo': '', 'titulo': false, 'nombretitulo': '' },
      btnregistrar: true,

      viewpersona: { 'cedula': '', 'nombres': '', 'appaterno': '', 'apmaterno': '', 'celular': '', 'correo': '', 'direccion': '', 'estado': '', 'fecha_nacimiento': '', 'estado_civil': '', 'genero': '', 'tipo': true },
      personas: [],

      fillcliente: { 'id': '', 'numero_documento': '', 'nombre': '', 'apellido': '', 'telefono': '', 'correo': '', 'direccion': '', 'idusuario': '' },
      viewcliente: { 'id': '', 'numero_documento': '', 'nombre': '', 'apellido': '', 'telefono': '', 'correo': '', 'direccion': '' },
      clientes: [],
      observacion: '',
      fullPage: true,
      isLoading: false,

      pagination: { 'total': 0, 'current_page': 0, 'per_page': 0, 'last_page': 0, 'from': 0, 'to': 0 },
      offset: 3,
      page: 1
    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  computed: {
    isActived: function isActived() {
      return this.pagination.current_page;
    },
    pagesNumber: function pagesNumber() {
      if (!this.pagination.to) {
        return [];
      }

      var from = this.pagination.current_page - this.offset; //pendiente offset

      if (from < 1) from = 1;

      var to = from + this.offset * 2; //pendiente offset

      if (to >= this.pagination.last_page) to = this.pagination.last_page;

      var pagesArray = [];

      while (from <= to) {
        pagesArray.push(from);
        from++;
      }

      return pagesArray;
    }

  },
  methods: {
    changePage: function changePage(page) {
      this.pagination.current_page = page;
      this.Obtener(page);
    },
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    ViewNovedad: function ViewNovedad() {},
    DesactivarAll: function DesactivarAll(idperson) {
      var _this = this;

      var url = '/desactivarallpersona';
      axios.post(url, {
        'idpersona': idperson
      }).then(function (response) {
        M.toast({ html: 'Persona Desactivado!', 'classes': 'teal lighten-1' });
        _this.Obtener(_this.page);
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error!', 'classes': 'danger' });
      });
    },
    ActivarAll: function ActivarAll(idperson) {
      var _this2 = this;

      var url = '/activarallpersona';
      axios.post(url, {
        'idpersona': idperson
      }).then(function (response) {
        M.toast({ html: 'Persona Activado!', 'classes': 'teal lighten-1' });
        _this2.Obtener(_this2.page);
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error!', 'classes': 'danger' });
      });
    },
    VerPersona: function VerPersona(p) {
      this.viewpersona = p;
    },
    ConsultarPersona: function ConsultarPersona() {
      var _this3 = this;

      var url = '/consultarpersona';
      axios.post(url, {
        'cedula': this.fillpersona.cedula
      }).then(function (response) {
        if (response.data.length > 0) {
          var person = response.data[0];

          M.toast({ html: 'Persona Existe', 'classes': 'teal lighten-1' });
          _this3.fillpersona.nombres = person.nombres;
          _this3.fillpersona.appaterno = person.appaterno;
          _this3.fillpersona.apmaterno = person.apmaterno;
          _this3.fillpersona.celular = person.celular;
          _this3.fillpersona.correo = person.correo;
          _this3.fillpersona.direccion = person.direccion;
          _this3.fillpersona.fecha_nacimiento = person.fecha_nacimiento;
          _this3.fillpersona.estado_civil = person.estado_civil;
          _this3.fillpersona.genero = person.genero;
          _this3.fillpersona.tipo = person.tipo;
          _this3.fillpersona.nombretitulo = person.nombretitulo;

          document.querySelector("label[for='nombre']").classList.add('active');
          document.querySelector("label[for='apellido1']").classList.add('active');
          document.querySelector("label[for='apellido2']").classList.add('active');
          document.querySelector("label[for='celular']").classList.add('active');
          document.querySelector("label[for='correo']").classList.add('active');
          document.querySelector("label[for='direccion']").classList.add('active');
          document.querySelector("label[for='fnacimiento']").classList.add('active');
          document.querySelector("label[for='estadocivil']").classList.add('active');
          document.querySelector("label[for='genero']").classList.add('active');

          _this3.btnregistrar = false;
        } else {
          M.toast({ html: 'Persona No Existe', 'classes': 'teal lighten-1' });
          _this3.btnregistrar = true;
        }
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error!', 'classes': 'danger' });
      });
    },
    NuevoPersona: function NuevoPersona() {
      var _this4 = this;

      this.fillpersona.idusuario = this.usuario.id;

      var url = '/nuevopersona';
      axios.post(url, this.fillpersona).then(function (response) {

        if (response.data == 'denegado') {
          M.toast({ html: 'Ya Existe', 'classes': 'orange' });
          _this4.fillpersona.cedula = '';
        } else {

          _this4.fillpersona.cedula = '';
          _this4.fillpersona.nombres = '';
          _this4.fillpersona.appaterno = '';
          _this4.fillpersona.apmaterno = '';
          _this4.fillpersona.celular = '';
          _this4.fillpersona.correo = '';
          _this4.fillpersona.direccion = '';
          _this4.fillpersona.estado = '';
          _this4.fillpersona.fecha_nacimiento = '';
          _this4.fillpersona.estado_civil = '';
          _this4.fillpersona.genero = '';
          _this4.fillpersona.tipo = '';
          _this4.fillpersona.titulo = false;
          _this4.fillpersona.nombretitulo = '';

          M.toast({ html: 'Registrado', 'classes': 'green' });
        }

        _this4.Obtener(_this4.page);
      }).catch(function (error) {
        console.log(error.response);
        M.toast({ html: 'Ocurrio un Error!', 'classes': 'danger' });
      });
    },
    VistaModificarcliente: function VistaModificarcliente(p) {
      this.viewpersona = p;
      document.querySelector("label[for='MODgenero']").classList.add('active');
      document.querySelector("label[for='MODnombre']").classList.add('active');
      document.querySelector("label[for='MODdireccion']").classList.add('active');
      document.querySelector("label[for='MODdireccion']").classList.add('active');
      document.querySelector("label[for='MODcorreo']").classList.add('active');
      document.querySelector("label[for='MODestadocivil']").classList.add('active');
      document.querySelector("label[for='MODcelular']").classList.add('active');
      document.querySelector("label[for='MODapellido1']").classList.add('active');
      document.querySelector("label[for='MODapellido2']").classList.add('active');
    },
    Modificar: function Modificar() {
      var _this5 = this;

      var url = '/modificarpersona';
      axios.post(url, this.viewpersona).then(function (response) {
        _this5.Obtener(_this5.page);
        M.toast({ html: 'Persona Modificado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error!', 'classes': 'danger' });
      });
    },
    ViewDesactivar: function ViewDesactivar(c) {
      $("label[for='observacion']").addClass('active');
      this.observacion = '';
      this.viewcliente = c;
    },
    Obtener: function Obtener(page) {
      var _this6 = this;

      var url = '/obtenerpersona?page=' + page;
      axios.get(url, {}, {
        onUploadProgress: function onUploadProgress(progressEvent) {
          return _this6.isLoading = true;
        }
      }).then(function (response) {
        _this6.isLoading = false;
        _this6.personas = response.data.persons.data;
        _this6.pagination = response.data.pagination;
        M.toast({ html: 'Persona Obtenido', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error!', 'classes': 'danger' });
      });
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.querySelector("label[for='estadocivil']").classList.add('active');
    document.querySelector("label[for='genero']").classList.add('active');
    this.Obtener(this.page);

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".vld-overlay {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  align-items: center;\n  display: none;\n  justify-content: center;\n  overflow: hidden;\n  z-index: 1\n}\n\n.vld-overlay.is-active {\n  display: flex\n}\n\n.vld-overlay.is-full-page {\n  z-index: 999;\n  position: fixed\n}\n\n.vld-overlay .vld-background {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  background: #fff;\n  opacity: 0.5\n}\n\n.vld-overlay .vld-icon, .vld-parent {\n  position: relative\n}\n\n", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(47);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l6 m6" }, [
        _c("br"),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "btn modal-trigger waves-effect teal lighten-1 ",
            attrs: { "data-target": "mdlnuevopersona" }
          },
          [_vm._v("Nuevo\n        ")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn blue-grey lighten-1",
            on: {
              click: function($event) {
                _vm.Obtener(_vm.page)
              }
            }
          },
          [_vm._v("Recargar")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12" }, [
        _c(
          "table",
          { staticClass: "striped", staticStyle: { "font-size": "11px" } },
          [
            _vm._m(1),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.personas, function(persona) {
                return _c("tr", [
                  _c("td", [
                    _vm._v(
                      "\n               \n               " +
                        _vm._s(persona.cedula) +
                        "\n\n            "
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n              " +
                        _vm._s(
                          persona.nombres +
                            " , " +
                            persona.appaterno +
                            " " +
                            persona.apmaterno
                        ) +
                        "\n            "
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    persona.genero == "F"
                      ? _c(
                          "i",
                          { staticClass: "material-icons prefix purple-text" },
                          [_vm._v("radio_button_checked")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    persona.genero == "M"
                      ? _c(
                          "i",
                          { staticClass: "material-icons prefix blue-text" },
                          [_vm._v("radio_button_checked")]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("td"),
                  _vm._v(" "),
                  _c("td", {
                    domProps: { textContent: _vm._s(persona.celular) }
                  }),
                  _vm._v(" "),
                  _c("td", {
                    domProps: { textContent: _vm._s(persona.correo) }
                  }),
                  _vm._v(" "),
                  _c("td", {
                    domProps: { textContent: _vm._s(persona.direccion) }
                  }),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "a",
                      {
                        staticClass:
                          "btn-small waves-effect waves-light   cyan darken-1 tooltipped modal-trigger",
                        attrs: { "data-target": "mdlmodificarcliente" },
                        on: {
                          click: function($event) {
                            _vm.VistaModificarcliente(persona)
                          }
                        }
                      },
                      [
                        _c(
                          "i",
                          {
                            staticClass: "material-icons",
                            attrs: {
                              "data-position": "bottom",
                              "data-tooltip": "Modificar"
                            }
                          },
                          [_vm._v("edit")]
                        ),
                        _vm._v(" Modificar")
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass:
                          "  btn-small waves-effect waves-light  cyan darken-2 tooltipped modal-trigger",
                        attrs: { "data-target": "mdlvercliente" },
                        on: {
                          click: function($event) {
                            _vm.VerPersona(persona)
                          }
                        }
                      },
                      [
                        _c(
                          "i",
                          {
                            staticClass: "material-icons",
                            attrs: {
                              "data-position": "bottom",
                              "data-tooltip": "Ver"
                            }
                          },
                          [_vm._v("remove_red_eye")]
                        ),
                        _vm._v(" Ver")
                      ]
                    ),
                    _vm._v(" "),
                    persona.estado == "A"
                      ? _c(
                          "a",
                          {
                            staticClass:
                              "btn-small waves-effect waves-light  blue-grey",
                            on: {
                              click: function($event) {
                                _vm.DesactivarAll(persona.id)
                              }
                            }
                          },
                          [
                            _c(
                              "i",
                              {
                                staticClass: "material-icons",
                                attrs: {
                                  "data-position": "bottom",
                                  "data-tooltip": "Ver"
                                }
                              },
                              [_vm._v("archive")]
                            ),
                            _vm._v(" Archivar")
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    persona.estado == "I"
                      ? _c(
                          "a",
                          {
                            staticClass:
                              "  btn-small waves-effect waves-light green accent-4",
                            on: {
                              click: function($event) {
                                _vm.ActivarAll(persona.id)
                              }
                            }
                          },
                          [
                            _c(
                              "i",
                              {
                                staticClass: "material-icons",
                                attrs: {
                                  "data-position": "bottom",
                                  "data-tooltip": "Ver"
                                }
                              },
                              [_vm._v("done_all")]
                            ),
                            _vm._v(" Habilitar")
                          ]
                        )
                      : _vm._e()
                  ])
                ])
              })
            )
          ]
        ),
        _vm._v(" "),
        _c("div", [
          _c(
            "ul",
            { staticClass: "pagination" },
            [
              _vm.pagination.current_page > 1
                ? _c("li", [
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.changePage(_vm.pagination.current_page - 1)
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "material-icons" }, [
                          _vm._v("chevron_left")
                        ])
                      ]
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.pagesNumber, function(page) {
                return _c(
                  "li",
                  { class: [page == _vm.isActived ? "active" : ""] },
                  [
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.changePage(page)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(page) +
                            "\n              "
                        )
                      ]
                    )
                  ]
                )
              }),
              _vm._v(" "),
              _vm.pagination.current_page < _vm.pagination.last_page
                ? _c("li", { staticClass: "waves-effect" }, [
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.changePage(_vm.pagination.current_page + 1)
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "material-icons" }, [
                          _vm._v("chevron_right")
                        ])
                      ]
                    )
                  ])
                : _vm._e()
            ],
            2
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevopersona" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(2),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s3" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.cedula,
                  expression: "fillpersona.cedula"
                }
              ],
              staticClass: "validate",
              attrs: { id: "cedula", type: "text", maxlength: "10" },
              domProps: { value: _vm.fillpersona.cedula },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "cedula", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(3)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s1" }, [
            _vm.fillpersona.cedula.length >= 8
              ? _c(
                  "button",
                  {
                    staticClass:
                      "waves-effect waves-light btn btn-floating btn-small blue",
                    on: { click: _vm.ConsultarPersona }
                  },
                  [
                    _c("i", { staticClass: "material-icons left" }, [
                      _vm._v("search")
                    ])
                  ]
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s8" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.nombres,
                  expression: "fillpersona.nombres"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nombre", type: "text" },
              domProps: { value: _vm.fillpersona.nombres },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "nombres", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(4)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.appaterno,
                  expression: "fillpersona.appaterno"
                }
              ],
              staticClass: "validate",
              attrs: { id: "apellido1", type: "text" },
              domProps: { value: _vm.fillpersona.appaterno },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "appaterno", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(5)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.apmaterno,
                  expression: "fillpersona.apmaterno"
                }
              ],
              staticClass: "validate",
              attrs: { id: "apellido2", type: "text" },
              domProps: { value: _vm.fillpersona.apmaterno },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "apmaterno", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(6)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.fecha_nacimiento,
                  expression: "fillpersona.fecha_nacimiento"
                }
              ],
              staticClass: "validate",
              attrs: { id: "fnacimiento", type: "date" },
              domProps: { value: _vm.fillpersona.fecha_nacimiento },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillpersona,
                    "fecha_nacimiento",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(7)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s2" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillpersona.genero,
                    expression: "fillpersona.genero"
                  }
                ],
                staticClass: "browser-default",
                attrs: { id: "genero" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.fillpersona,
                      "genero",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "F" } }, [_vm._v("Femenino")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "M" } }, [_vm._v("Masculino")])
              ]
            ),
            _vm._v(" "),
            _vm._m(8)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s2" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillpersona.estado_civil,
                    expression: "fillpersona.estado_civil"
                  }
                ],
                staticClass: "browser-default",
                attrs: { id: "estadocivil" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.fillpersona,
                      "estado_civil",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "S" } }, [
                  _vm._v("Soltero (a)")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "C" } }, [_vm._v("Casado (a)")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "D" } }, [
                  _vm._v("Divorciado (a)")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "V" } }, [_vm._v("Viudo (a)")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "UL" } }, [_vm._v("U. Libre")])
              ]
            ),
            _vm._v(" "),
            _vm._m(9)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.celular,
                  expression: "fillpersona.celular"
                }
              ],
              staticClass: "validate",
              attrs: { id: "celular", type: "text" },
              domProps: { value: _vm.fillpersona.celular },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "celular", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(10)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.correo,
                  expression: "fillpersona.correo"
                }
              ],
              staticClass: "validate",
              attrs: { id: "correo", type: "email" },
              domProps: { value: _vm.fillpersona.correo },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "correo", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "correo" } }, [
              _vm._v("Correo Electronico")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.direccion,
                  expression: "fillpersona.direccion"
                }
              ],
              staticClass: "validate",
              attrs: { id: "direccion", type: "text" },
              domProps: { value: _vm.fillpersona.direccion },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "direccion", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(11)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12" }, [
            _vm._m(12),
            _vm._v(" "),
            _c("p", [
              _c("label", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillpersona.tipo,
                      expression: "fillpersona.tipo"
                    }
                  ],
                  attrs: {
                    name: "tipopersona",
                    type: "radio",
                    value: "JEFE DEPARTAMENTO"
                  },
                  domProps: {
                    checked: _vm._q(_vm.fillpersona.tipo, "JEFE DEPARTAMENTO")
                  },
                  on: {
                    change: function($event) {
                      _vm.$set(_vm.fillpersona, "tipo", "JEFE DEPARTAMENTO")
                    }
                  }
                }),
                _vm._v(" "),
                _vm.usuario.rol == 1
                  ? _c("span", [_vm._v("Jefe de Departamento")])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("label", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillpersona.tipo,
                      expression: "fillpersona.tipo"
                    }
                  ],
                  attrs: {
                    name: "tipopersona",
                    type: "radio",
                    value: "DOCENTE"
                  },
                  domProps: {
                    checked: _vm._q(_vm.fillpersona.tipo, "DOCENTE")
                  },
                  on: {
                    change: function($event) {
                      _vm.$set(_vm.fillpersona, "tipo", "DOCENTE")
                    }
                  }
                }),
                _vm._v(" "),
                _vm.usuario.rol == 1
                  ? _c("span", [_vm._v("Docente")])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("label", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillpersona.tipo,
                      expression: "fillpersona.tipo"
                    }
                  ],
                  attrs: {
                    name: "tipopersona",
                    type: "radio",
                    value: "ADMINISTRADOR",
                    checked: ""
                  },
                  domProps: {
                    checked: _vm._q(_vm.fillpersona.tipo, "ADMINISTRADOR")
                  },
                  on: {
                    change: function($event) {
                      _vm.$set(_vm.fillpersona, "tipo", "ADMINISTRADOR")
                    }
                  }
                }),
                _vm._v(" "),
                _vm.usuario.rol == 1
                  ? _c("span", [_vm._v("Administrador System")])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("label", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillpersona.tipo,
                      expression: "fillpersona.tipo"
                    }
                  ],
                  attrs: {
                    name: "tipopersona",
                    type: "radio",
                    value: "SECRETARIA"
                  },
                  domProps: {
                    checked: _vm._q(_vm.fillpersona.tipo, "SECRETARIA")
                  },
                  on: {
                    change: function($event) {
                      _vm.$set(_vm.fillpersona, "tipo", "SECRETARIA")
                    }
                  }
                }),
                _vm._v(" "),
                _vm.usuario.rol == 1
                  ? _c("span", [_vm._v("Secretaria")])
                  : _vm._e()
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillpersona.cedula != "" &&
        _vm.fillpersona.nombres != "" &&
        _vm.fillpersona.appaterno != "" &&
        _vm.fillpersona.apmaterno != "" &&
        _vm.fillpersona.celular != "" &&
        _vm.fillpersona.correo != "" &&
        _vm.fillpersona.direccion != "" &&
        _vm.fillpersona.fecha_nacimiento != "" &&
        _vm.fillpersona.estado_civil != "" &&
        _vm.fillpersona.genero != "" &&
        _vm.fillpersona.tipo != ""
          ? _c(
              "button",
              {
                staticClass:
                  "waves-effect waves-light btn teal lighten-1 btn modal-close",
                on: { click: _vm.NuevoPersona }
              },
              [_vm._v("Registrar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlmodificarcliente" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(13),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.viewpersona.nombres,
                  expression: "viewpersona.nombres"
                }
              ],
              staticClass: "validate",
              attrs: { id: "MODnombre", type: "text" },
              domProps: { value: _vm.viewpersona.nombres },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.viewpersona, "nombres", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(14)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.viewpersona.appaterno,
                  expression: "viewpersona.appaterno"
                }
              ],
              staticClass: "validate",
              attrs: { id: "MODapellido1", type: "text" },
              domProps: { value: _vm.viewpersona.appaterno },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.viewpersona, "appaterno", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(15)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.viewpersona.apmaterno,
                  expression: "viewpersona.apmaterno"
                }
              ],
              staticClass: "validate",
              attrs: { id: "MODapellido2", type: "text" },
              domProps: { value: _vm.viewpersona.apmaterno },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.viewpersona, "apmaterno", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(16)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.viewpersona.fecha_nacimiento,
                  expression: "viewpersona.fecha_nacimiento"
                }
              ],
              staticClass: "validate",
              attrs: { id: "MODfnac", type: "date" },
              domProps: { value: _vm.viewpersona.fecha_nacimiento },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.viewpersona,
                    "fecha_nacimiento",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(17)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.viewpersona.genero,
                    expression: "viewpersona.genero"
                  }
                ],
                staticClass: "browser-default",
                attrs: { id: "MODgenero" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.viewpersona,
                      "genero",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "F" } }, [_vm._v("Femenino")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "M" } }, [_vm._v("Masculino")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "O" } }, [_vm._v("Otros")])
              ]
            ),
            _vm._v(" "),
            _vm._m(18)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.viewpersona.estado_civil,
                    expression: "viewpersona.estado_civil"
                  }
                ],
                staticClass: "browser-default",
                attrs: { id: "MODestadocivil" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.viewpersona,
                      "estado_civil",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "S" } }, [_vm._v("Soltero")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "C" } }, [_vm._v("Casado")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "D" } }, [_vm._v("Divorciado")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "V" } }, [_vm._v("Viudo")])
              ]
            ),
            _vm._v(" "),
            _vm._m(19)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.viewpersona.celular,
                  expression: "viewpersona.celular"
                }
              ],
              staticClass: "validate",
              attrs: { id: "MODcelular", type: "text" },
              domProps: { value: _vm.viewpersona.celular },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.viewpersona, "celular", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(20)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.viewpersona.correo,
                  expression: "viewpersona.correo"
                }
              ],
              staticClass: "validate",
              attrs: { id: "MODcorreo", type: "email" },
              domProps: { value: _vm.viewpersona.correo },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.viewpersona, "correo", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "MODcorreo" } }, [
              _vm._v("Correo Electronico")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.viewpersona.direccion,
                  expression: "viewpersona.direccion"
                }
              ],
              staticClass: "validate",
              attrs: { id: "MODdireccion", type: "text" },
              domProps: { value: _vm.viewpersona.direccion },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.viewpersona, "direccion", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(21)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1 darken-3 btn modal-close",
            on: { click: _vm.Modificar }
          },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("save")]),
            _vm._v("Modificar")
          ]
        ),
        _vm._v(" "),
        _vm._m(22)
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlvercliente" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("h4", [
          _vm._v(
            _vm._s(
              _vm.viewpersona.nombres +
                ", " +
                _vm.viewpersona.appaterno +
                " " +
                _vm.viewpersona.apmaterno
            )
          )
        ]),
        _vm._v(" "),
        _c("label", { staticStyle: { "font-size": "25px" } }, [
          _c("i", { staticClass: "material-icons" }, [
            _vm._v("assignment_ind")
          ]),
          _vm._v(
            "\n            " + _vm._s(_vm.viewpersona.cedula) + "\n          "
          )
        ]),
        _vm._v(" "),
        _c("p", { staticStyle: { "font-size": "18px" } }, [
          _vm.viewpersona.genero == "F"
            ? _c("i", { staticClass: "material-icons left purple-text" }, [
                _vm._v("hdr_strong")
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.viewpersona.genero == "F"
            ? _c("span", [_vm._v("Femenino")])
            : _vm._e(),
          _vm._v(" "),
          _vm.viewpersona.genero == "M"
            ? _c("i", { staticClass: "material-icons left blue-text" }, [
                _vm._v("hdr_strong")
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.viewpersona.genero == "M"
            ? _c("span", [_vm._v("Masculino")])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("p", { staticStyle: { "font-size": "18px" } }, [
          _c("i", { staticClass: "material-icons left" }, [
            _vm._v("person_pin")
          ]),
          _vm._v(" "),
          _vm.viewpersona.estado_civil == "S"
            ? _c("span", [_vm._v("Soltero (a)")])
            : _vm._e(),
          _vm._v(" "),
          _vm.viewpersona.estado_civil == "C"
            ? _c("span", [_vm._v("Casado (a)")])
            : _vm._e(),
          _vm._v(" "),
          _vm.viewpersona.estado_civil == "D"
            ? _c("span", [_vm._v("Divorciado (a)")])
            : _vm._e(),
          _vm._v(" "),
          _vm.viewpersona.estado_civil == "V"
            ? _c("span", [_vm._v("Viudo (a)")])
            : _vm._e(),
          _vm._v(" "),
          _vm.viewpersona.estado_civil == "UL"
            ? _c("span", [_vm._v("Union Libre")])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("p", { staticStyle: { "font-size": "18px" } }, [
          _c("i", { staticClass: "material-icons left" }, [
            _vm._v("local_phone")
          ]),
          _vm._v("     " + _vm._s(_vm.viewpersona.celular))
        ]),
        _vm._v(" "),
        _c("p", { staticStyle: { "font-size": "18px" } }, [
          _c("i", { staticClass: "material-icons left" }, [
            _vm._v("date_range")
          ]),
          _vm._v("   " + _vm._s(_vm.viewpersona.fecha_nacimiento))
        ]),
        _vm._v(" "),
        _c("p", { staticStyle: { "font-size": "18px" } }, [
          _c("i", { staticClass: "material-icons left" }, [_vm._v("email")]),
          _vm._v(" " + _vm._s(_vm.viewpersona.correo))
        ]),
        _vm._v(" "),
        _c("p", { staticStyle: { "font-size": "18px" } }, [
          _c("i", { staticClass: "material-icons left" }, [
            _vm._v("person_pin_circle")
          ]),
          _vm._v("   " + _vm._s(_vm.viewpersona.direccion))
        ]),
        _vm._v(" "),
        _vm.viewpersona.estado == "A"
          ? _c(
              "button",
              {
                staticClass: "waves-effect waves-light btn teal lighten-1 pulse"
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("check_circle")
                ]),
                _vm._v("Activo")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.viewpersona.estado == "I"
          ? _c(
              "button",
              { staticClass: "waves-effect waves-light btn red pulse" },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("do_not_disturb_alt")
                ]),
                _vm._v("INACTIVO")
              ]
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm._m(23)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l12 m12" }, [
      _c("div", [
        _c("div", { staticClass: "col s12" }, [
          _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
            _vm._v("Personas")
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("CEDULA")]),
      _vm._v(" "),
      _c("th", [_vm._v("NOMBRES Y APELLIDOS")]),
      _vm._v(" "),
      _c("th", [_vm._v("SEXO")]),
      _vm._v(" "),
      _c("th"),
      _vm._v(" "),
      _c("th", [_vm._v("CELULAR")]),
      _vm._v(" "),
      _c("th", [_vm._v("CORREO")]),
      _vm._v(" "),
      _c("th", [_vm._v("DIRECCION")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("REGISTRO PERSONA")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "cedula" } }, [
      _vm._v("CEDULA "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nombre" } }, [
      _vm._v("Nombres "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "apellido1" } }, [
      _vm._v("Apellido Pateno "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "apellido2" } }, [
      _vm._v("Apellido Materno "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "fnacimiento" } }, [
      _vm._v("F.Nacimiento "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "genero" } }, [
      _vm._v("Genero "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "estadocivil" } }, [
      _vm._v("Estado Civil "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "celular" } }, [
      _vm._v("Celular "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "direccion" } }, [
      _vm._v("Dirección "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("Registrarme como:")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("MODIFICAR PERSONA")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "MODnombre" } }, [
      _vm._v("Nombres "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "MODapellido1" } }, [
      _vm._v("Apellido Pateno "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "MODapellido2" } }, [
      _vm._v("Apellido Materno "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "MODfnac" } }, [
      _vm._v("F.Nacimiento "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "MODgenero" } }, [
      _vm._v("Genero "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "MODestadocivil" } }, [
      _vm._v("Estado Civil "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "MODcelular" } }, [
      _vm._v("Celular "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "MODdireccion" } }, [
      _vm._v("Dirección "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect waves-green btn blue-grey" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("Cancelar")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        { staticClass: "modal-close waves-effect waves-green btn-flat" },
        [
          _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
          _vm._v("Salir")
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-52c9823a", module.exports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(50)
/* template */
var __vue_template__ = __webpack_require__(51)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/UsuarioComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10d4bc10", Component.options)
  } else {
    hotAPI.reload("data-v-10d4bc10", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      usuario: global.user,
      usuarios: [],
      fullPage: true,
      isLoading: false

    };
  },

  components: {

    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a

  },
  methods: {

    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    Activar: function Activar(iduser) {},
    Desactivar: function Desactivar(iduser) {},
    Get: function Get() {
      var _this = this;

      var url = '/getusuarios';
      axios.post(url).then(function (response) {
        M.toast({ html: 'Usuarios Obtenidos', 'classes': 'blue' });
        _this.usuarios = response.data;
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
        console.log(error.response);
      });
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });
    this.Get();
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col s6" }, [
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn indigo",
            on: { click: _vm.Get }
          },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("sync")]),
            _vm._v(" Recargar")
          ]
        )
      ]),
      _vm._v(" "),
      _vm._m(1),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _c("table", [
          _vm._m(2),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.usuarios, function(user) {
              return _c("tr", [
                _c("td", [_c("em", [_vm._v(_vm._s(user.name))])]),
                _vm._v(" "),
                _c("td", [
                  user.rol == "1"
                    ? _c("label", [_vm._v("Administrador")])
                    : _vm._e(),
                  _vm._v(" "),
                  user.rol == "2" ? _c("label", [_vm._v("Docente")]) : _vm._e(),
                  _vm._v(" "),
                  user.rol == "3"
                    ? _c("label", [_vm._v("Secretaria")])
                    : _vm._e(),
                  _vm._v(" "),
                  user.rol == "4"
                    ? _c("label", [_vm._v("Estudiante")])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("td", [
                  user.estadousuario == "A"
                    ? _c("span", { staticClass: "badge green white-text" }, [
                        _vm._v("Permitido")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  user.estadousuario == "I"
                    ? _c("span", { staticClass: "badge red white-text" }, [
                        _vm._v("Restringido")
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(
                    "\n              " + _vm._s(user.codigo) + "\n            "
                  )
                ]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(user.fecha_registro))]),
                _vm._v(" "),
                _c("td", [
                  _c("strong", [
                    _vm._v(
                      "\n                 " +
                        _vm._s(
                          user.nombres +
                            " ," +
                            user.appaterno +
                            " " +
                            user.apmaterno
                        ) +
                        "\n              "
                    )
                  ]),
                  _vm._v(" "),
                  _c("br"),
                  _vm._v(" "),
                  _c("label", [
                    _c(
                      "i",
                      {
                        staticClass: "material-icons",
                        staticStyle: { "font-size": "12px" }
                      },
                      [_vm._v("perm_contact_calendar")]
                    ),
                    _vm._v(_vm._s(user.cedula))
                  ]),
                  _vm._v(" "),
                  _c("br"),
                  _vm._v(" "),
                  _c("label", [
                    _c(
                      "i",
                      {
                        staticClass: "material-icons",
                        staticStyle: { "font-size": "12px" }
                      },
                      [_vm._v("place")]
                    ),
                    _vm._v(_vm._s(user.direccion))
                  ]),
                  _vm._v(" "),
                  _c("br"),
                  _vm._v(" "),
                  _c("label", [
                    _c(
                      "i",
                      {
                        staticClass: "material-icons",
                        staticStyle: { "font-size": "12px" }
                      },
                      [_vm._v("local_phone")]
                    ),
                    _vm._v(_vm._s(user.celular))
                  ])
                ]),
                _vm._v(" "),
                _c("td", [
                  user.estadousuario == "A"
                    ? _c(
                        "a",
                        {
                          staticClass:
                            "btn  btn-small waves-effect waves-light orange  accent-3",
                          on: {
                            click: function($event) {
                              _vm.Activar(user.id)
                            }
                          }
                        },
                        [
                          _c(
                            "i",
                            {
                              staticClass: "material-icons",
                              attrs: {
                                "data-position": "bottom",
                                "data-tooltip": "Ver"
                              }
                            },
                            [_vm._v("lock")]
                          ),
                          _vm._v(" Desactivar")
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  user.estadousuario == "I"
                    ? _c(
                        "a",
                        {
                          staticClass:
                            "btn  btn-small waves-effect waves-light green accent-3",
                          on: {
                            click: function($event) {
                              _vm.Desactivar(user.id)
                            }
                          }
                        },
                        [
                          _c(
                            "i",
                            {
                              staticClass: "material-icons",
                              attrs: {
                                "data-position": "bottom",
                                "data-tooltip": "Ver"
                              }
                            },
                            [_vm._v("lock_open")]
                          ),
                          _vm._v(" Activar")
                        ]
                      )
                    : _vm._e()
                ])
              ])
            })
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _vm._m(3)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col s12", staticStyle: { padding: "5px" } },
      [_c("strong", [_vm._v("Usuarios")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("form", { staticClass: "col s6" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s6" }, [
            _c("i", { staticClass: "material-icons prefix" }, [
              _vm._v("search")
            ]),
            _vm._v(" "),
            _c("textarea", {
              staticClass: "materialize-textarea",
              attrs: { id: "icon_prefix2" }
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "icon_prefix2" } }, [_vm._v("Nombre")])
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("NAME USER")]),
      _vm._v(" "),
      _c("th", [_vm._v("ROL")]),
      _vm._v(" "),
      _c("th", [_vm._v("ACCESO")]),
      _vm._v(" "),
      _c("th", [_vm._v("CODIGO ACCESO")]),
      _vm._v(" "),
      _c("th", [_vm._v("REGISTRADO")]),
      _vm._v(" "),
      _c("th", [_vm._v("PERSONA")]),
      _vm._v(" "),
      _c("th")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "modal", attrs: { id: "mdlnuevopersona" } },
      [
        _c("div", { staticClass: "modal-content" }, [
          _c("p", [_c("strong", [_vm._v("REGISTRO DE USUARIO")])]),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _vm._v("\n          formulario\n        ")
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "modal-footer" }, [
          _c(
            "button",
            {
              staticClass: "modal-close waves-effect waves-green btn blue-grey"
            },
            [
              _c("i", { staticClass: "material-icons left" }, [
                _vm._v("close")
              ]),
              _vm._v("Cancelar")
            ]
          )
        ])
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-10d4bc10", module.exports)
  }
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(53)
/* template */
var __vue_template__ = __webpack_require__(54)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/AuditoriaComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65e1bd60", Component.options)
  } else {
    hotAPI.reload("data-v-65e1bd60", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      usuario: global.user,

      fullPage: true,
      isLoading: false,
      registros: [],
      fecha: ''

    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    Obtener: function Obtener() {
      var _this = this;

      var url = '/getauditoria';
      axios.post(url, {
        onUploadProgress: function onUploadProgress(progressEvent) {
          return _this.isLoading = true;
        }
      }).then(function (response) {
        _this.registros = response.data;
        _this.isLoading = false;
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ObtenerFecha: function ObtenerFecha() {
      var _this2 = this;

      alert('registro');
      this.registros = [];
      var url = '/getauditoriabydate';
      axios.post(url, {
        'fecha': this.fecha
      }, {
        onUploadProgress: function onUploadProgress(progressEvent) {
          return _this2.isLoading = true;
        }
      }).then(function (response) {
        _this2.registros = response.data;
        _this2.isLoading = false;
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {

    M.AutoInit();

    this.Obtener();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l6 m6" }, [
        _vm.fecha == ""
          ? _c(
              "button",
              {
                staticClass: "waves-effect waves-light btn indigo",
                on: { click: _vm.Obtener }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("sync")
                ]),
                _vm._v(" Recargar")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.fecha != ""
          ? _c(
              "button",
              {
                staticClass: "waves-effect waves-light btn indigo",
                on: { click: _vm.ObtenerFecha }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("sync")
                ]),
                _vm._v(" Recargar")
              ]
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l6 m6" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s6" }, [
            _c("i", { staticClass: "material-icons prefix" }, [
              _vm._v("search")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fecha,
                  expression: "fecha"
                }
              ],
              attrs: { type: "date" },
              domProps: { value: _vm.fecha },
              on: {
                change: _vm.ObtenerFecha,
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.fecha = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "icon_prefix2" } }, [_vm._v("Fecha")])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _c("table", [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.registros, function(registro) {
              return _c("tr", [
                _c("td", {
                  domProps: { textContent: _vm._s(registro.nombre_tabla) }
                }),
                _vm._v(" "),
                _c("td", {
                  domProps: { textContent: _vm._s(registro.tipo_operacion) }
                }),
                _vm._v(" "),
                _c("td", {
                  domProps: { textContent: _vm._s(registro.fecha_registro) }
                }),
                _vm._v(" "),
                _c("td", {
                  domProps: { textContent: _vm._s(registro.observacion) }
                }),
                _vm._v(" "),
                _c("td", [
                  _vm._v(
                    "[" +
                      _vm._s(registro.idusuario) +
                      "] " +
                      _vm._s(registro.name)
                  )
                ]),
                _vm._v(" "),
                _c("td", {
                  domProps: { textContent: _vm._s(registro.nombre_pc) }
                })
              ])
            })
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _vm._m(2)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col s12", staticStyle: { padding: "5px" } },
      [_c("strong", [_vm._v("Auditoria de Sistemas")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Tabla")]),
      _vm._v(" "),
      _c("th", [_vm._v("Operacion")]),
      _vm._v(" "),
      _c("th", [_vm._v("Fecha")]),
      _vm._v(" "),
      _c("th", [_vm._v("Observacion")]),
      _vm._v(" "),
      _c("th", [_vm._v("Realizado por")]),
      _vm._v(" "),
      _c("th", [_vm._v("Desde Equipo")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal", attrs: { id: "mdlnuevohijo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._v("\n        contenido modal\n      ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn green" },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("save")]),
            _vm._v("Guardar")
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
            _vm._v("Salir")
          ]
        )
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-65e1bd60", module.exports)
  }
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(56)
/* template */
var __vue_template__ = __webpack_require__(57)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/EstudianteComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76004d52", Component.options)
  } else {
    hotAPI.reload("data-v-76004d52", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      usuario: global.user,

      fullPage: true,
      isLoading: false

    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),

    NuevoHijo: function NuevoHijo() {
      var url = '/nuevoreferenciahijo';
      axios.post(url, this.fillhijo).then(function (response) {
        M.toast({ html: 'Referencia Hijo Registrado!', 'classes': 'green' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col s6" }, [
        _vm._m(1),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn indigo",
            on: { click: _vm.Obtener }
          },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("sync")]),
            _vm._v(" Recargar")
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _vm._v("\n      contenido\n    ")
      ])
    ]),
    _vm._v(" "),
    _vm._m(2)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col s12", staticStyle: { padding: "5px" } },
      [_c("strong", [_vm._v("Estudiantes")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "waves-effect waves-light btn indigo  modal-trigger",
        attrs: { "data-target": "mdlnuevohijo" }
      },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("plus")]),
        _vm._v(" Nuevo")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal", attrs: { id: "mdlnuevohijo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._v("\n        contenido modal\n      ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn green" },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("save")]),
            _vm._v("Guardar")
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
            _vm._v("Salir")
          ]
        )
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-76004d52", module.exports)
  }
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(59)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(61)
/* template */
var __vue_template__ = __webpack_require__(62)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/PromocionComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8ba1ef5c", Component.options)
  } else {
    hotAPI.reload("data-v-8ba1ef5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("4527edae", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8ba1ef5c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PromocionComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8ba1ef5c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PromocionComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.pagination li.active {\r\n    background-color: rgb(0,128,128);\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n  font-size: 18px;\r\n  color: #999999;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n  color: #999999 ;\n}\r\n", ""]);

// exports


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var _ref;

    return _ref = {
      usuario: global.user,

      fullPage: true,
      isLoading: false,

      anios: [],
      promociones: [],
      duracion: [],
      divisiones: [],
      modulos: [],

      promocion: ''
    }, _defineProperty(_ref, 'promociones', []), _defineProperty(_ref, 'ciclos', []), _defineProperty(_ref, 'fillapertura', { 'idanio': '', 'idtipoestudiante': '', 'idduracion': '', 'idusuario': '', 'idpromocion': '', 'iddivision': '', 'idespecialidad': '' }), _defineProperty(_ref, 'pagination', { 'total': 0, 'current_page': 0, 'per_page': 0, 'last_page': 0, 'from': 0, 'to': 0 }), _defineProperty(_ref, 'offset', 3), _defineProperty(_ref, 'page', 1), _ref;
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  computed: {
    isActived: function isActived() {
      return this.pagination.current_page;
    },
    pagesNumber: function pagesNumber() {
      if (!this.pagination.to) {
        return [];
      }

      var from = this.pagination.current_page - this.offset;

      if (from < 1) from = 1;

      var to = from + this.offset * 2;

      if (to >= this.pagination.last_page) to = this.pagination.last_page;

      var pagesArray = [];

      while (from <= to) {
        pagesArray.push(from);
        from++;
      }

      return pagesArray;
    }
  },
  methods: {
    changePage: function changePage(page) {
      this.pagination.current_page = page;
      this.page = page;
      this.Obtener(page);
    },
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    Descargarxls: function Descargarxls(idpromo) {
      axios({
        url: '/descargarexcel/' + idpromo,
        method: 'GET',
        responseType: 'blob' // important
      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'kardex.xlsx');
        document.body.appendChild(link);
        link.click();
      }).catch(function (error) {
        console.log(error);
        console.log(error.response);
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    GetModulos: function GetModulos() {
      var _this = this;

      var url = '/getmodulos';
      axios.post(url).then(function (response) {

        _this.modulos = response.data;
        M.toast({ html: 'Modulos obtenidos', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    Obtener: function Obtener(page) {
      var _this2 = this;

      var url = '/getpromociones?page=' + page;
      axios.get(url).then(function (response) {
        console.log(response.data);
        _this2.promociones = response.data.ciclos.data;
        _this2.pagination = response.data.pagination;
        M.toast({ html: 'Promociones obtenidos', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    Aperturar: function Aperturar() {
      var _this3 = this;

      var url = '/nuevopromocion';
      axios.post(url, {
        'promo': this.promocion
      }).then(function (response) {
        if (response.data == "existe") {
          M.toast({ html: 'Promocion Existe, No se puede duplicar', 'classes': 'orange' });
          _this3.promocion = '';
        } else {
          _this3.promocion = '';
          _this3.Obtener(_this3.page);
          M.toast({ html: 'Aperturado', 'classes': 'teal lighten-1' });
        }
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    this.Obtener(this.page);
    this.GetModulos();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col s12" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "col s6 l6 m6",
            staticStyle: { "text-align": "right" }
          },
          [
            _c(
              "button",
              {
                staticClass:
                  "waves-effect waves-light btn btn-small teal lighten-1  modal-trigger",
                attrs: { "data-target": "dmlnuevociclo" }
              },
              [_vm._v("Aperturar promocion")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass:
                  "waves-effect waves-light btn btn-small blue-grey lighten-1",
                on: {
                  click: function($event) {
                    _vm.Obtener(_vm.page)
                  }
                }
              },
              [_vm._v("Recargar")]
            )
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "col s6 l12 m12" }, [
          _c("table", { staticClass: "striped responsive-table" }, [
            _vm._m(1),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.promociones, function(promo, index) {
                return _c("tr", [
                  _c(
                    "td",
                    [
                      _c("center", [
                        _vm._v(
                          "\n                  " +
                            _vm._s(promo.nro_promocion) +
                            "\n                "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(promo.division))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(promo.grado))]),
                  _vm._v(" "),
                  _c("td", [
                    promo.estado_ac == "A"
                      ? _c("strong", { staticClass: "green-text" }, [
                          _vm._v(" Activo")
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    promo.estado_ac == "I"
                      ? _c("strong", { staticClass: "red-text" }, [
                          _vm._v(" Cerrado ")
                        ])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "ul",
                      _vm._l(_vm.modulos, function(modulo) {
                        return _c("li", { staticStyle: { margin: "5px" } }, [
                          _c(
                            "a",
                            {
                              staticClass:
                                "waves-effect waves btn btn-small blue-grey",
                              attrs: {
                                href:
                                  "/seguimientomodulo/" +
                                  promo.id +
                                  "/" +
                                  modulo.id,
                                target: "_blank"
                              }
                            },
                            [_vm._v(_vm._s("Seg. " + modulo.nombre))]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              staticClass:
                                "waves-effect waves-light btn blue-grey btn-small",
                              attrs: {
                                href:
                                  "/actanotasexamfinal/" +
                                  promo.id +
                                  "/" +
                                  modulo.id,
                                target: "blank"
                              }
                            },
                            [_vm._v("Exm.Final")]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              staticClass:
                                "waves-effect waves-light btn blue-grey btn-small",
                              attrs: {
                                href:
                                  "/actanotasacapdf/" +
                                  promo.id +
                                  "/" +
                                  modulo.id,
                                target: "blank"
                              }
                            },
                            [_vm._v("ACA")]
                          )
                        ])
                      })
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass: "waves-effect waves btn btn-small green",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.Descargarxls(promo.id)
                          }
                        }
                      },
                      [_vm._v("Generar")]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "td",
                    [
                      _c(
                        "router-link",
                        {
                          staticClass:
                            "waves-effect waves btn btn-small indigo",
                          attrs: { to: "/matricular/" + promo.id }
                        },
                        [_vm._v("Matricular")]
                      ),
                      _vm._v(" "),
                      _c(
                        "router-link",
                        {
                          staticClass:
                            "waves-effect waves btn btn-small teal lighten",
                          attrs: { to: "/asignardocente/" + promo.id }
                        },
                        [_vm._v("Asignar Docentes")]
                      )
                    ],
                    1
                  )
                ])
              })
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col s6 l12 m12" }, [
          _c(
            "ul",
            { staticClass: "pagination" },
            [
              _vm.pagination.current_page > 1
                ? _c("li", [
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.changePage(_vm.pagination.current_page - 1)
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "material-icons" }, [
                          _vm._v("chevron_left")
                        ])
                      ]
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.pagesNumber, function(page) {
                return _c(
                  "li",
                  { class: [page == _vm.isActived ? "active" : ""] },
                  [
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.changePage(page)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(page) +
                            "\n              "
                        )
                      ]
                    )
                  ]
                )
              }),
              _vm._v(" "),
              _vm.pagination.current_page < _vm.pagination.last_page
                ? _c("li", { staticClass: "waves-effect" }, [
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.changePage(_vm.pagination.current_page + 1)
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "material-icons" }, [
                          _vm._v("chevron_right")
                        ])
                      ]
                    )
                  ])
                : _vm._e()
            ],
            2
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "dmlnuevociclo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("h5", [_vm._v("Nuevo Promoción")]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col s12 l6 m6" }, [
            _c("div", { staticClass: "input-field" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.promocion,
                    expression: "promocion"
                  }
                ],
                attrs: { type: "number", min: "0" },
                domProps: { value: _vm.promocion },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.promocion = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Promocion")]
              )
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.promocion != ""
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn teal lighten-1",
                on: { click: _vm.Aperturar }
              },
              [_vm._v("Aperturar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l6 m6" }, [
      _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
        _vm._v("Años academicos")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Promoción")]),
      _vm._v(" "),
      _c("th", [_vm._v("Division")]),
      _vm._v(" "),
      _c("th", [_vm._v("Grado")]),
      _vm._v(" "),
      _c("th", [_vm._v("Estado")]),
      _vm._v(" "),
      _c("th", [_vm._v("Seguimento por Modulo Pdf")]),
      _vm._v(" "),
      _c("th", [_vm._v("Cuadro General Excel")]),
      _vm._v(" "),
      _c("th", [_vm._v("Acciones")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8ba1ef5c", module.exports)
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(64)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(66)
/* template */
var __vue_template__ = __webpack_require__(67)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/CicloAcademicoComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d629388", Component.options)
  } else {
    hotAPI.reload("data-v-3d629388", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("562b5a6c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d629388\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CicloAcademicoComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d629388\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CicloAcademicoComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.pagination li.active {\r\n    background-color: rgb(0,128,128);\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n      font-size: 18px;\r\n      color: #999999;\n}\n.breadcrumb:before {\r\n        color: #999999;\n}\n.breadcrumb:last-child {\r\n      color: #999999 ;\n}\r\n", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
var _components$props$dat;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = (_components$props$dat = {
  components: {},
  props: {
    idpromocion: String
  },
  data: function data() {
    return {
      usuario: global.user,

      fullPage: true,
      isLoading: false,

      anios: [],
      promociones: [],
      duracion: [],
      tipoestudiantes: [],
      divisiones: [],
      especialidades: [],
      promo: '',

      fillapertura: { 'idanio': '', 'idtipoestudiante': '', 'idduracion': '', 'idusuario': '', 'idpromocion': '', 'iddivision': '', 'idespecialidad': '' },
      ciclos: [],
      pagination: { 'total': 0, 'current_page': 0, 'per_page': 0, 'last_page': 0, 'from': 0, 'to': 0 },
      offset: 3,
      page: 1

    };
  }
}, _defineProperty(_components$props$dat, 'components', {
  Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
}), _defineProperty(_components$props$dat, 'computed', {
  isActived: function isActived() {
    return this.pagination.current_page;
  },
  pagesNumber: function pagesNumber() {
    if (!this.pagination.to) {
      return [];
    }

    var from = this.pagination.current_page - this.offset;

    if (from < 1) from = 1;

    var to = from + this.offset * 2;

    if (to >= this.pagination.last_page) to = this.pagination.last_page;

    var pagesArray = [];

    while (from <= to) {
      pagesArray.push(from);
      from++;
    }

    return pagesArray;
  }
}), _defineProperty(_components$props$dat, 'methods', {
  changePage: function changePage(page) {
    this.pagination.current_page = page;
    this.Obtener(page);
  },
  moment: function (_moment) {
    function moment() {
      return _moment.apply(this, arguments);
    }

    moment.toString = function () {
      return _moment.toString();
    };

    return moment;
  }(function () {
    return moment();
  }),
  Obtener: function Obtener(page) {
    var _this = this;

    var url = '/getciclosacademicos/?page=' + page + '&idpromocion=' + this.idpromocion;
    axios.get(url, {
      onUploadProgress: function onUploadProgress(progressEvent) {
        return _this.isLoading = true;
      }
    }).then(function (response) {
      _this.ciclos = response.data.ciclos.data;
      _this.pagination = response.data.pagination;

      _this.isLoading = false;
      if (_this.ciclos.length == 0) {
        M.toast({ html: 'Ningun registro', 'classes': 'orange' });
      } else {
        _this.promo = _this.ciclos[0]['promocion']['nombre'];
        M.toast({ html: 'Ciclos obtenidos', 'classes': 'blue' });
      }
    }).catch(function (error) {

      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  Aperturar: function Aperturar() {
    var _this2 = this;

    this.fillapertura.idpromocion = this.idpromocion;
    this.fillapertura.idusuario = this.usuario.id;
    var url = '/aperturarcicloacademico';
    axios.post(url, this.fillapertura).then(function (response) {
      _this2.Obtener(_this2.page);
      M.toast({ html: 'Aperturado', 'classes': 'green' });
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetReferencial: function GetReferencial() {
    var _this3 = this;

    var url = '/getreferencialforcicloacademico';
    axios.post(url).then(function (response) {
      var valores = response.data;
      _this3.anios = valores[0];
      _this3.tipoestudiantes = valores[1];
      _this3.duracion = valores[2];
      _this3.divisiones = valores[3];
      _this3.especialidades = valores[4];
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  }
}), _defineProperty(_components$props$dat, 'mounted', function mounted() {
  M.AutoInit();

  this.Obtener(this.page);
  this.GetReferencial();

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });
}), _components$props$dat);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008366",
            width: 100,
            height: 100,
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c("div", [
          _c(
            "div",
            { staticClass: "col s12" },
            [
              _c(
                "router-link",
                { staticClass: "breadcrumb", attrs: { to: "/promociones" } },
                [_vm._v("Promociones")]
              ),
              _vm._v(" "),
              _c("a", { staticClass: "breadcrumb" }, [
                _vm._v("Ciclos Academicos")
              ])
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l3 m3" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-content" }, [
            _c(
              "div",
              [
                _c("center", [
                  _c("h4", [_vm._v(_vm._s(_vm.promo))]),
                  _vm._v(" "),
                  _c("label", [_vm._v("Promoción")])
                ])
              ],
              1
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l9 m9" }, [
        _c("div", { staticClass: "row" }, [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "col s12 m6 l6",
              staticStyle: { "text-align": "right" }
            },
            [
              _vm._m(1),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass:
                    "waves-effect waves-light btn btn-small  blue-grey lighten-1",
                  on: {
                    click: function($event) {
                      _vm.Obtener(_vm.page)
                    }
                  }
                },
                [
                  _c("i", { staticClass: "material-icons left" }, [
                    _vm._v("sync")
                  ]),
                  _vm._v(" Recargar")
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l12 m12" }, [
            _c("table", { staticClass: "striped responsive-table" }, [
              _vm._m(2),
              _vm._v(" "),
              _c(
                "tbody",
                [
                  _vm._l(_vm.ciclos, function(ciclo, index) {
                    return _c("tr", [
                      _c("td", [
                        _vm._v(
                          "\n              " +
                            _vm._s(ciclo.promocion.nombre) +
                            "  \n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n              " +
                            _vm._s(ciclo.anio_academico.nombre) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n              " +
                            _vm._s(index + 1) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n              " +
                            _vm._s(ciclo.especialidad.nombre) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n              " +
                            _vm._s(ciclo.tipo_estudiante.nombre) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n              " +
                            _vm._s(ciclo.division.nombre) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n             " +
                            _vm._s(
                              ciclo.tipo_estudiante.siglas +
                                "" +
                                ciclo.anio_academico.siglas
                            ) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n              " +
                            _vm._s(ciclo.periodo.nombre) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        ciclo.estado == "A"
                          ? _c("strong", { staticClass: "green-text" }, [
                              _vm._v(" Activo")
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        ciclo.estado == "I"
                          ? _c("strong", { staticClass: "red-text" }, [
                              _vm._v(" Cerrado ")
                            ])
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _c(
                            "router-link",
                            {
                              staticClass:
                                "waves-effect waves btn  indigo lighten-1 btn-small",
                              attrs: {
                                to:
                                  "/matricular/" +
                                  _vm.idpromocion +
                                  "/" +
                                  ciclo.id
                              }
                            },
                            [
                              _c("i", { staticClass: "material-icons" }, [
                                _vm._v("assignment_ind")
                              ]),
                              _vm._v(" Matricula")
                            ]
                          ),
                          _vm._v(" "),
                          ciclo.cursos == 0
                            ? _c(
                                "router-link",
                                {
                                  staticClass:
                                    "waves-effect waves btn  indigo lighten-1 btn-small",
                                  attrs: { disabled: "" }
                                },
                                [
                                  _c("i", { staticClass: "material-icons" }, [
                                    _vm._v("assignment_ind")
                                  ]),
                                  _vm._v(" Matricula")
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "router-link",
                            {
                              staticClass:
                                "waves-effect waves-green btn-small btn light-blue lighten-1 pulse",
                              attrs: {
                                to:
                                  "/asignarcurso/" +
                                  _vm.idpromocion +
                                  "/" +
                                  ciclo.id
                              }
                            },
                            [
                              _c("i", { staticClass: "material-icons" }, [
                                _vm._v("settings")
                              ]),
                              _vm._v(" Asignaturas")
                            ]
                          )
                        ],
                        1
                      )
                    ])
                  }),
                  _vm._v(" "),
                  _vm.ciclos.length == 0
                    ? _c("label", [_vm._v("Ningun registro.")])
                    : _vm._e()
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "pagination" },
              [
                _vm.pagination.current_page > 1
                  ? _c("li", [
                      _c(
                        "a",
                        {
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.changePage(_vm.pagination.current_page - 1)
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("chevron_left")
                          ])
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm._l(_vm.pagesNumber, function(page) {
                  return _c(
                    "li",
                    { class: [page == _vm.isActived ? "active" : ""] },
                    [
                      _c(
                        "a",
                        {
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.changePage(page)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                " +
                              _vm._s(page) +
                              "\n              "
                          )
                        ]
                      )
                    ]
                  )
                }),
                _vm._v(" "),
                _vm.pagination.current_page < _vm.pagination.last_page
                  ? _c("li", { staticClass: "waves-effect" }, [
                      _c(
                        "a",
                        {
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.changePage(_vm.pagination.current_page + 1)
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("chevron_right")
                          ])
                        ]
                      )
                    ])
                  : _vm._e()
              ],
              2
            )
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "dmlnuevociclo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("h5", [_vm._v("Aperturar Ciclo Academico")]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col s12 l4 m4" }, [
            _c("div", { staticClass: "input-field" }, [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillapertura.idanio,
                      expression: "fillapertura.idanio"
                    }
                  ],
                  staticClass: "browser-default",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.fillapertura,
                        "idanio",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                _vm._l(_vm.anios, function(anio) {
                  return _c("option", { domProps: { value: anio.id } }, [
                    _vm._v(_vm._s(anio.nombre))
                  ])
                })
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Año/Periodo")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l8 m8" }, [
            _c("div", { staticClass: "input-field" }, [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillapertura.idespecialidad,
                      expression: "fillapertura.idespecialidad"
                    }
                  ],
                  staticClass: "browser-default",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.fillapertura,
                        "idespecialidad",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                _vm._l(_vm.especialidades, function(especialidad) {
                  return _c(
                    "option",
                    { domProps: { value: especialidad.id } },
                    [_vm._v(_vm._s(especialidad.nombre))]
                  )
                })
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Especialidad")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l4 m4" }, [
            _c("div", { staticClass: "input-field" }, [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillapertura.idtipoestudiante,
                      expression: "fillapertura.idtipoestudiante"
                    }
                  ],
                  staticClass: "browser-default",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.fillapertura,
                        "idtipoestudiante",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                _vm._l(_vm.tipoestudiantes, function(tipo) {
                  return _c("option", { domProps: { value: tipo.id } }, [
                    _vm._v(_vm._s(tipo.nombre))
                  ])
                })
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Tipo Estudiante")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l4 m4" }, [
            _c("div", { staticClass: "input-field" }, [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillapertura.iddivision,
                      expression: "fillapertura.iddivision"
                    }
                  ],
                  staticClass: "browser-default",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.fillapertura,
                        "iddivision",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                _vm._l(_vm.divisiones, function(division) {
                  return _c("option", { domProps: { value: division.id } }, [
                    _vm._v(_vm._s(division.nombre))
                  ])
                })
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Division")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l4 m4" }, [
            _c("div", { staticClass: "input-field" }, [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillapertura.idduracion,
                      expression: "fillapertura.idduracion"
                    }
                  ],
                  staticClass: "browser-default",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.fillapertura,
                        "idduracion",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                _vm._l(_vm.duracion, function(tiempo) {
                  return _c("option", { domProps: { value: tiempo.id } }, [
                    _vm._v(_vm._s(tiempo.nombre))
                  ])
                })
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Duración")]
              )
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillapertura.idanio != "" &&
        _vm.fillapertura.idtipoestudiante != "" &&
        _vm.fillapertura.idduracion != ""
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn teal lighten-1",
                on: { click: _vm.Aperturar }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("save")
                ]),
                _vm._v("Aperturar")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._m(3)
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l6 m6" }, [
      _c("div", { staticClass: "input-field col s12 l6 m6" }, [
        _c("i", { staticClass: "material-icons prefix" }, [_vm._v("search")]),
        _vm._v(" "),
        _c("input", { attrs: { type: "text" } }),
        _vm._v(" "),
        _c("label", { attrs: { for: "icon_prefix2" } }, [_vm._v("Fecha")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass:
          "waves-effect waves-light btn btn-small  teal lighten-1 modal-trigger",
        attrs: { "data-target": "dmlnuevociclo" }
      },
      [
        _c("i", { staticClass: "material-icons left" }, [
          _vm._v("assistant_photo")
        ]),
        _vm._v(" Aperturar")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Promocion")]),
      _vm._v(" "),
      _c("th", [_vm._v("Año")]),
      _vm._v(" "),
      _c("th", [_vm._v("Modulo")]),
      _vm._v(" "),
      _c("th", [_vm._v("Especialidad")]),
      _vm._v(" "),
      _c("th", [_vm._v("Tipo")]),
      _vm._v(" "),
      _c("th", [_vm._v("División")]),
      _vm._v(" "),
      _c("th", [_vm._v("Grado")]),
      _vm._v(" "),
      _c("th", [_vm._v("Duración")]),
      _vm._v(" "),
      _c("th", [_vm._v("Estado")]),
      _vm._v(" "),
      _c("th")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect waves-green btn-flat" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("Salir")
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3d629388", module.exports)
  }
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(69)
/* template */
var __vue_template__ = __webpack_require__(70)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/DocenteComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-530ea994", Component.options)
  } else {
    hotAPI.reload("data-v-530ea994", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      usuario: global.user,

      fullPage: true,
      isLoading: false

    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),

    NuevoHijo: function NuevoHijo() {
      var url = '/nuevoreferenciahijo';
      axios.post(url, this.fillhijo).then(function (response) {
        M.toast({ html: 'Referencia Hijo Registrado!', 'classes': 'green' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col s6" }, [
        _vm._m(1),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn indigo",
            on: { click: _vm.Obtener }
          },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("sync")]),
            _vm._v(" Recargar")
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _vm._v("\n      contenido\n    ")
      ])
    ]),
    _vm._v(" "),
    _vm._m(2)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col s12", staticStyle: { padding: "5px" } },
      [_c("strong", [_vm._v("Docentes")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "waves-effect waves-light btn indigo  modal-trigger",
        attrs: { "data-target": "mdlnuevohijo" }
      },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("plus")]),
        _vm._v(" Nuevo")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal", attrs: { id: "mdlnuevohijo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._v("\n        contenido modal\n      ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn green" },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("save")]),
            _vm._v("Guardar")
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
            _vm._v("Salir")
          ]
        )
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-530ea994", module.exports)
  }
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(72)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(74)
/* template */
var __vue_template__ = __webpack_require__(75)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/MatriculaComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c884168", Component.options)
  } else {
    hotAPI.reload("data-v-4c884168", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("00d7f795", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c884168\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MatriculaComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c884168\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MatriculaComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.pagination li.active {\n  background-color: rgb(0,128,128);\n}\n.breadcrumb:before {\n  color: #999999;\n}\n.breadcrumb {\n  font-size: 18px;\n  color: #999999;\n}\n.breadcrumb:before {\n  color: #999999;\n}\n.breadcrumb:last-child {\n    color: #999999 ;\n}\n\n", ""]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
var _components$props$dat;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = (_components$props$dat = {
  components: {},
  props: {
    idciclo: String
  },
  data: function data() {
    return {
      usuario: global.user,

      fullPage: true,
      isLoading: false,

      fillpersona: { 'cedula': '', 'nombres': '', 'appaterno': '', 'apmaterno': '', 'celular': '', 'correo': '', 'direccion': '', 'estado': '', 'fecha_nacimiento': '', 'estado_civil': '', 'genero': '', 'tipo': '', 'idciclo': '', 'idusuario': '' },
      fillevaluacion: { 'id': '', 'nota_pic': '', 'nota_cf1': '', 'nota_cf2': '', 'nota_im1': '', 'nota_im2': '', 'nota_conducta': '' },
      btnregistrar: true,

      matriculas: [],
      datosciclo: [],
      edad: '',

      pagination: { 'total': 0, 'current_page': 0, 'per_page': 0, 'last_page': 0, 'from': 0, 'to': 0 },
      offset: 3,
      page: 1

    };
  }
}, _defineProperty(_components$props$dat, 'components', {
  Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
}), _defineProperty(_components$props$dat, 'computed', {

  isActived: function isActived() {
    return this.pagination.current_page;
  },
  pagesNumber: function pagesNumber() {
    if (!this.pagination.to) {
      return [];
    }

    var from = this.pagination.current_page - this.offset;

    if (from < 1) from = 1;

    var to = from + this.offset * 2;

    if (to >= this.pagination.last_page) to = this.pagination.last_page;

    var pagesArray = [];

    while (from <= to) {
      pagesArray.push(from);
      from++;
    }

    return pagesArray;
  }
}), _defineProperty(_components$props$dat, 'methods', {

  changePage: function changePage(page) {
    this.pagination.current_page = page;
    this.GetMatricula(page);
  },

  CalcularEdad: function CalcularEdad() {
    var fecha_nac = this.fillpersona.fecha_nacimiento;
    var nacimiento = moment(fecha_nac);
    var hoy = moment();
    var anios = hoy.diff(nacimiento, "years");
    this.edad = anios;

    if (anios >= 18 && anios <= 35) M.toast({ html: 'Edad Dentro de rango admisible', 'classes': 'teal lighten-1' });else M.toast({ html: 'Edad Incorrecto, No podra realizar el registro', 'classes': 'red' });
  },
  RegistrarNota: function RegistrarNota() {
    var _this = this;

    var url = '/registrarnotamatricula';
    axios.post(url, this.fillevaluacion).then(function (response) {
      M.toast({ html: 'Notas registrados', 'classes': 'teal lighten-1' });
      _this.GetMatricula(_this.page);
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  GetEvaluacion: function GetEvaluacion(idmatricula) {
    var _this2 = this;

    var url = '/getevaluacionmatricula';
    axios.post(url, {
      'idmatricula': idmatricula
    }).then(function (response) {
      console.log(response.data);
      var nota = response.data;
      _this2.fillevaluacion.id = nota[0]['id'];
      _this2.fillevaluacion.nota_pic = nota[0]['nota_pic'];
      _this2.fillevaluacion.nota_cf1 = nota[0]['nota_cf1'];
      _this2.fillevaluacion.nota_cf2 = nota[0]['nota_cf2'];
      _this2.fillevaluacion.nota_im1 = nota[0]['nota_im1'];
      _this2.fillevaluacion.nota_im2 = nota[0]['nota_im2'];
      _this2.fillevaluacion.nota_conducta = nota[0]['nota_conducta'];
      document.querySelector("label[for='notapic']").classList.add('active');
      document.querySelector("label[for='notacf1']").classList.add('active');
      document.querySelector("label[for='notacf2']").classList.add('active');
      document.querySelector("label[for='notaim1']").classList.add('active');
      document.querySelector("label[for='notaim2']").classList.add('active');
      document.querySelector("label[for='notaconducta']").classList.add('active');
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  GetMatricula: function GetMatricula(page) {
    var _this3 = this;

    var url = '/getmatricula?page=' + page + '&idciclo=' + this.idciclo;
    axios.get(url, {}).then(function (response) {
      console.log(response.data);
      _this3.matriculas = response.data.matriculas.data;
      _this3.pagination = response.data.pagination;
      M.toast({ html: 'Matriculas obtenido', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  NuevoPersona: function NuevoPersona() {
    var _this4 = this;

    this.fillpersona.idciclo = this.idciclo;
    this.fillpersona.idusuario = this.usuario.id;
    console.log(this.fillpersona);

    var url = '/nuevomatricula';
    axios.post(url, this.fillpersona).then(function (response) {
      console.log(response.data);
      if (response.data == 'repetido') {
        M.toast({ html: 'Ya Existe Matricula, No es posible duplicarlo.', 'classes': 'orange' });
        _this4.fillpersona.cedula = '';
        _this4.fillpersona.nombres = '';
        _this4.fillpersona.appaterno = '';
        _this4.fillpersona.apmaterno = '';
        _this4.fillpersona.celular = '';
        _this4.fillpersona.correo = '';
        _this4.fillpersona.direccion = '';
        _this4.fillpersona.estado = '';
        _this4.fillpersona.fecha_nacimiento = '';
        _this4.fillpersona.estado_civil = '';
        _this4.fillpersona.genero = '';
        _this4.fillpersona.tipo = '';
        _this4.fillpersona.titulo = false;
        _this4.fillpersona.nombretitulo = '';
      } else {

        _this4.fillpersona.cedula = '';
        _this4.fillpersona.nombres = '';
        _this4.fillpersona.appaterno = '';
        _this4.fillpersona.apmaterno = '';
        _this4.fillpersona.celular = '';
        _this4.fillpersona.correo = '';
        _this4.fillpersona.direccion = '';
        _this4.fillpersona.estado = '';
        _this4.fillpersona.fecha_nacimiento = '';
        _this4.fillpersona.estado_civil = '';
        _this4.fillpersona.genero = '';
        _this4.fillpersona.tipo = '';
        _this4.fillpersona.titulo = false;
        _this4.fillpersona.nombretitulo = '';

        _this4.GetMatricula(_this4.page);

        M.toast({ html: 'Matriculado Exitosamente', 'classes': 'teal lighten-1' });
      }
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  ConsultarPersona: function ConsultarPersona() {
    var _this5 = this;

    var url = '/consultarpersona';
    axios.post(url, {
      'cedula': this.fillpersona.cedula
    }).then(function (response) {
      if (response.data.length > 0) {
        var person = response.data[0];
        console.log(person);
        M.toast({ html: 'Persona Existe', 'classes': 'teal lighten-1' });
        _this5.fillpersona.nombres = person.nombres;
        _this5.fillpersona.appaterno = person.appaterno;
        _this5.fillpersona.apmaterno = person.apmaterno;
        _this5.fillpersona.celular = person.celular;
        _this5.fillpersona.correo = person.correo;
        _this5.fillpersona.direccion = person.direccion;
        _this5.fillpersona.fecha_nacimiento = person.fecha_nacimiento;
        _this5.fillpersona.estado_civil = person.estado_civil;
        _this5.fillpersona.genero = person.genero;
        _this5.fillpersona.tipo = person.tipo;
        _this5.fillpersona.nombretitulo = person.nombretitulo;

        document.querySelector("label[for='nombre']").classList.add('active');
        document.querySelector("label[for='apellido1']").classList.add('active');
        document.querySelector("label[for='apellido2']").classList.add('active');
        document.querySelector("label[for='celular']").classList.add('active');
        document.querySelector("label[for='correo']").classList.add('active');
        document.querySelector("label[for='direccion']").classList.add('active');
        document.querySelector("label[for='fnacimiento']").classList.add('active');
        document.querySelector("label[for='estadocivil']").classList.add('active');
        document.querySelector("label[for='genero']").classList.add('active');

        _this5.btnregistrar = true;
        _this5.CalcularEdad();
      } else {
        M.toast({ html: 'No Existe Persona, Llenar formulario', 'classes': 'blue' });
        _this5.btnregistrar = true;
      }
    }).catch(function (error) {
      _this5.errors = error.response;
      console.log(error.response);
    });
  },


  moment: function (_moment) {
    function moment() {
      return _moment.apply(this, arguments);
    }

    moment.toString = function () {
      return _moment.toString();
    };

    return moment;
  }(function () {
    return moment();
  })

}), _defineProperty(_components$props$dat, 'mounted', function mounted() {

  M.AutoInit();
  this.GetMatricula(this.page);
  //  this.GetDatosCiclo();


  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });
}), _components$props$dat);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col s12", staticStyle: { padding: "5px" } }, [
        _c("div", [
          _c(
            "div",
            { staticClass: "col s12" },
            [
              _c(
                "router-link",
                { staticClass: "breadcrumb", attrs: { to: "/promociones" } },
                [_vm._v("Promociones")]
              ),
              _vm._v(" "),
              _c("a", { staticClass: "breadcrumb" }, [_vm._v("Matriculados")])
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn btn-small teal lighten-1   modal-trigger",
            attrs: { "data-target": "mdlnuevomatricula" }
          },
          [_vm._v("Nuevo")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn btn-small blue-grey lighten-1",
            on: {
              click: function($event) {
                _vm.GetMatricula(_vm.page)
              }
            }
          },
          [_vm._v(" Recargar")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c("table", { staticClass: "striped responsive-table" }, [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.matriculas, function(matricula) {
              return _c("tr", [
                _c("td", [
                  _vm._v(
                    "\n              " +
                      _vm._s(matricula.cedula) +
                      "\n            "
                  )
                ]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(
                    "\n              " +
                      _vm._s(
                        matricula.nombres +
                          " , " +
                          matricula.appaterno +
                          " " +
                          matricula.apmaterno
                      ) +
                      "\n            "
                  )
                ]),
                _vm._v(" "),
                _c("td", [
                  matricula.estadomatricula == "A"
                    ? _c("strong", { staticClass: "green-text" }, [
                        _vm._v("Activo")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  matricula.estadomatricula == "I"
                    ? _c("strong", { staticClass: "orange-text" }, [
                        _vm._v("Archivado")
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c(
                      "router-link",
                      {
                        staticClass:
                          "waves-effect waves-green btn-small btn  light-blue darken-4",
                        attrs: {
                          to:
                            "/modulomatricula/" +
                            _vm.idciclo +
                            "/" +
                            matricula.idmatricula
                        }
                      },
                      [_vm._v("Modulos")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "waves-effect waves-green btn-small btn teal lighten-1 modal-trigger",
                        attrs: { "data-target": "mdlevaluar" },
                        on: {
                          click: function($event) {
                            _vm.GetEvaluacion(matricula.idmatricula)
                          }
                        }
                      },
                      [_vm._v(" Evaluar")]
                    )
                  ],
                  1
                )
              ])
            })
          )
        ]),
        _vm._v(" "),
        _c(
          "ul",
          { staticClass: "pagination" },
          [
            _vm.pagination.current_page > 1
              ? _c("li", [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.changePage(_vm.pagination.current_page - 1)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons" }, [
                        _vm._v("chevron_left")
                      ])
                    ]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.pagesNumber, function(page) {
              return _c(
                "li",
                { class: [page == _vm.isActived ? "active" : ""] },
                [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.changePage(page)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                " + _vm._s(page) + "\n              "
                      )
                    ]
                  )
                ]
              )
            }),
            _vm._v(" "),
            _vm.pagination.current_page < _vm.pagination.last_page
              ? _c("li", { staticClass: "waves-effect" }, [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.changePage(_vm.pagination.current_page + 1)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons" }, [
                        _vm._v("chevron_right")
                      ])
                    ]
                  )
                ])
              : _vm._e()
          ],
          2
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevomatricula" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s3" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.cedula,
                  expression: "fillpersona.cedula"
                }
              ],
              staticClass: "validate",
              attrs: { id: "cedula", type: "text", maxlength: "10" },
              domProps: { value: _vm.fillpersona.cedula },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "cedula", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(2)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s1" }, [
            _vm.fillpersona.cedula.length == 10
              ? _c(
                  "button",
                  {
                    staticClass:
                      "waves-effect waves-light btn btn-floating btn-small blue",
                    on: { click: _vm.ConsultarPersona }
                  },
                  [
                    _c("i", { staticClass: "material-icons left" }, [
                      _vm._v("search")
                    ])
                  ]
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l8 m8" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.nombres,
                  expression: "fillpersona.nombres"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nombre", type: "text" },
              domProps: { value: _vm.fillpersona.nombres },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "nombres", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(3)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l6 m6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.appaterno,
                  expression: "fillpersona.appaterno"
                }
              ],
              staticClass: "validate",
              attrs: { id: "apellido1", type: "text" },
              domProps: { value: _vm.fillpersona.appaterno },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "appaterno", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(4)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l6 m6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.apmaterno,
                  expression: "fillpersona.apmaterno"
                }
              ],
              staticClass: "validate",
              attrs: { id: "apellido2", type: "text" },
              domProps: { value: _vm.fillpersona.apmaterno },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "apmaterno", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(5)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l3 m3" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.fecha_nacimiento,
                  expression: "fillpersona.fecha_nacimiento"
                }
              ],
              staticClass: "validate",
              attrs: { id: "fnacimiento", type: "date" },
              domProps: { value: _vm.fillpersona.fecha_nacimiento },
              on: {
                change: _vm.CalcularEdad,
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillpersona,
                    "fecha_nacimiento",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(6)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l3 m3" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillpersona.genero,
                    expression: "fillpersona.genero"
                  }
                ],
                staticClass: "browser-default",
                attrs: { id: "genero" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.fillpersona,
                      "genero",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "F" } }, [_vm._v("Femenino")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "M" } }, [_vm._v("Masculino")])
              ]
            ),
            _vm._v(" "),
            _vm._m(7)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l3 m3" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillpersona.estado_civil,
                    expression: "fillpersona.estado_civil"
                  }
                ],
                staticClass: "browser-default",
                attrs: { id: "estadocivil" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.fillpersona,
                      "estado_civil",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "S" } }, [
                  _vm._v("Soltero (a)")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "C" } }, [_vm._v("Casado (a)")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "D" } }, [
                  _vm._v("Divorciado (a)")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "V" } }, [_vm._v("Viudo (a)")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "UL" } }, [_vm._v("U. Libre")])
              ]
            ),
            _vm._v(" "),
            _vm._m(8)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l3 m3" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.celular,
                  expression: "fillpersona.celular"
                }
              ],
              staticClass: "validate",
              attrs: { id: "celular", type: "text" },
              domProps: { value: _vm.fillpersona.celular },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "celular", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(9)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l6 m6" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.correo,
                  expression: "fillpersona.correo"
                }
              ],
              staticClass: "validate",
              attrs: { id: "correo", type: "email" },
              domProps: { value: _vm.fillpersona.correo },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "correo", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "correo" } }, [
              _vm._v("Correo Electronico")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l4 m4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillpersona.direccion,
                  expression: "fillpersona.direccion"
                }
              ],
              staticClass: "validate",
              attrs: { id: "direccion", type: "text" },
              domProps: { value: _vm.fillpersona.direccion },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillpersona, "direccion", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(10)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillpersona.cedula != "" &&
        _vm.fillpersona.nombres != "" &&
        _vm.fillpersona.appaterno != "" &&
        _vm.fillpersona.apmaterno != "" &&
        _vm.fillpersona.celular != "" &&
        _vm.fillpersona.correo != "" &&
        _vm.fillpersona.direccion != "" &&
        _vm.fillpersona.fecha_nacimiento != "" &&
        _vm.fillpersona.estado_civil != "" &&
        _vm.fillpersona.genero != "" &&
        _vm.btnregistrar == true &&
        _vm.fillpersona.cedula.length == 10 &&
        (this.edad >= 18 && this.edad <= 35)
          ? _c(
              "button",
              {
                staticClass:
                  "waves-effect waves-light btn   teal lighten-1 accent-4 btn modal-close",
                on: { click: _vm.NuevoPersona }
              },
              [_vm._v("Matricular")]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._m(11)
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlevaluar" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(12),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.nota_pic,
                  expression: "fillevaluacion.nota_pic"
                }
              ],
              staticClass: "validate",
              attrs: { id: "notapic", type: "number" },
              domProps: { value: _vm.fillevaluacion.nota_pic },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillevaluacion, "nota_pic", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(13)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.nota_cf1,
                  expression: "fillevaluacion.nota_cf1"
                }
              ],
              staticClass: "validate",
              attrs: { id: "notacf1", type: "number" },
              domProps: { value: _vm.fillevaluacion.nota_cf1 },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillevaluacion, "nota_cf1", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(14)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.nota_cf2,
                  expression: "fillevaluacion.nota_cf2"
                }
              ],
              staticClass: "validate",
              attrs: { id: "notacf2", type: "number" },
              domProps: { value: _vm.fillevaluacion.nota_cf2 },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillevaluacion, "nota_cf2", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(15)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.nota_im1,
                  expression: "fillevaluacion.nota_im1"
                }
              ],
              staticClass: "validate",
              attrs: { id: "notaim1", type: "number" },
              domProps: { value: _vm.fillevaluacion.nota_im1 },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillevaluacion, "nota_im1", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(16)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.nota_im2,
                  expression: "fillevaluacion.nota_im2"
                }
              ],
              staticClass: "validate",
              attrs: { id: "notaim2", type: "number" },
              domProps: { value: _vm.fillevaluacion.nota_im2 },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillevaluacion, "nota_im2", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(17)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.nota_conducta,
                  expression: "fillevaluacion.nota_conducta"
                }
              ],
              staticClass: "validate",
              attrs: { id: "notaconducta", type: "number" },
              domProps: { value: _vm.fillevaluacion.nota_conducta },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillevaluacion,
                    "nota_conducta",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(18)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close",
            on: { click: _vm.RegistrarNota }
          },
          [_vm._v("Registrar")]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Cedula")]),
      _vm._v(" "),
      _c("th", [_vm._v("Especialista")]),
      _vm._v(" "),
      _c("th", [_vm._v("Estado")]),
      _vm._v(" "),
      _c("th", [_vm._v("Acciones")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("REGISTRO MATRICULA")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "cedula" } }, [
      _vm._v("CEDULA "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nombre" } }, [
      _vm._v("Nombres "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "apellido1" } }, [
      _vm._v("Apellido Pateno "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "apellido2" } }, [
      _vm._v("Apellido Materno "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "fnacimiento" } }, [
      _vm._v("F.Nacimiento "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "active", attrs: { for: "genero" } }, [
      _vm._v("Genero "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "estadocivil" } },
      [
        _vm._v("Estado Civil "),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "celular" } }, [
      _vm._v("Celular "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "direccion" } }, [
      _vm._v("Dirección "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect waves-green btn-flat" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("Salir")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("EVALUAR A ESPECIALISTA")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "notapic" } }, [
      _vm._v("PIC "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "notacf1" } }, [
      _vm._v("Condición Fisica #1 "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "notacf2" } }, [
      _vm._v("Condición Fisica #2 "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "notaim1" } }, [
      _vm._v("Instrucción Militar #1"),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "notaim2" } }, [
      _vm._v("Instrucción Militar #2"),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "notaconducta" } }, [
      _vm._v("Conducta"),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4c884168", module.exports)
  }
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(77)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(79)
/* template */
var __vue_template__ = __webpack_require__(80)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/AsignarCursoComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dcbd4892", Component.options)
  } else {
    hotAPI.reload("data-v-dcbd4892", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(78);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("3a72065a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dcbd4892\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AsignarCursoComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dcbd4892\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AsignarCursoComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.pagination li.active {\n  background-color: rgb(0,128,128);\n}\n.breadcrumb:before {\n  color: #999999;\n}\n.breadcrumb {\n  font-size: 18px;\n  color: #999999;\n}\n.breadcrumb:before {\n  color: #999999;\n}\n.breadcrumb:last-child {\n    color: #999999 ;\n}\n", ""]);

// exports


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
var _components$props$dat;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = (_components$props$dat = {
  components: {},
  props: {
    idpromocion: String,
    idciclo: String
  },
  data: function data() {
    return {
      usuario: global.user,
      fullPage: true,
      isLoading: false,
      cursos: [],
      asignados: [],
      docentes: [],
      fillcurso: { 'id': '', 'curso': '', 'iddocente': '', 'active': false, 'idusuario': '', 'idca': '' },

      fillhorario: { 'idcurso': '', 'dia': '', 'inicio': '', 'termino': '', 'idusuario': '' },

      horarios: [],
      datosciclo: [],

      pagination: { 'total': 0, 'current_page': 0, 'per_page': 0, 'last_page': 0, 'from': 0, 'to': 0 },
      offset: 3,
      page: 1,
      idhorario: '',
      tipoevaluacion: [],
      idtipoevaluacion: '',
      evaluaciones: [],
      idmateria: ''

    };
  }
}, _defineProperty(_components$props$dat, 'components', {
  Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
}), _defineProperty(_components$props$dat, 'computed', {

  isActived: function isActived() {
    return this.pagination.current_page;
  },
  pagesNumber: function pagesNumber() {
    if (!this.pagination.to) {
      return [];
    }

    var from = this.pagination.current_page - this.offset;

    if (from < 1) from = 1;

    var to = from + this.offset * 2;

    if (to >= this.pagination.last_page) to = this.pagination.last_page;

    var pagesArray = [];

    while (from <= to) {
      pagesArray.push(from);
      from++;
    }

    return pagesArray;
  }
}), _defineProperty(_components$props$dat, 'methods', {
  changePage: function changePage(page) {
    this.pagination.current_page = page;
    this.GetCursos(page);
  },
  RegistrarEvaluacion: function RegistrarEvaluacion() {
    var url = '/registrarevaluacion';
    axios.post(url, {
      'idmateria_ciclo': this.idmateria,
      'idciclo': this.idciclo,
      'id_tipo_nota': this.idtipoevaluacion,
      'idusuario': this.usuario.id
    }).then(function (response) {
      M.toast({ html: 'Evaluación Registrado', 'classes': 'green' });
      M.toast({ html: 'Evaluación Asignado', 'classes': 'blue' });
    }).catch(function (error) {
      console.log(error.response);
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetEvaluaciones: function GetEvaluaciones(idmateria_ciclo) {
    var _this = this;

    this.idmateria = idmateria_ciclo;
    var url = '/getevaluacion';
    axios.post(url, {
      'idmateria_ciclo': idmateria_ciclo
    }).then(function (response) {
      _this.evaluaciones = response.data;
      console.log(_this.evaluaciones);
    }).catch(function (error) {
      console.log(error.response);
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetTipoEvaluacion: function GetTipoEvaluacion() {
    var _this2 = this;

    var url = '/gettypeevaluacion';
    axios.post(url, {
      'idciclo': this.idciclo
    }).then(function (response) {
      _this2.tipoevaluacion = response.data;
      console.log(_this2.tipoevaluacion);
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetDatosCiclo: function GetDatosCiclo() {
    var _this3 = this;

    var url = '/getdatoscicloacademico';
    axios.post(url, {
      'idciclo': this.idciclo
    }).then(function (response) {
      _this3.datosciclo = response.data;
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  Limpiar: function Limpiar(id, horario) {
    this.fillhorario.idcurso = id;
    this.fillhorario.dia = '';
    this.fillhorario.inicio = '';
    this.fillhorario.termino = '';
    this.horarios = horario;
  },
  RegistrarHorario: function RegistrarHorario() {
    var _this4 = this;

    this.fillhorario.idusuario = this.usuario.id;

    var url = '/registrarhorario';
    axios.post(url, this.fillhorario).then(function (response) {

      _this4.fillhorario.dia = '';
      _this4.fillhorario.inicio = '';
      _this4.fillhorario.termino = '';
      _this4.fillhorario.idcurso = '';
      _this4.GetCursoDocente();
      _this4.GetCursos(_this4.page);

      M.toast({ html: 'Horario Registrado', 'classes': 'green' });
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetCursos: function GetCursos(page) {
    var _this5 = this;

    var url = '/getcursosasignados?page=' + page + '&idciclo=' + this.idciclo;
    axios.get(url).then(function (response) {

      _this5.asignados = response.data.cursos;

      _this5.pagination = response.data.pagination;
      M.toast({ html: 'Curso obtenidos', 'classes': 'blue' });
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  AsignarCursoDocente: function AsignarCursoDocente() {
    var _this6 = this;

    this.fillcurso.idusuario = this.usuario.id;
    this.fillcurso.idca = this.idciclo;
    var url = '/asignardocentecurso';
    axios.post(url, this.fillcurso).then(function (response) {
      _this6.GetCursoDocente();
      _this6.GetCursos();
      M.toast({ html: 'Curso Asignado', 'classes': 'green' });
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  SelectCurso: function SelectCurso(curso) {
    this.fillcurso.id = curso.id;
    this.fillcurso.curso = curso.nombre;
    this.fillcurso.active = true;
  },
  GetCursoDocente: function GetCursoDocente() {
    var _this7 = this;

    var url = '/getreferencialcursodocente';
    axios.post(url, {
      'idciclo': this.idciclo
    }).then(function (response) {
      var valores = response.data;
      _this7.cursos = valores[0];
      _this7.docentes = valores[1];
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },


  moment: function (_moment) {
    function moment() {
      return _moment.apply(this, arguments);
    }

    moment.toString = function () {
      return _moment.toString();
    };

    return moment;
  }(function () {
    return moment();
  })

}), _defineProperty(_components$props$dat, 'mounted', function mounted() {

  M.AutoInit();
  this.GetCursoDocente();
  this.GetCursos(this.page);
  this.GetDatosCiclo();
  this.GetTipoEvaluacion();

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });
}), _components$props$dat);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col s12", staticStyle: { padding: "5px" } }, [
        _c("div", [
          _c(
            "div",
            { staticClass: "col s12" },
            [
              _c(
                "router-link",
                { staticClass: "breadcrumb", attrs: { to: "/promociones" } },
                [_vm._v("Promociones")]
              ),
              _vm._v(" "),
              _c(
                "router-link",
                {
                  staticClass: "breadcrumb",
                  attrs: { to: "/cicloacademico/" + _vm.idpromocion }
                },
                [_vm._v("Ciclos Academicos")]
              ),
              _vm._v(" "),
              _c("a", { staticClass: "breadcrumb" }, [
                _vm._v("Configurar Asignaturas")
              ])
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "col s6 l12 m12",
          staticStyle: { "text-align": "right" }
        },
        [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass:
                "waves-effect waves-light btn btn-small  blue-grey lighten-1",
              on: { click: _vm.GetCursos }
            },
            [
              _c("i", { staticClass: "material-icons left" }, [_vm._v("sync")]),
              _vm._v(" Recargar")
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l3 m3" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-content" }, [
            _c(
              "div",
              { staticClass: "row" },
              [
                _c("center", [
                  _vm.datosciclo.length == 0
                    ? _c(
                        "div",
                        { staticClass: "preloader-wrapper small active" },
                        [
                          _c(
                            "div",
                            { staticClass: "spinner-layer spinner-green-only" },
                            [
                              _c(
                                "div",
                                { staticClass: "circle-clipper left" },
                                [_c("div", { staticClass: "circle" })]
                              ),
                              _c("div", { staticClass: "gap-patch" }, [
                                _c("div", { staticClass: "circle" })
                              ]),
                              _c(
                                "div",
                                { staticClass: "circle-clipper right" },
                                [_c("div", { staticClass: "circle" })]
                              )
                            ]
                          )
                        ]
                      )
                    : _vm._e()
                ]),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("strong", [_vm._v("Promoción")])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.datosciclo[0]["promocion"]["nombre"]))
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("strong", [_vm._v("Especialidad")])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("label", [
                        _vm._v(
                          _vm._s(_vm.datosciclo[0]["especialidad"]["nombre"])
                        )
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("strong", [_vm._v("Tipo Estudiante")])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("label", [
                        _vm._v(
                          _vm._s(_vm.datosciclo[0]["tipo_estudiante"]["nombre"])
                        )
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("strong", [_vm._v("División")])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.datosciclo[0]["division"]["nombre"]))
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("strong", [_vm._v("Grado")])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("label", [
                        _vm._v(
                          _vm._s(
                            _vm.datosciclo[0]["tipo_estudiante"]["siglas"] +
                              _vm.datosciclo[0]["anio_academico"]["siglas"]
                          )
                        )
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("strong", [_vm._v("Duración")])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.datosciclo.length > 0
                  ? _c("div", { staticClass: "col s12 l6 m6" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.datosciclo[0]["periodo"]["nombre"]))
                      ])
                    ])
                  : _vm._e()
              ],
              1
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l9 m9" }, [
        _c("table", { staticStyle: { "font-size": "12px" } }, [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.asignados, function(asignado) {
              return _c("tr", [
                _c("td", {
                  domProps: { textContent: _vm._s(asignado.materia) }
                }),
                _vm._v(" "),
                _c("td", {
                  domProps: { textContent: _vm._s(asignado.docente) }
                }),
                _vm._v(" "),
                _c("td", [
                  _c(
                    "button",
                    {
                      staticClass:
                        "waves-effect waves-green btn light-blue darken-4  btn-small modal-trigger",
                      attrs: { "data-target": "mdlhorario" },
                      on: {
                        click: function($event) {
                          _vm.Limpiar(asignado.id, asignado.horario)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons left" }, [
                        _vm._v("event")
                      ]),
                      _vm._v("Horario")
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass:
                        "waves-effect waves-green btn btn-small blue modal-trigger",
                      attrs: { "data-target": "mdlnewevaluacion" },
                      on: {
                        click: function($event) {
                          _vm.GetEvaluaciones(asignado.id)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons left" }, [
                        _vm._v("control_point_duplicate")
                      ]),
                      _vm._v(" Evaluacion")
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass:
                        "waves-effect waves-green btn btn-small green",
                      attrs: {
                        href:
                          "/actanotaspdf/" + asignado.id + "/" + _vm.idciclo,
                        target: "blank"
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons" }, [
                        _vm._v("assignment_turned_in")
                      ]),
                      _vm._v(" Notas")
                    ]
                  )
                ])
              ])
            })
          )
        ]),
        _vm._v(" "),
        _c(
          "ul",
          { staticClass: "pagination" },
          [
            _vm.pagination.current_page > 1
              ? _c("li", [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.changePage(_vm.pagination.current_page - 1)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons" }, [
                        _vm._v("chevron_left")
                      ])
                    ]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.pagesNumber, function(page) {
              return _c(
                "li",
                { class: [page == _vm.isActived ? "active" : ""] },
                [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.changePage(page)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                " + _vm._s(page) + "\n              "
                      )
                    ]
                  )
                ]
              )
            }),
            _vm._v(" "),
            _vm.pagination.current_page < _vm.pagination.last_page
              ? _c("li", { staticClass: "waves-effect" }, [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.changePage(_vm.pagination.current_page + 1)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons" }, [
                        _vm._v("chevron_right")
                      ])
                    ]
                  )
                ])
              : _vm._e()
          ],
          2
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevohijo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col s12 l6 m6" }, [
            _c(
              "table",
              { staticClass: "table", staticStyle: { "font-size": "12px" } },
              [
                _vm._m(2),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.cursos, function(curso, index) {
                    return _c("tr", [
                      _c("td", [_vm._v(_vm._s(index + 1))]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(curso.nombre) +
                            "\n                    "
                        ),
                        _c("br"),
                        _vm._v(" "),
                        curso.docente != "ninguno"
                          ? _c("label", [_vm._v(_vm._s(curso.docente))])
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        curso.asignado == 0
                          ? _c(
                              "button",
                              {
                                staticClass:
                                  "waves-effect waves-green btn-floating btn blue",
                                on: {
                                  click: function($event) {
                                    _vm.SelectCurso(curso)
                                  }
                                }
                              },
                              [
                                _c(
                                  "i",
                                  { staticClass: "material-icons left" },
                                  [_vm._v("check")]
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        curso.asignado == 1
                          ? _c(
                              "button",
                              {
                                staticClass:
                                  "waves-effect waves-green btn-floating btn blue",
                                attrs: { disabled: "" }
                              },
                              [
                                _c(
                                  "i",
                                  { staticClass: "material-icons left" },
                                  [_vm._v("attach_file")]
                                )
                              ]
                            )
                          : _vm._e()
                      ])
                    ])
                  })
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l6 m6" }, [
            _c("div", { staticClass: "row" }, [
              _c("h4", [_vm._v("ASIGNAR DOCENTE")]),
              _vm._v(" "),
              _c("div", { staticClass: "col s12 m12 l12" }, [
                _c("strong", [_vm._v("Curso:")]),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(_vm.fillcurso.curso))])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col s12 m12 l12" }, [
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.fillcurso.iddocente,
                        expression: "fillcurso.iddocente"
                      }
                    ],
                    staticClass: "browser-default",
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.$set(
                          _vm.fillcurso,
                          "iddocente",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { selected: "", disabled: "" } }, [
                      _vm._v("Seleccionar Docente")
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.docentes, function(docente) {
                      return _c("option", { domProps: { value: docente.id } }, [
                        _vm._v(_vm._s(docente.nombre))
                      ])
                    })
                  ],
                  2
                ),
                _vm._v(" "),
                _c("label", [_vm._v("Docente")])
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col s12 m12 l12" },
                [
                  _c("center", [
                    _vm.fillcurso.active == true &&
                    _vm.fillcurso.iddocente != ""
                      ? _c(
                          "button",
                          {
                            staticClass: "waves-effect waves-green btn indigo",
                            on: { click: _vm.AsignarCursoDocente }
                          },
                          [
                            _c("i", { staticClass: "material-icons left" }, [
                              _vm._v("assignment_turned_in")
                            ]),
                            _vm._v("Asignar Curso Docente")
                          ]
                        )
                      : _vm._e()
                  ])
                ],
                1
              )
            ])
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlhorario" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("h5", [_vm._v("Horario")]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col s12 l4 m4" }, [
            _c("div", { staticClass: "input-field" }, [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fillhorario.dia,
                      expression: "fillhorario.dia"
                    }
                  ],
                  staticClass: "browser-default",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.fillhorario,
                        "dia",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "LUNES" } }, [
                    _vm._v("Lunes")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "MARTES" } }, [
                    _vm._v("Martes")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "MIERCOLES" } }, [
                    _vm._v("Miercorles")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "JUEVES" } }, [
                    _vm._v("Jueves")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "VIERNES" } }, [
                    _vm._v("Viernes")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "SABADO" } }, [
                    _vm._v("Sabado")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "DOMINGO" } }, [
                    _vm._v("Domingo")
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Día")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l4 m4" }, [
            _c("div", { staticClass: "input-field" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillhorario.inicio,
                    expression: "fillhorario.inicio"
                  }
                ],
                attrs: { type: "time" },
                domProps: { value: _vm.fillhorario.inicio },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.fillhorario, "inicio", $event.target.value)
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Inicio")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l4 m4" }, [
            _c("div", { staticClass: "input-field" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillhorario.termino,
                    expression: "fillhorario.termino"
                  }
                ],
                attrs: { type: "time" },
                domProps: { value: _vm.fillhorario.termino },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.fillhorario, "termino", $event.target.value)
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Término")]
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col s12 l12 m12" },
            [
              _c("center", [
                _vm.fillhorario.dia != "" &&
                _vm.fillhorario.inicio != "" &&
                _vm.fillhorario.termino != ""
                  ? _c(
                      "button",
                      {
                        staticClass:
                          "waves-effect waves-green btn teal lighten-1 modal-close",
                        on: { click: _vm.RegistrarHorario }
                      },
                      [
                        _c("i", { staticClass: "material-icons left" }, [
                          _vm._v("save")
                        ]),
                        _vm._v("Registrar Horario ")
                      ]
                    )
                  : _vm._e()
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 m12 l12" }, [
            _c("table", [
              _vm._m(3),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.horarios, function(horario) {
                  return _c("tr", [
                    _c("td", [_vm._v(_vm._s(horario.dia))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(horario.inicio))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(horario.termino))])
                  ])
                })
              )
            ]),
            _vm._v(" "),
            _vm.horarios.length == 0
              ? _c("label", [_vm._v("Ningun horario")])
              : _vm._e()
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnewevaluacion" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "row" }, [
          _c("h4", [_vm._v("Aperturar Evaluación")]),
          _vm._v(" "),
          _vm._m(4),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l6 m6" }, [
            _c("div", { staticClass: "input-field" }, [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.idtipoevaluacion,
                      expression: "idtipoevaluacion"
                    }
                  ],
                  staticClass: "browser-default",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.idtipoevaluacion = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                _vm._l(_vm.tipoevaluacion, function(tipo) {
                  return _c("option", { domProps: { value: tipo.id } }, [
                    _vm._v(_vm._s(tipo.nombre))
                  ])
                })
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "helper-text",
                  attrs: { "data-error": "wrong", "data-success": "right" }
                },
                [_vm._v("Tipo Evaluación")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l6 m6" }, [
            _c("div", { staticClass: "input-field" }, [
              _vm.idtipoevaluacion != ""
                ? _c(
                    "button",
                    {
                      staticClass:
                        "waves-effect waves-green btn teal lighten-1 btn-small",
                      on: { click: _vm.RegistrarEvaluacion }
                    },
                    [
                      _c("i", { staticClass: "material-icons left" }, [
                        _vm._v("save")
                      ]),
                      _vm._v("Registrar Evaluacion ")
                    ]
                  )
                : _vm._e()
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l12 m12" }, [
            _c("h5", [_vm._v("Evaluaciones")]),
            _vm._v(" "),
            _c(
              "table",
              { staticClass: "striped", staticStyle: { "font-size": "11px" } },
              [
                _vm._m(5),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.evaluaciones, function(evaluacion) {
                    return _c("tr", [
                      _c("td", [_vm._v(_vm._s(evaluacion.tipo_nota.nombre))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(evaluacion.fecha_registro))]),
                      _vm._v(" "),
                      _c("td", [
                        evaluacion.estado == "A"
                          ? _c("strong", { staticClass: "green-text" }, [
                              _vm._v("Activo")
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        evaluacion.estado == "I"
                          ? _c("strong", { staticClass: "orange-text" }, [
                              _vm._v("Inactivo")
                            ])
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c("td")
                    ])
                  })
                )
              ]
            ),
            _vm._v(" "),
            _vm.evaluaciones.length == 0
              ? _c("label", [_vm._v("Ninguna Evaluación")])
              : _vm._e()
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass:
          "waves-effect waves-light btn  teal lighten-1 btn-small  modal-trigger",
        attrs: { "data-target": "mdlnuevohijo" }
      },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("book")]),
        _vm._v(" Definir Asignatura")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Asignatura")]),
      _vm._v(" "),
      _c("th", [_vm._v("Docente responsable")]),
      _vm._v(" "),
      _c("th", [_vm._v("Opc")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("#")]),
      _vm._v(" "),
      _c("th", [_vm._v("Asignatura")]),
      _vm._v(" "),
      _c("th")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Día")]),
      _vm._v(" "),
      _c("th", [_vm._v("Inicio")]),
      _vm._v(" "),
      _c("th", [_vm._v("Termino")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l12 m12" }, [
      _c("label", [
        _vm._v(
          "Se asignará la evaluacion a todos los estudiantes de la asigantura."
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Evalución")]),
      _vm._v(" "),
      _c("th", [_vm._v("Fecha Aperturado")]),
      _vm._v(" "),
      _c("th", [_vm._v("Estado")]),
      _vm._v(" "),
      _c("th")
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-dcbd4892", module.exports)
  }
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(82)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(84)
/* template */
var __vue_template__ = __webpack_require__(85)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/EvaluarEstudianteComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e7d802c", Component.options)
  } else {
    hotAPI.reload("data-v-6e7d802c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(83);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("0cbeb8fc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6e7d802c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./EvaluarEstudianteComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6e7d802c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./EvaluarEstudianteComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\ncolor: #999999;\n}\n.breadcrumb {\n  font-size: 18px;\n  color: #999999;\n}\n.breadcrumb:before {\n    color: #999999;\n}\n.breadcrumb:last-child {\n  color: #999999 ;\n}\n", ""]);

// exports


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
var _components$props$dat;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = (_components$props$dat = {
  components: {},

  props: {
    idpromocion: String,
    idciclo: String,
    idmatricula: String,
    idasignatura: String
  },
  data: function data() {
    return _defineProperty({
      usuario: global.user,

      fullPage: true,
      isLoading: false,
      fillnota: { 't1': '', 't2': '', 't3': '', 't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 't11': '', 't12': '', 't13': '', 't14': '', 't15': '', 'p1': '', 'p2': '', 'p3': '', 'p4': '', 'p5': '', 'p6': '', 'p7': '', 'p8': '', 'p9': '', 'p10': '', 'p11': '', 'p12': '', 'p13': '', 'p14': '', 'p15': '', 'examenfinal': '', 'supletorio': '' },
      notas: [],
      datosciclo: [],
      datosasignatura: [{ 'nombremateria': '', 'nombredocente': '' }],
      datosestudiante: []
    }, 'fillnota', []);
  }
}, _defineProperty(_components$props$dat, 'components', {
  Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
}), _defineProperty(_components$props$dat, 'methods', {
  RegistrarNota: function RegistrarNota(idnota, value) {
    var _this = this;

    var url = '/registrarnota';
    axios.post(url, {
      'idnota': idnota,
      'nota': value
    }).then(function (response) {

      _this.GetNotas();
      _this.notas = response.data;
      M.toast({ html: 'Evaluaciones Registrado', 'classes': 'green' });
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetNotas: function GetNotas() {
    var _this2 = this;

    var url = '/getnotas';
    axios.post(url, {
      'idcurso': this.idasignatura,
      'idmatricula': this.idmatricula

    }).then(function (response) {

      _this2.notas = response.data;

      for (var i = 0; i < _this2.notas.length; i++) {
        _this2.fillnota[i] = _this2.notas[i]['nota'];
      }
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetDatosAsignatura: function GetDatosAsignatura() {
    var _this3 = this;

    var url = '/getdatosasignatura';
    axios.post(url, { 'idasignatura': this.idasignatura }).then(function (response) {

      _this3.datosasignatura = response.data;
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetDatosEstudiante: function GetDatosEstudiante() {
    var _this4 = this;

    var url = '/getdatosestudiantematricula';
    axios.post(url, { 'idmatricula': this.idmatricula }).then(function (response) {

      _this4.datosestudiante = response.data;
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },
  GetDatosCiclo: function GetDatosCiclo() {
    var _this5 = this;

    var url = '/getdatoscicloacademico';
    axios.post(url, {
      'idciclo': this.idciclo
    }).then(function (response) {

      _this5.datosciclo = response.data;
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },

  moment: function (_moment) {
    function moment() {
      return _moment.apply(this, arguments);
    }

    moment.toString = function () {
      return _moment.toString();
    };

    return moment;
  }(function () {
    return moment();
  })

}), _defineProperty(_components$props$dat, 'mounted', function mounted() {

  M.AutoInit();
  this.GetNotas();
  this.GetDatosCiclo();
  this.GetDatosEstudiante();
  this.GetDatosAsignatura();

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });
}), _defineProperty(_components$props$dat, 'computed', {}), _components$props$dat);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c(
        "div",
        { staticClass: "col s12" },
        [
          _c(
            "router-link",
            { staticClass: "breadcrumb", attrs: { to: "/promociones" } },
            [_vm._v("Promociones")]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "breadcrumb",
              attrs: { to: "/cicloacademico/" + _vm.idpromocion }
            },
            [_vm._v("Ciclos Academicos")]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "breadcrumb",
              attrs: {
                to: "/matricular/" + _vm.idpromocion + "/" + _vm.idciclo
              }
            },
            [_vm._v("Matriculados")]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "breadcrumb",
              attrs: {
                to:
                  "/asignaturacargo/" +
                  _vm.idpromocion +
                  "/" +
                  _vm.idciclo +
                  "/" +
                  _vm.idmatricula
              }
            },
            [_vm._v("Asignaturas")]
          ),
          _vm._v(" "),
          _c("a", { staticClass: "breadcrumb" }, [_vm._v("Evaluar")])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col s12 l3 m3" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-content" }, [
                _c("span", { staticClass: "card-title" }, [
                  _vm._v("Datos de Estudiante")
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "row" },
                  [
                    _c("center", [
                      _vm.datosciclo.length == 0
                        ? _c(
                            "div",
                            { staticClass: "preloader-wrapper small active" },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "spinner-layer spinner-green-only"
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "circle-clipper left" },
                                    [_c("div", { staticClass: "circle" })]
                                  ),
                                  _c("div", { staticClass: "gap-patch" }, [
                                    _c("div", { staticClass: "circle" })
                                  ]),
                                  _c(
                                    "div",
                                    { staticClass: "circle-clipper right" },
                                    [_c("div", { staticClass: "circle" })]
                                  )
                                ]
                              )
                            ]
                          )
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l12 m12" }, [
                          _c("strong", [_vm._v("Estudiante")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l12 m12" }, [
                          _c("label", [
                            _vm._v(
                              _vm._s(
                                _vm.datosestudiante[0]["nombres"] +
                                  "," +
                                  _vm.datosestudiante[0]["appaterno"] +
                                  " " +
                                  _vm.datosestudiante[0]["apmaterno"]
                              )
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Cedula")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(_vm._s(_vm.datosestudiante[0]["cedula"]))
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Cod Matricula")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(
                              _vm._s(_vm.datosestudiante[0]["codigomatricula"])
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._m(0),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Asignatura")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(_vm._s(_vm.datosasignatura[0].nombremateria))
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Docente")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosestudiante.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(_vm._s(_vm.datosasignatura[0].nombredocente))
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._m(1),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Promoción")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(
                              _vm._s(_vm.datosciclo[0]["promocion"]["nombre"])
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Especialidad")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(
                              _vm._s(
                                _vm.datosciclo[0]["especialidad"]["nombre"]
                              )
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Tipo Estudiante")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(
                              _vm._s(
                                _vm.datosciclo[0]["tipo_estudiante"]["nombre"]
                              )
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("División")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(
                              _vm._s(_vm.datosciclo[0]["division"]["nombre"])
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Grado")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(
                              _vm._s(
                                _vm.datosciclo[0]["tipo_estudiante"]["siglas"] +
                                  _vm.datosciclo[0]["anio_academico"]["siglas"]
                              )
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("strong", [_vm._v("Duración")])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.datosciclo.length > 0
                      ? _c("div", { staticClass: "col s12 l6 m6" }, [
                          _c("label", [
                            _vm._v(
                              _vm._s(_vm.datosciclo[0]["periodo"]["nombre"])
                            )
                          ])
                        ])
                      : _vm._e()
                  ],
                  1
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col s12 l9 m9" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-content" }, [
                _c("span", { staticClass: "card-title" }, [_vm._v("Notas")]),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col s12 l8 m8" }, [
                    _c(
                      "table",
                      {
                        staticClass: "table",
                        staticStyle: { "font-size": "11px" }
                      },
                      [
                        _vm._m(2),
                        _vm._v(" "),
                        _c(
                          "tbody",
                          _vm._l(_vm.notas, function(nota, index) {
                            return _c("tr", [
                              _c("td", [_vm._v(_vm._s(nota.tipo_nota.nombre))]),
                              _vm._v(" "),
                              _c("td", [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.fillnota[index],
                                      expression: "fillnota[index]"
                                    }
                                  ],
                                  key: index,
                                  attrs: { type: "number", min: "0" },
                                  domProps: { value: _vm.fillnota[index] },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.fillnota,
                                        index,
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "waves-effect waves-light btn btn-small teal lighten-1",
                                    on: {
                                      click: function($event) {
                                        _vm.RegistrarNota(
                                          nota.id,
                                          _vm.fillnota[index]
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "i",
                                      { staticClass: "material-icons left" },
                                      [_vm._v("save")]
                                    ),
                                    _vm._v(" Registrar")
                                  ]
                                )
                              ])
                            ])
                          })
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col s12 l4 m4" })
                ])
              ])
            ])
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _vm._m(3)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l12 m12" }, [_c("hr")])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l12 m12" }, [_c("hr")])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Tipo Evalucion")]),
      _vm._v(" "),
      _c("th", [_vm._v("Nota")]),
      _vm._v(" "),
      _c("th", [_vm._v("Accion")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "modal", attrs: { id: "mdlevaluaciones" } },
      [
        _c("div", { staticClass: "modal-content" }, [
          _c("p", [_c("strong", [_vm._v("REGISTRO MATRICULA")])])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "modal-footer" })
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6e7d802c", module.exports)
  }
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(87)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(89)
/* template */
var __vue_template__ = __webpack_require__(90)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/JefeDepartamento/AsignarDocenteComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-007bb540", Component.options)
  } else {
    hotAPI.reload("data-v-007bb540", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("6419fb90", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-007bb540\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AsignarDocenteComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-007bb540\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AsignarDocenteComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n  font-size: 18px;\r\n  color: #999999;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n  color: #999999 ;\n}\r\n", ""]);

// exports


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    idpromocion: String
  },
  data: function data() {
    return {
      usuario: global.user,

      fullPage: true,
      isLoading: false,
      fillhorario: { 'idarea': '', 'dia': '', 'inicio': '', 'termino': '', 'idusuario': '', 'idanio': '' },
      horarios: [],
      modulos: [],
      anio: { 'id': '', 'nro_promocion': '', 'division': '', 'grado': '', 'estado_ac': '' },
      idmodulo: '',
      areas: [],
      docentes: [],
      idarea: ''
    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    DescartarHorario: function DescartarHorario(id) {
      var _this = this;

      var url = '/descartarhorarioanio';
      axios.post(url, {
        'idhorario': id

      }).then(function (response) {

        _this.GetArea();

        M.toast({ html: 'Horario Descartado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    DescartarDocente: function DescartarDocente(id) {
      var _this2 = this;

      var url = '/descartardocenteanio';
      axios.post(url, {
        'idda': id

      }).then(function (response) {

        _this2.GetArea();

        M.toast({ html: 'Docentes Descartado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    SelectCurso: function SelectCurso(idarea) {
      this.fillhorario.idarea = idarea;
      this.fillhorario.idanio = this.idpromocion;
    },
    RegistrarHorario: function RegistrarHorario() {
      var _this3 = this;

      this.fillhorario.idusuario = this.usuario.id;

      var url = '/registrarhorario';
      axios.post(url, this.fillhorario).then(function (response) {

        _this3.fillhorario.dia = '';
        _this3.fillhorario.inicio = '';
        _this3.fillhorario.termino = '';
        _this3.fillhorario.idarea = '';
        _this3.fillhorario.idanio = '';
        _this3.GetArea();
        M.toast({ html: 'Horario Registrado', 'classes': 'green' });
      }).catch(function (error) {
        console.log(error.response);
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    AsignarDocente: function AsignarDocente(idcp) {
      var _this4 = this;

      var url = '/asignardocentearea';
      axios.post(url, {
        'idarea': this.idarea,
        'idanio': this.idpromocion,
        'idcp': idcp
      }).then(function (response) {

        _this4.GetDocente(_this4.idarea);
        _this4.GetArea();
        M.toast({ html: 'Docentes asignado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    GetDocente: function GetDocente(idarea) {
      var _this5 = this;

      this.docentes = [];
      this.idarea = idarea;
      var url = '/getdocentebyarea';
      axios.post(url, {
        'idarea': idarea,
        'idanio': this.idpromocion
      }).then(function (response) {
        console.log(response);
        _this5.docentes = response.data;

        M.toast({ html: 'Docentes obtenido', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    GetArea: function GetArea() {
      var _this6 = this;

      var url = '/getareasconocimientobymodulo';
      axios.post(url, {
        'idmodulo': this.idmodulo,
        'idanio': this.idpromocion
      }).then(function (response) {
        _this6.areas = response.data;

        M.toast({ html: 'Area Conocimiento obtenido', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    GetAnioAcademico: function GetAnioAcademico() {
      var _this7 = this;

      var url = '/getaniacademico';
      axios.post(url, {
        'idanio': this.idpromocion
      }).then(function (response) {
        var data_anio = response.data[0];
        _this7.anio.id = data_anio.id;
        _this7.anio.nro_promocion = data_anio.nro_promocion;
        _this7.anio.division = data_anio.division;
        _this7.anio.grado = data_anio.grado;
        _this7.anio.estado_ac = data_anio.estado_ac;

        M.toast({ html: 'Año Academico Obtenido', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    GetModulos: function GetModulos() {
      var _this8 = this;

      var url = '/getmodulos';
      axios.post(url, {}).then(function (response) {
        _this8.modulos = response.data;
        M.toast({ html: 'Modulos obtenidos', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    NuevoHijo: function NuevoHijo() {
      var url = '/nuevoreferenciahijo';
      axios.post(url, this.fillhijo).then(function (response) {
        M.toast({ html: 'Referencia Hijo Registrado!', 'classes': 'green' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });

    this.GetAnioAcademico();
    this.GetModulos();
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "col s12 l6 m6",
          staticStyle: { "text-align": "right" }
        },
        [
          _c("div", { staticClass: "row" }, [
            _c(
              "button",
              {
                staticClass: "waves-effect waves-light btn blue-grey lighten-1",
                on: { click: _vm.GetArea }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("sync")
                ]),
                _vm._v(" Recargar")
              ]
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l3 m3" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-content" }, [
            _c("table", { staticClass: "striped" }, [
              _c("tr", [
                _vm._m(1),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.anio.nro_promocion))])
              ]),
              _vm._v(" "),
              _c("tr", [
                _vm._m(2),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.anio.division))])
              ]),
              _vm._v(" "),
              _c("tr", [
                _vm._m(3),
                _vm._v(" "),
                _c("td", [_c("span", [_vm._v(_vm._s(_vm.anio.grado))])])
              ]),
              _vm._v(" "),
              _c("tr", [
                _vm._m(4),
                _vm._v(" "),
                _c("td", [
                  _vm.anio.estado_ac == "A"
                    ? _c("strong", { staticClass: "green-text" }, [
                        _vm._v("Activo")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.anio.estado_ac == "I"
                    ? _c("strong", { staticClass: "orange-text" }, [
                        _vm._v("Inactivo")
                      ])
                    : _vm._e()
                ])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l9 m9" }, [
        _c("div", { staticClass: "input-field" }, [
          _c("strong", [_vm._v("Modulo:")]),
          _vm._v(" "),
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.idmodulo,
                  expression: "idmodulo"
                }
              ],
              staticClass: "browser-default",
              on: {
                change: [
                  function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.idmodulo = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  },
                  _vm.GetArea
                ]
              }
            },
            [
              _c("option", { attrs: { selected: "", disabled: "" } }, [
                _vm._v("Seleccionar")
              ]),
              _vm._v(" "),
              _vm._l(_vm.modulos, function(modulo) {
                return _c("option", { domProps: { value: modulo.id } }, [
                  _vm._v(_vm._s(modulo.nombre))
                ])
              })
            ],
            2
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          _vm._l(_vm.areas, function(area) {
            return _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "card-content" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col s12 l8 m8" }, [
                      _c("strong", [_vm._v(_vm._s(area.area.nombre))]),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c(
                        "ul",
                        [
                          _c("strong", [_vm._v("Docentes")]),
                          _vm._v(" "),
                          _vm._l(area.docente, function(docente) {
                            return _c(
                              "li",
                              { staticStyle: { margin: "4px" } },
                              [
                                _c("em", [
                                  _vm._v(
                                    _vm._s(
                                      docente.nombres +
                                        " , " +
                                        docente.apellido1 +
                                        " " +
                                        docente.apellido2
                                    )
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticClass: "new badge orange",
                                    attrs: { "data-badge-caption": "" },
                                    on: {
                                      click: function($event) {
                                        _vm.DescartarDocente(docente.idda)
                                      }
                                    }
                                  },
                                  [_vm._v("Descartar")]
                                )
                              ]
                            )
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c("strong", [_vm._v("Horario")]),
                      _vm._v(" "),
                      _c("div", [
                        _c("table", [
                          _vm._m(5, true),
                          _vm._v(" "),
                          _c(
                            "tbody",
                            _vm._l(area.horario, function(horario) {
                              return _c("tr", [
                                _c("td", [_vm._v(_vm._s(horario.dia))]),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(horario.inicio))]),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(horario.termino))]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "span",
                                    {
                                      staticClass: "new badge orange",
                                      attrs: { "data-badge-caption": "" },
                                      on: {
                                        click: function($event) {
                                          _vm.DescartarHorario(horario.id)
                                        }
                                      }
                                    },
                                    [_vm._v("Descartar")]
                                  )
                                ])
                              ])
                            })
                          )
                        ]),
                        _vm._v(" "),
                        area.horario.length == 0
                          ? _c("label", [_vm._v("Ningun horario")])
                          : _vm._e()
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col s12 l4 m4" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "waves-effect waves-light btn indigo btn-small  modal-trigger",
                          attrs: { "data-target": "mdlasignardocente" },
                          on: {
                            click: function($event) {
                              _vm.GetDocente(area.area.id)
                            }
                          }
                        },
                        [_vm._v("Asignar Docente")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass:
                            "waves-effect waves-light btn teal lighten-1 btn-small  modal-trigger",
                          attrs: { "data-target": "mdlasignarhorario" },
                          on: {
                            click: function($event) {
                              _vm.SelectCurso(area.area.id)
                            }
                          }
                        },
                        [_vm._v("Horario")]
                      )
                    ])
                  ])
                ])
              ])
            ])
          })
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlasignardocente" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("h5", { staticClass: "card-title" }, [_vm._v("Asignar Docente")]),
        _vm._v(" "),
        _c("div", [
          _c("table", [
            _vm._m(6),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.docentes, function(docente) {
                return _c("tr", [
                  _c("td", [
                    _vm._v(
                      _vm._s(
                        docente.nombre +
                          " , " +
                          docente.apellidop +
                          " " +
                          docente.apellidom
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    docente.e == 0
                      ? _c(
                          "button",
                          {
                            staticClass:
                              "waves-effect waves-green btn  teal lighten-1",
                            on: {
                              click: function($event) {
                                _vm.AsignarDocente(docente.idcp)
                              }
                            }
                          },
                          [
                            _c("i", { staticClass: "material-icons left" }, [
                              _vm._v("check")
                            ]),
                            _vm._v(" Asignar")
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    docente.e == 1
                      ? _c(
                          "button",
                          { staticClass: "btn", attrs: { disabled: "" } },
                          [_vm._v("Asignado")]
                        )
                      : _vm._e()
                  ])
                ])
              })
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _vm._m(7)
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlasignarhorario" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("h5", { staticClass: "card-title" }, [_vm._v("Asignar Horario")]),
        _vm._v(" "),
        _c("div", { staticClass: "col s12 l4 m4" }, [
          _c("div", { staticClass: "input-field" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillhorario.dia,
                    expression: "fillhorario.dia"
                  }
                ],
                staticClass: "browser-default",
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.fillhorario,
                      "dia",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "LUNES" } }, [_vm._v("Lunes")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "MARTES" } }, [
                  _vm._v("Martes")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "MIERCOLES" } }, [
                  _vm._v("Miercorles")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "JUEVES" } }, [
                  _vm._v("Jueves")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "VIERNES" } }, [
                  _vm._v("Viernes")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "SABADO" } }, [
                  _vm._v("Sabado")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "DOMINGO" } }, [
                  _vm._v("Domingo")
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "span",
              {
                staticClass: "helper-text",
                attrs: { "data-error": "wrong", "data-success": "right" }
              },
              [_vm._v("Día")]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col s12 l4 m4" }, [
          _c("div", { staticClass: "input-field" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillhorario.inicio,
                  expression: "fillhorario.inicio"
                }
              ],
              attrs: { type: "time" },
              domProps: { value: _vm.fillhorario.inicio },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillhorario, "inicio", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _c(
              "span",
              {
                staticClass: "helper-text",
                attrs: { "data-error": "wrong", "data-success": "right" }
              },
              [_vm._v("Inicio")]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col s12 l4 m4" }, [
          _c("div", { staticClass: "input-field" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillhorario.termino,
                  expression: "fillhorario.termino"
                }
              ],
              attrs: { type: "time" },
              domProps: { value: _vm.fillhorario.termino },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillhorario, "termino", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _c(
              "span",
              {
                staticClass: "helper-text",
                attrs: { "data-error": "wrong", "data-success": "right" }
              },
              [_vm._v("Término")]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "modal-close waves-effect waves-green btn teal lighten-1",
            on: { click: _vm.RegistrarHorario }
          },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("save")]),
            _vm._v("Registrar")
          ]
        ),
        _vm._v(" "),
        _vm._m(8)
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l6 m6" }, [
      _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
        _vm._v("Año Academico")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
        _vm._v("Asignación de docentes")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", [_c("strong", [_vm._v("Promocion")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", [_c("strong", [_vm._v("Division")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", [_c("strong", [_vm._v("Grado")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", [_c("strong", [_vm._v("Estado")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Día")]),
      _vm._v(" "),
      _c("th", [_vm._v("Inicio")]),
      _vm._v(" "),
      _c("th", [_vm._v("Termino")]),
      _vm._v(" "),
      _c("th", [_vm._v("Accion")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Nombres y Apellidos")]),
      _vm._v(" "),
      _c("th", [_vm._v("Accion")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        { staticClass: "modal-close waves-effect waves-green btn-flat" },
        [
          _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
          _vm._v("Salir")
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect waves-green btn-flat" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("Salir")
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-007bb540", module.exports)
  }
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(94)
/* template */
var __vue_template__ = __webpack_require__(95)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Docente/AsignaturasComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32189e31", Component.options)
  } else {
    hotAPI.reload("data-v-32189e31", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("3bd306fa", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-32189e31\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AsignaturasComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-32189e31\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AsignaturasComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n  font-size: 18px;\r\n  color: #999999;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n  color: #999999 ;\n}\r\n", ""]);

// exports


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      usuario: global.user,
      fullPage: true,
      isLoading: false,
      asignaturas: [],
      horarios: [],
      smshorario: false
    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    GetHorario: function GetHorario(idasignatura) {
      var _this = this;

      this.smshorario = true;
      this.horarios = [];
      var url = '/gethorarioasignatura';
      axios.post(url, {
        'idasignatura': idasignatura

      }).then(function (response) {
        _this.horarios = response.data;
        _this.smshorario = false;
        M.toast({ html: 'Horario obtenido', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    GetAsignatura: function GetAsignatura() {
      var _this2 = this;

      var url = '/getasignaturadocente';
      axios.post(url, {
        'id': this.usuario.clasifica_persona_id
      }).then(function (response) {
        _this2.asignaturas = response.data;
        M.toast({ html: 'Asignaturas obtenidos', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    NuevoHijo: function NuevoHijo() {
      var url = '/nuevoreferenciahijo';
      axios.post(url, this.fillhijo).then(function (response) {
        M.toast({ html: 'Referencia Hijo Registrado!', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });
    this.GetAsignatura();
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "col s12 l6 m6",
          staticStyle: { "text-align": "right" }
        },
        [
          _c("div", { staticClass: "row" }, [
            _c(
              "button",
              {
                staticClass: "waves-effect waves-light btn blue-grey lighten-1",
                on: { click: _vm.GetAsignatura }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("sync")
                ]),
                _vm._v(" Recargar")
              ]
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col s12 l12 m12" },
        [
          _c("div", [
            _c("strong", [
              _vm._v(
                _vm._s(_vm.asignaturas.length) + " Asignaturas a su cargo."
              )
            ])
          ]),
          _vm._v(" "),
          _vm._l(_vm.asignaturas, function(asignatura) {
            return _c("div", [
              _c("div", { staticClass: "card" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "card-content" }, [
                    _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "col s12 l6 m6" }, [
                        _c(
                          "strong",
                          {
                            staticClass: "indigo-text",
                            staticStyle: { "font-size": "18px" }
                          },
                          [_vm._v(_vm._s(asignatura.area.nombre))]
                        ),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        _c("em", [
                          _vm._v(_vm._s(asignatura.area.modulo.nombre))
                        ]),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        _c("strong", [
                          _vm._v(
                            "Promocion:" +
                              _vm._s(asignatura.promocion.nro_promocion)
                          )
                        ]),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        asignatura.estado_da == "A"
                          ? _c("strong", { staticClass: "green-text" }, [
                              _vm._v("Activo")
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("br")
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col s12 l6 m6" },
                        [
                          _c(
                            "router-link",
                            {
                              staticClass:
                                "waves-effect waves-light btn indigo btn-small",
                              attrs: {
                                to:
                                  "/contenidosasignatura/" +
                                  asignatura.area.id +
                                  "/" +
                                  asignatura.id
                              }
                            },
                            [_vm._v("Contenidos")]
                          ),
                          _vm._v(" "),
                          _c(
                            "router-link",
                            {
                              staticClass:
                                "waves-effect waves-light btn teal lighten-1 btn-small",
                              attrs: {
                                to:
                                  "/especialistasmatriculados/" +
                                  asignatura.area.id +
                                  "/" +
                                  asignatura.id
                              }
                            },
                            [_vm._v("Matriculados")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass:
                                "waves-effect waves-light btn blue btn-small  modal-trigger",
                              staticStyle: { margin: "3px" },
                              attrs: { "data-target": "mdlverhorario" },
                              on: {
                                click: function($event) {
                                  _vm.GetHorario(asignatura.id)
                                }
                              }
                            },
                            [_vm._v("Ver Horario")]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              staticClass:
                                "waves-effect waves-light btn red btn-small",
                              attrs: {
                                href: "/actanotaspdf/" + asignatura.id,
                                target: "blank"
                              }
                            },
                            [_vm._v("Acta de Notas")]
                          )
                        ],
                        1
                      )
                    ])
                  ])
                ])
              ])
            ])
          })
        ],
        2
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlverhorario" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("h5", [_vm._v("Horario de clases")]),
        _vm._v(" "),
        _vm.smshorario == true
          ? _c("div", { staticClass: "progress" }, [
              _c("div", { staticClass: "indeterminate" })
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("table", [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.horarios, function(horario) {
              return _c("tr", [
                _c("td", [_vm._v(_vm._s(horario.dia))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(horario.inicio))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(horario.termino))])
              ])
            })
          ),
          _vm._v(" "),
          _c("div", [
            _vm.horarios.length == 0
              ? _c("label", [_vm._v("Ningun registro.")])
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _vm._m(2)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l6 m6" }, [
      _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
        _vm._v("Asignaturas a cargo de docente")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Día")]),
      _vm._v(" "),
      _c("th", [_vm._v("Inicio")]),
      _vm._v(" "),
      _c("th", [_vm._v("Término")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        { staticClass: "modal-close waves-effect waves-green btn-flat" },
        [
          _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
          _vm._v("Salir")
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-32189e31", module.exports)
  }
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(97)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(99)
/* template */
var __vue_template__ = __webpack_require__(100)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Docente/ContenidosComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-efec0a02", Component.options)
  } else {
    hotAPI.reload("data-v-efec0a02", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(98);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("6a7dc594", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-efec0a02\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ContenidosComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-efec0a02\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ContenidosComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n  font-size: 18px;\r\n  color: #999999;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n  color: #999999 ;\n}\r\n", ""]);

// exports


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    idarea: String,
    iddocentearea: String
  },
  data: function data() {
    return {
      usuario: global.user,

      fullPage: true,
      isLoading: false,
      contenidos: [],
      fillcontenido: { 'id': '', 'nombre': '' },
      tipo_evaluacion: '',
      fillevaluacion: { 'tipo': '', 'idcontenidoasignado': '' },
      idcontenido: '',
      idevaluacion: ''
    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    Culminar: function Culminar(idcontenido) {
      var _this = this;

      var url = '/culminarcursoasignado';
      axios.post(url, {
        'idcontenido': idcontenido
      }).then(function (response) {
        _this.GetContenido();
        M.toast({ html: 'Contenido Archivado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    Activar: function Activar(idcontenido) {
      var _this2 = this;

      var url = '/activarcursoasignado';
      axios.post(url, {
        'idcontenido': idcontenido
      }).then(function (response) {
        _this2.GetContenido();
        M.toast({ html: 'Contenido Activado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    DescartarEvaluacion: function DescartarEvaluacion() {
      var _this3 = this;

      var url = '/descartarevaluacion';
      axios.post(url, {
        'idevaluacion': this.idevaluacion
      }).then(function (response) {
        _this3.GetContenido();
        M.toast({ html: 'Contenido Descartado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    DescartarContenido: function DescartarContenido() {
      var _this4 = this;

      var url = '/descartarcontenidoareaconocimiento';
      axios.post(url, {
        'idcontenido': this.idcontenido
      }).then(function (response) {
        _this4.GetContenido();
        M.toast({ html: 'Contenido Descartado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    HabilitarEvaluacion: function HabilitarEvaluacion() {
      var _this5 = this;

      var url = '/habilitarevaluacion';
      axios.post(url, this.fillevaluacion).then(function (response) {
        _this5.GetContenido();
        M.toast({ html: 'Evaluacion habilitado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    HabilitarContenido: function HabilitarContenido() {
      var _this6 = this;

      var url = '/habilitarcontenido';
      axios.post(url, {
        'idcontenido': this.fillcontenido.id,
        'iddocentearea': this.iddocentearea
      }).then(function (response) {
        _this6.GetContenido();
        M.toast({ html: 'Contenido Obtenido', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
        console.log(error.response);
      });
    },
    SelectContenido2: function SelectContenido2(contenido, asignado) {

      this.fillcontenido.id = contenido.id;
      this.fillcontenido.nombre = contenido.nombre;
      this.fillevaluacion.idcontenidoasignado = asignado[0]['id'];
    },
    SelectContenido: function SelectContenido(contenido) {
      this.fillcontenido.id = contenido.id;
      this.fillcontenido.nombre = contenido.nombre;
    },
    SelectContenidoDescartar: function SelectContenidoDescartar(contenido, idcontenido) {
      this.fillcontenido.id = contenido.id;
      this.fillcontenido.nombre = contenido.nombre;
      this.idcontenido = idcontenido;
    },
    SelectContenidoDescartarEvaluacion: function SelectContenidoDescartarEvaluacion(idevaluacion) {
      this.idevaluacion = idevaluacion;
    },
    GetContenido: function GetContenido() {
      var _this7 = this;

      var url = '/getcontenidobyidarea';
      axios.post(url, {
        'idarea': this.idarea,
        'iddocente': this.iddocentearea
      }).then(function (response) {

        document.querySelector("label[for='tipo']").classList.add('active');
        document.addEventListener('DOMContentLoaded', function () {
          var elems = document.querySelectorAll('.chips');
          var instances = M.Chips.init(elems, options);
        });
        _this7.contenidos = response.data;
        M.toast({ html: 'Contenido Obtenido', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    this.GetContenido();
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "col s12 l4 m4",
          staticStyle: { "text-align": "right" }
        },
        [
          _c("div", { staticClass: "row" }, [
            _c(
              "button",
              {
                staticClass: "waves-effect waves-light btn blue-grey lighten-1",
                on: { click: _vm.GetContenido }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("sync")
                ]),
                _vm._v(" Recargar")
              ]
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col s12 l12 m12" },
        [
          _c("div", [
            _c("strong", [_vm._v(_vm._s(_vm.contenidos.length) + " registros")])
          ]),
          _vm._v(" "),
          _vm._l(_vm.contenidos, function(contenido) {
            return _c("div", [
              _c("div", { staticClass: "card" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "card-content" }, [
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col s12 l8 m8" },
                        [
                          _c(
                            "strong",
                            {
                              staticClass: "indigo-text",
                              staticStyle: { "font-size": "18px" }
                            },
                            [_vm._v(_vm._s(contenido.contenido.nombre))]
                          ),
                          _vm._v(" "),
                          _c("br"),
                          _vm._v(" "),
                          contenido.asignado.length > 0
                            ? _c("strong", { staticClass: "green-text" }, [
                                _vm._v("Habilitado")
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          contenido.asignado.length == 0
                            ? _c("strong", { staticClass: "orange-text" }, [
                                _vm._v("No Habilitado")
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("br"),
                          _vm._v(" "),
                          _c("strong", [_vm._v("Evaluaciones:")]),
                          _vm._v(" "),
                          _c("br"),
                          _vm._v(" "),
                          _vm._l(contenido.asignado, function(asignado) {
                            return _c("div", [
                              _c(
                                "table",
                                { staticClass: "striped" },
                                [
                                  _vm._l(asignado.evaluacion, function(
                                    evaluacion
                                  ) {
                                    return _c("tr", [
                                      _c("td", [
                                        _c(
                                          "span",
                                          {
                                            staticClass: "new badge teal",
                                            attrs: { "data-badge-caption": "" }
                                          },
                                          [_vm._v(_vm._s(evaluacion.tipo))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          {
                                            staticClass:
                                              "new badge red modal-trigger",
                                            attrs: {
                                              "data-target":
                                                "mdldescartarevaluacion",
                                              "data-badge-caption": ""
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.SelectContenidoDescartarEvaluacion(
                                                  evaluacion.id
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("Descartar")]
                                        )
                                      ])
                                    ])
                                  }),
                                  _vm._v(" "),
                                  asignado.evaluacion.length == 0
                                    ? _c("label", [
                                        _vm._v("Ninguna evaluación")
                                      ])
                                    : _vm._e()
                                ],
                                2
                              )
                            ])
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col s12 l4 m4" },
                        [
                          contenido.asignado.length == 0
                            ? _c(
                                "button",
                                {
                                  staticClass:
                                    "waves-effect waves-light btn teal lighten-1 btn-small  modal-trigger",
                                  attrs: { "data-target": "mdlhabilitar" },
                                  on: {
                                    click: function($event) {
                                      _vm.SelectContenido(contenido.contenido)
                                    }
                                  }
                                },
                                [_vm._v("Habilitar contenido")]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(contenido.asignado, function(cont_asig) {
                            return _c("div", [
                              cont_asig.estado_ca == "A"
                                ? _c(
                                    "button",
                                    {
                                      staticClass:
                                        "waves-effect waves-light btn indigo btn-small  modal-trigger",
                                      staticStyle: { margin: "3px" },
                                      attrs: { "data-target": "mdlevaluacion" },
                                      on: {
                                        click: function($event) {
                                          _vm.SelectContenido2(
                                            contenido.contenido,
                                            contenido.asignado
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("Nueva Evaluacion")]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              cont_asig.estado_ca == "A"
                                ? _c(
                                    "button",
                                    {
                                      staticClass:
                                        "waves-effect waves-light btn orange btn-small",
                                      staticStyle: { margin: "3px" },
                                      on: {
                                        click: function($event) {
                                          _vm.Culminar(cont_asig.id)
                                        }
                                      }
                                    },
                                    [_vm._v(" Archivar")]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              cont_asig.estado_ca == "I"
                                ? _c(
                                    "button",
                                    {
                                      staticClass:
                                        "waves-effect waves-light btn blue btn-small",
                                      staticStyle: { margin: "3px" },
                                      on: {
                                        click: function($event) {
                                          _vm.Activar(cont_asig.id)
                                        }
                                      }
                                    },
                                    [_vm._v(" Activar")]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              cont_asig.estado_ca == "A"
                                ? _c(
                                    "button",
                                    {
                                      staticClass:
                                        "waves-effect waves-light btn red btn-small  modal-trigger",
                                      staticStyle: { margin: "3px" },
                                      attrs: { "data-target": "mdldescartar" },
                                      on: {
                                        click: function($event) {
                                          _vm.SelectContenidoDescartar(
                                            contenido.contenido,
                                            cont_asig.id
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v(" Descartar")]
                                  )
                                : _vm._e()
                            ])
                          })
                        ],
                        2
                      )
                    ])
                  ])
                ])
              ])
            ])
          })
        ],
        2
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "modal", attrs: { id: "mdldescartarevaluacion" } },
      [
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "modal-footer" }, [
          _c(
            "button",
            {
              staticClass:
                "modal-close waves-effect waves-green btn teal lighten-1",
              on: { click: _vm.DescartarEvaluacion }
            },
            [_vm._v("Entendido, Descartar")]
          ),
          _vm._v(" "),
          _vm._m(2)
        ])
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdldescartar" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("strong", [
          _vm._v("Al Descartar contenido de  "),
          _c("em", { staticClass: "indigo-text" }, [
            _vm._v(_vm._s(_vm.fillcontenido.nombre))
          ]),
          _vm._v(" las evaluaciones asociados al mismo serán eliminados. ")
        ]),
        _vm._v(" "),
        _c("br"),
        _vm._v(" "),
        _c("label", { staticClass: "red-text" }, [
          _vm._v(
            "será eliminado para todos los matriculados en está promoción."
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "modal-close waves-effect waves-green btn teal lighten-1",
            on: { click: _vm.DescartarContenido }
          },
          [_vm._v("Entendido, Descartar")]
        ),
        _vm._v(" "),
        _vm._m(3)
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlevaluacion" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("span", [_vm._v("Asignar Evaluación")]),
        _vm._v(" "),
        _c("div", [
          _c("strong", [
            _vm._v("Al Habilitar la evaluación para  "),
            _c("em", { staticClass: "indigo-text" }, [
              _vm._v(_vm._s(_vm.fillcontenido.nombre))
            ]),
            _vm._v(
              " , será asignado a todos los matriculados de está promoción."
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("br"),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillevaluacion.tipo,
                    expression: "fillevaluacion.tipo"
                  }
                ],
                staticClass: "browser-default",
                attrs: { id: "tipo" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.fillevaluacion,
                      "tipo",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "FORMADORA" } }, [
                  _vm._v("Formadora")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "INTEGRADORA" } }, [
                  _vm._v("Integradora")
                ])
              ]
            ),
            _vm._v(" "),
            _vm._m(4)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillevaluacion.tipo != ""
          ? _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn teal",
                on: { click: _vm.HabilitarEvaluacion }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("save")
                ]),
                _vm._v("Entendido, Habilitar")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._m(5)
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlhabilitar" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("strong", [
          _vm._v("Al Habilitar  "),
          _c("em", { staticClass: "indigo-text" }, [
            _vm._v(_vm._s(_vm.fillcontenido.nombre))
          ]),
          _vm._v(" , será asignado a todos los matriculados de está promoción.")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "modal-close waves-effect waves-green btn teal lighten-1",
            on: { click: _vm.HabilitarContenido }
          },
          [
            _c("i", { staticClass: "material-icons left" }, [_vm._v("save")]),
            _vm._v("Entendido, Habilitar")
          ]
        ),
        _vm._v(" "),
        _vm._m(6)
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l8 m8" }, [
      _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
        _vm._v("Asignaturas a cargo de docente")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
        _vm._v("Contenidos Imprescindibles")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-content" }, [
      _c("strong", [_vm._v("¿Seguro que desea descartar evaluacion?")]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c("label", { staticClass: "red-text" }, [
        _vm._v("será eliminado para todos los matriculados en está promoción.")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "modal-close waves-effect btn-flat" }, [
      _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
      _vm._v("No, Cancelar")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "modal-close waves-effect btn-flat" }, [
      _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
      _vm._v("No, Cancelar")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "tipo" } }, [
      _vm._v("Tipo Evaluación "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect orange btn-flat" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("No, Cancelar")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect orange btn-flat" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("No, Cancelar")
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-efec0a02", module.exports)
  }
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(102)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(104)
/* template */
var __vue_template__ = __webpack_require__(105)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Docente/MatriculadosDocenteComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a53f2e2e", Component.options)
  } else {
    hotAPI.reload("data-v-a53f2e2e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(103);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("fcf82566", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a53f2e2e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MatriculadosDocenteComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a53f2e2e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MatriculadosDocenteComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n  font-size: 18px;\r\n  color: #999999;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n  color: #999999 ;\n}\r\n", ""]);

// exports


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    idarea: String,
    iddocentearea: String
  },
  data: function data() {
    return {
      usuario: global.user,
      fullPage: true,
      isLoading: false,
      matriculados: [],
      evaluacion: '',
      nombre: '',
      fillaca: { 'id': '', 'nota_aca': '' },
      fillef: { 'id': '', 'nota': '' }
    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    RegistrarExamenFinal: function RegistrarExamenFinal() {
      var _this = this;

      var url = '/registrarexamenfinal';
      axios.post(url, this.fillef).then(function (response) {

        _this.GetMatriculados();
        M.toast({ html: 'Examen Final registrado', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });

        console.log(error.response);
      });
    },
    RegistrarNotaACA: function RegistrarNotaACA() {
      var _this2 = this;

      var url = '/registrarnotaaca';
      axios.post(url, this.fillaca).then(function (response) {

        _this2.GetMatriculados();
        M.toast({ html: 'Nota ACA registrado', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });

        console.log(error.response);
      });
    },
    ViewEF: function ViewEF(ef, nombre, ap1, ap2) {
      this.fillef.id = ef.id;
      this.fillef.nota = ef.examen_final;
      var name = nombre + ' , ' + ap1 + ' ' + ap2;
      this.nombre = name;
    },
    ViewAca: function ViewAca(aca, nombre, ap1, ap2) {
      this.fillaca.id = aca.id;
      this.fillaca.nota_aca = aca.nota_aca;
      var name = nombre + ' , ' + ap1 + ' ' + ap2;
      this.nombre = name;
    },
    Buscar: function Buscar() {
      var _this3 = this;

      var val = document.getElementById('inputsearchproducto').value;

      if (val == ' ' || val == '  ') {
        M.toast({ html: 'Ingrese un valor valido', 'classes': 'orange' });
      } else {
        var url = '/searchmatriculadosdocente';
        axios.post(url, {
          'valor': val,
          'idarea': this.idarea,
          'iddocentearea': this.iddocentearea
        }).then(function (response) {

          _this3.matriculados = response.data;
          //  M.toast({html:'Matriculados obtenidos','classes':'green'});
        }).catch(function (error) {
          M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });

          console.log(error.response);
        });
      }
    },
    RegistrarEvaluacion: function RegistrarEvaluacion() {
      var _this4 = this;

      var url = '/registrarevaluacionespecialista';
      axios.post(url, {

        'evaluacion': this.evaluacion
      }).then(function (response) {

        _this4.GetMatriculados();
        M.toast({ html: 'Evaluacion registrado', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });

        console.log(error.response);
      });
    },
    ViewEvaluar: function ViewEvaluar(idcontenido_c, idmatricula, nombre, ap1, ap2) {
      var _this5 = this;

      var name = nombre + ' , ' + ap1 + ' ' + ap2;
      this.nombre = name;
      this.evaluacion = [];
      var url = '/getcontenidoevaluacion';
      axios.post(url, {
        'idcc': idcontenido_c,
        'idmatricula': idmatricula
      }).then(function (response) {

        _this5.evaluacion = response.data;
        M.toast({ html: 'Evaluacion obtenido', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });

        console.log(error.response);
      });
    },
    GetMatriculados: function GetMatriculados() {
      var _this6 = this;

      var url = '/getespecialistasmatriculados';
      axios.post(url, {
        'idarea': this.idarea,
        'iddocentearea': this.iddocentearea
      }).then(function (response) {

        _this6.matriculados = response.data;
        M.toast({ html: 'Matriculados obtenidos', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });

        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.chips');
      var instances = M.Chips.init(elems, options);
    });

    this.GetMatriculados();
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "col s12 l6 m6",
          staticStyle: { "text-align": "right" }
        },
        [
          _c("div", { staticClass: "row" }, [
            _c(
              "button",
              {
                staticClass: "waves-effect waves-light btn blue-grey lighten-1",
                on: { click: _vm.GetMatriculados }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("sync")
                ]),
                _vm._v(" Recargar")
              ]
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c("label", [_vm._v("Buscar:")]),
        _vm._v(" "),
        _c("input", {
          attrs: { type: "text", id: "inputsearchproducto" },
          on: { keyup: _vm.Buscar }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c("table", { staticClass: "responsive-table" }, [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.matriculados, function(matricula) {
              return _c("tr", [
                _c("td", {
                  domProps: { textContent: _vm._s(matricula.cedula) }
                }),
                _vm._v(" "),
                _c("td", [_vm._v("GR/ESP")]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(
                    "\n              " +
                      _vm._s(
                        matricula.nombres +
                          " , " +
                          matricula.appaterno +
                          " " +
                          matricula.apmaterno
                      ) +
                      "\n            "
                  )
                ]),
                _vm._v(" "),
                _c(
                  "td",
                  _vm._l(matricula.aca, function(aca) {
                    return _c(
                      "div",
                      {
                        staticClass:
                          "chip grey lighten-2 white-text modal-trigger",
                        attrs: { "data-target": "mdlevaluaref" },
                        on: {
                          click: function($event) {
                            _vm.ViewEF(
                              aca,
                              matricula.nombres,
                              matricula.appaterno,
                              matricula.apmaterno
                            )
                          }
                        }
                      },
                      [
                        aca.nota_aca >= 0 && aca.examen_final < 14
                          ? _c(
                              "span",
                              {
                                staticClass:
                                  "new badge  grey lighten-2 red-text",
                                attrs: { "data-badge-caption": "" }
                              },
                              [_c("strong", [_vm._v(_vm._s(aca.examen_final))])]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        aca.examen_final >= 14 && aca.examen_final <= 20
                          ? _c(
                              "span",
                              {
                                staticClass:
                                  "new badge grey lighten-2  green-text",
                                attrs: { "data-badge-caption": "" }
                              },
                              [_c("strong", [_vm._v(_vm._s(aca.examen_final))])]
                            )
                          : _vm._e()
                      ]
                    )
                  })
                ),
                _vm._v(" "),
                _c(
                  "td",
                  _vm._l(matricula.aca, function(aca) {
                    return _c(
                      "div",
                      {
                        staticClass:
                          "chip grey lighten-2 white-text modal-trigger",
                        attrs: { "data-target": "mdlevaluareaca" },
                        on: {
                          click: function($event) {
                            _vm.ViewAca(
                              aca,
                              matricula.nombres,
                              matricula.appaterno,
                              matricula.apmaterno
                            )
                          }
                        }
                      },
                      [
                        aca.nota_aca >= 0 && aca.nota_aca < 14
                          ? _c(
                              "span",
                              {
                                staticClass:
                                  "new badge  grey lighten-2 red-text",
                                attrs: { "data-badge-caption": "" }
                              },
                              [_c("strong", [_vm._v(_vm._s(aca.nota_aca))])]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        aca.nota_aca >= 14 && aca.nota_aca <= 20
                          ? _c(
                              "span",
                              {
                                staticClass:
                                  "new badge grey lighten-2  green-text",
                                attrs: { "data-badge-caption": "" }
                              },
                              [_c("strong", [_vm._v(_vm._s(aca.nota_aca))])]
                            )
                          : _vm._e()
                      ]
                    )
                  })
                ),
                _vm._v(" "),
                _c(
                  "td",
                  _vm._l(matricula.contenido, function(contenido) {
                    return _c("ul", [
                      _c(
                        "li",
                        [
                          contenido.contenido.estado_ca == "A"
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "chip teal white-text   modal-trigger",
                                  attrs: {
                                    "data-target": "mdlevaluarespecialista"
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.ViewEvaluar(
                                        contenido.contenido.idcc,
                                        matricula.id,
                                        matricula.nombres,
                                        matricula.appaterno,
                                        matricula.apmaterno
                                      )
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                      " +
                                      _vm._s(
                                        contenido.contenido.nombre_contenido
                                      ) +
                                      "\n                    "
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(contenido.evaluaciones, function(eval) {
                            return contenido.contenido.estado_ca == "A"
                              ? _c(
                                  "div",
                                  { staticClass: "chip   teal lighten-3" },
                                  [
                                    _vm._v(
                                      "\n                      " +
                                        _vm._s(
                                          eval.evaluacion_id +
                                            ".-" +
                                            eval.tipo_nota
                                        ) +
                                        "\n                      "
                                    ),
                                    parseFloat(eval.nota) >= 0 &&
                                    parseFloat(eval.nota) < 14
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "new badge white red-text",
                                            attrs: { "data-badge-caption": "" }
                                          },
                                          [
                                            _c("strong", [
                                              _vm._v(_vm._s(eval.nota))
                                            ])
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    parseFloat(eval.nota) >= 14 &&
                                    parseFloat(eval.nota) <= 20
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "new badge white green-text",
                                            attrs: { "data-badge-caption": "" }
                                          },
                                          [
                                            _c("strong", [
                                              _vm._v(_vm._s(eval.nota))
                                            ])
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              : _vm._e()
                          }),
                          _vm._v(" "),
                          contenido.contenido.estado_ca == "I"
                            ? _c("div", { staticClass: "chip" }, [
                                _vm._v(
                                  "\n                      " +
                                    _vm._s(
                                      contenido.contenido.nombre_contenido
                                    ) +
                                    "\n                    "
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(contenido.evaluaciones, function(eval) {
                            return contenido.contenido.estado_ca == "I"
                              ? _c(
                                  "div",
                                  { staticClass: "chip grey lighten-2" },
                                  [
                                    _vm._v(
                                      "\n                     " +
                                        _vm._s(
                                          eval.evaluacion_id +
                                            ".-" +
                                            eval.tipo_nota
                                        ) +
                                        "\n                       "
                                    ),
                                    eval.nota >= 0 && eval.nota < 14
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "new badge  grey lighten-2 red-text",
                                            attrs: { "data-badge-caption": "" }
                                          },
                                          [
                                            _c("strong", [
                                              _vm._v(_vm._s(eval.nota))
                                            ])
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    eval.nota >= 14 && eval.nota <= 20
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "new badge grey lighten-2  green-text",
                                            attrs: { "data-badge-caption": "" }
                                          },
                                          [
                                            _c("strong", [
                                              _vm._v(_vm._s(eval.nota))
                                            ])
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              : _vm._e()
                          })
                        ],
                        2
                      )
                    ])
                  })
                )
              ])
            })
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "modal", attrs: { id: "mdlevaluarespecialista" } },
      [
        _c("div", { staticClass: "modal-content" }, [
          _vm.evaluacion.length == 0
            ? _c("div", { staticClass: "progress" }, [
                _c("div", { staticClass: "indeterminate" })
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", [
            _c("h5", { staticClass: "indigo-text" }, [
              _vm._v(_vm._s(_vm.nombre))
            ]),
            _vm._v(" "),
            _c("label", [_vm._v("Realizar Evaluación")]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("br")
          ]),
          _vm._v(" "),
          _vm.evaluacion.length > 0
            ? _c(
                "div",
                _vm._l(_vm.evaluacion, function(eval, index) {
                  return _c("div", [
                    _c("label", [
                      _vm._v(_vm._s(eval.id + ".-" + eval.tipo_nota))
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: eval.nota,
                          expression: "eval.nota"
                        }
                      ],
                      key: index,
                      attrs: { type: "text" },
                      domProps: { value: eval.nota },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(eval, "nota", $event.target.value)
                        }
                      }
                    })
                  ])
                })
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "modal-footer" }, [
          _c(
            "button",
            {
              staticClass: "modal-close waves-effect waves-green btn teal",
              on: { click: _vm.RegistrarEvaluacion }
            },
            [
              _c("i", { staticClass: "material-icons left" }, [_vm._v("save")]),
              _vm._v("Registrar")
            ]
          ),
          _vm._v(" "),
          _vm._m(2)
        ])
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlevaluareaca" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("div", [
          _c("h5", { staticClass: "indigo-text" }, [
            _vm._v(_vm._s(_vm.nombre))
          ]),
          _vm._v(" "),
          _c("label", [_vm._v("Evaluar nota ACA")]),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("br")
        ]),
        _vm._v(" "),
        _c("div", [
          _c("label", [_vm._v("Nota ACA")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.fillaca.nota_aca,
                expression: "fillaca.nota_aca"
              }
            ],
            attrs: { type: "text" },
            domProps: { value: _vm.fillaca.nota_aca },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.fillaca, "nota_aca", $event.target.value)
              }
            }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillaca.nota_aca != ""
          ? _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn teal",
                on: { click: _vm.RegistrarNotaACA }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("save")
                ]),
                _vm._v("Registrar")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._m(3)
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlevaluaref" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _c("div", [
          _c("h5", { staticClass: "indigo-text" }, [
            _vm._v(_vm._s(_vm.nombre))
          ]),
          _vm._v(" "),
          _c("label", [_vm._v("Evaluar Examen Final")]),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c("br")
        ]),
        _vm._v(" "),
        _c("div", [
          _c("label", [_vm._v("Nota EXM. FINAL")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.fillef.nota,
                expression: "fillef.nota"
              }
            ],
            attrs: { type: "text" },
            domProps: { value: _vm.fillef.nota },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.fillef, "nota", $event.target.value)
              }
            }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillef.nota != ""
          ? _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn teal",
                on: { click: _vm.RegistrarExamenFinal }
              },
              [
                _c("i", { staticClass: "material-icons left" }, [
                  _vm._v("save")
                ]),
                _vm._v("Registrar")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._m(4)
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col s12 l6 m6" }, [
      _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
        _vm._v("Asignaturas a cargo de docente")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
        _vm._v("Matriculados")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("CEDULA")]),
      _vm._v(" "),
      _c("th", [_vm._v("GRADO")]),
      _vm._v(" "),
      _c("th", [_vm._v("NOMBRES Y APELLIDOS")]),
      _vm._v(" "),
      _c("th", [_vm._v("EXM.FINAL")]),
      _vm._v(" "),
      _c("th", [_vm._v("NOTA ACA")]),
      _vm._v(" "),
      _c("th", [_vm._v("CONTENIDO IMPRESCINDIBLE")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect waves-green btn-flat" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("Cancelar")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect waves-green btn-flat" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("Cancelar")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "modal-close waves-effect waves-green btn-flat" },
      [
        _c("i", { staticClass: "material-icons left" }, [_vm._v("close")]),
        _vm._v("Cancelar")
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a53f2e2e", module.exports)
  }
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(107)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(109)
/* template */
var __vue_template__ = __webpack_require__(110)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/JefeDepartamento/MallaCurricularComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-056fe186", Component.options)
  } else {
    hotAPI.reload("data-v-056fe186", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("c42eb1b2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-056fe186\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MallaCurricularComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-056fe186\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MallaCurricularComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\ntable {\r\n  border-collapse: collapse;\n}\ntable, th, td {\r\n  border: 1px solid #eee;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n \r\n  font-size: 13px;\r\n \r\n  color: #999999;\n}\n.breadcrumb:before {\r\n \r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n \r\n  color: #999999 ;\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    idpromo: String
  },
  data: function data() {
    return _defineProperty({
      usuario: global.user,
      fullPage: true,
      isLoading: false,

      malla: [],

      fillmalla: { 'id': '', 'nombre': '' },
      fillcomponente: { 'id': '', 'nombre': '', 'porcentaje': '', 'idmalla': '', 'nombremalla': '' },
      fillcomponente1: { 'id': '', 'nombre': '', 'porcentaje': '', 'idmalla': '', 'nombremalla': '' },
      fillcomponente2: { 'id': '', 'nombre': '', 'porcentaje': '', 'idperiodo': '', 'nombreperiodo': '', 'modulo': 0 },
      fillcomponente3: { 'id': '', 'nombre': '', 'porcentaje': '', 'idn1': '', 'nombren1': '' }

    }, 'fillmalla', { 'id': '', 'nombre': '' });
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    ModificarComponente3: function ModificarComponente3() {
      var _this = this;

      var url = '/modificarnivel2';

      axios.post(url, this.fillcomponente3).then(function (response) {
        _this.fillcomponente3.nombre = '';
        _this.fillcomponente3.porcentaje = '';
        _this.fillcomponente3.idn1 = '';
        _this.fillcomponente3.nombren1 = '';
        _this.ObtenerMalla();
        M.toast({ html: 'Componente Modificado!', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    ViewModificarComponente3: function ViewModificarComponente3(id, nombre, porcentaje) {
      this.fillcomponente3.id = '';
      this.fillcomponente3.nombre = '';
      this.fillcomponente3.porcentaje = '';
      this.fillcomponente3.idn1 = '';
      this.fillcomponente3.nombren1 = '';

      this.fillcomponente3.id = id;
      this.fillcomponente3.nombre = nombre;
      this.fillcomponente3.porcentaje = porcentaje;
      document.querySelector("label[for='comp3nombre_mod']").classList.add('active');
      document.querySelector("label[for='comp3porcentaje_mod']").classList.add('active');
    },
    NuevoComponente3: function NuevoComponente3() {
      var _this2 = this;

      var url = '/registrarnivel2';

      axios.post(url, this.fillcomponente3).then(function (response) {
        _this2.fillcomponente3.nombre = '';
        _this2.fillcomponente3.porcentaje = '';
        _this2.fillcomponente3.idn1 = '';
        _this2.fillcomponente3.nombren1 = '';
        _this2.ObtenerMalla();
        M.toast({ html: 'Componente Registrado!', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    ViewComponente3: function ViewComponente3(idn1, nombre_n1) {
      this.fillcomponente3.idn1 = '';
      this.fillcomponente3.nombren1 = '';
      this.fillcomponente3.nombre = '';
      this.fillcomponente3.porcentaje = '';
      this.fillcomponente3.idn1 = idn1;
      this.fillcomponente3.nombren1 = nombre_n1;
      document.querySelector("label[for='comp3nombren1']").classList.add('active');
    },
    ModificarComponente2: function ModificarComponente2() {
      var _this3 = this;

      var url = '/modificarnivel1';

      axios.post(url, this.fillcomponente2).then(function (response) {
        _this3.fillcomponente2.nombre = '';
        _this3.fillcomponente2.porcentaje = '';
        _this3.fillcomponente2.idperiodo = '';
        _this3.fillcomponente2.nombreperiodo = '';
        _this3.ObtenerMalla();
        M.toast({ html: 'Componente Modificado!', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    NuevoComponente2: function NuevoComponente2() {
      var _this4 = this;

      var url = '/registrarnivel1';

      axios.post(url, this.fillcomponente2).then(function (response) {
        _this4.fillcomponente2.nombre = '';
        _this4.fillcomponente2.porcentaje = '';
        _this4.fillcomponente2.idperiodo = '';
        _this4.fillcomponente2.nombreperiodo = '';
        _this4.ObtenerMalla();
        M.toast({ html: 'Componente Registrado!', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    ViewModificarComp2: function ViewModificarComp2(nombren1, idn1, porcentaje) {
      this.fillcomponente2.id = idn1;
      this.fillcomponente2.nombre = nombren1;
      this.fillcomponente2.porcentaje = porcentaje;
      document.querySelector("label[for='comp2nombre_mod2']").classList.add('active');
      document.querySelector("label[for='comp2porcentaje_mod2']").classList.add('active');
    },
    ViewComponente2: function ViewComponente2(idperiodo, nombre_periodo) {
      this.fillcomponente2.idperiodo = '';
      this.fillcomponente2.nombreperiodo = '';
      this.fillcomponente2.id = '';
      this.fillcomponente2.nombre = '';
      this.fillcomponente2.porcentaje = '';

      this.fillcomponente2.idperiodo = idperiodo;
      this.fillcomponente2.nombreperiodo = nombre_periodo;
      document.querySelector("label[for='comp2nombrecomp1_mod']").classList.add('active');
    },
    ModificarComponente1: function ModificarComponente1() {
      var _this5 = this;

      var url = '/modificarcomp1';

      axios.post(url, this.fillcomponente1).then(function (response) {
        _this5.fillcomponente1.nombre = '';
        _this5.fillcomponente1.porcentaje = '';
        _this5.fillcomponente1.idmalla = '';
        _this5.fillcomponente1.nombremalla = '';
        _this5.ObtenerMalla();
        M.toast({ html: 'Componente Registrado!', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    RegistrarComponente1: function RegistrarComponente1() {
      var _this6 = this;

      var url = '/registrarcomp1';

      axios.post(url, this.fillcomponente1).then(function (response) {
        _this6.fillcomponente1.nombre = '';
        _this6.fillcomponente1.porcentaje = '';
        _this6.fillcomponente1.idmalla = '';
        _this6.fillcomponente1.nombremalla = '';
        _this6.ObtenerMalla();
        M.toast({ html: 'Componente Registrado!', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    ViewNewComponente1: function ViewNewComponente1(id, nombre) {
      this.fillcomponente1.id = '';
      this.fillcomponente1.nombremalla = '';
      this.fillcomponente1.nombre = '';
      this.fillcomponente1.porcentaje = '';

      this.fillcomponente1.idmalla = id;
      this.fillcomponente1.nombremalla = nombre;
      document.querySelector("label[for='mallacompnombre']").classList.add('active');
      document.querySelector("label[for='comp1nombre']").classList.add('active');
      document.querySelector("label[for='comp1porcentaje_mod']").classList.add('active');
    },
    ViewMalla: function ViewMalla(id, nombre) {
      this.fillmalla.id = id;
      this.fillmalla.nombre = nombre;

      document.querySelector("label[for='mallanombre']").classList.add('active');
    },
    ViewPeriodo: function ViewPeriodo(nombremalla, id, nombre, porcentaje) {
      this.fillcomponente1.nombremalla = nombremalla;
      this.fillcomponente1.id = id;
      this.fillcomponente1.nombre = nombre;
      this.fillcomponente1.porcentaje = porcentaje;

      document.querySelector("label[for='mallacompnombre_mod']").classList.add('active');
      document.querySelector("label[for='comp1nombre_mod']").classList.add('active');
      document.querySelector("label[for='comp1porcentaje_mod']").classList.add('active');
    },
    RegistrarMalla: function RegistrarMalla() {
      var url = '/registrarmalla';

      axios.post(url, this.fillmalla).then(function (response) {
        M.toast({ html: 'Malla Registrado!', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    ModificarMalla: function ModificarMalla() {
      var _this7 = this;

      var url = '/modificarmalla';

      axios.post(url, this.fillmalla).then(function (response) {
        _this7.ObtenerMalla();
        M.toast({ html: 'Malla Modificado!', 'classes': 'green' });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
      });
    },
    ObtenerMalla: function ObtenerMalla() {
      var _this8 = this;

      var url = '/getmalla';
      axios.post(url).then(function (response) {
        _this8.malla = response.data;
        console.log(_this8.malla);
        M.toast({ html: 'Mallas obtenidos!', 'classes': 'green' });

        document.addEventListener('DOMContentLoaded', function () {
          var elems = document.querySelectorAll('.dropdown-trigger');
          var instances = M.Dropdown.init(elems, {});
        });
      }).catch(function (error) {
        M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });

        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {

    this.ObtenerMalla();
    console.log(this.mallas);

    M.AutoInit();
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1   modal-trigger",
            attrs: { "data-target": "mdlnuevohijo" }
          },
          [_vm._v(" Nuevo")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn blue-grey lighten-1",
            on: { click: _vm.ObtenerMalla }
          },
          [_vm._v(" Recargar")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _c(
          "div",
          _vm._l(_vm.malla, function(m) {
            return _c(
              "table",
              {
                staticStyle: { "margin-bottom": "20px", "margin-top": "20px" }
              },
              [
                _c(
                  "caption",
                  {
                    staticClass: "modal-trigger",
                    attrs: { "data-target": "mdlmalla" },
                    on: {
                      click: function($event) {
                        _vm.ViewMalla(m.id, m.nombre_malla)
                      }
                    }
                  },
                  [_vm._v(_vm._s(m.nombre_malla) + " ")]
                ),
                _vm._v(" "),
                _c("strong", [
                  _c(
                    "span",
                    {
                      staticClass: "badge new modal-trigger",
                      attrs: {
                        "data-badge-caption": "",
                        "data-target": "mdlnuevocomp1"
                      },
                      on: {
                        click: function($event) {
                          _vm.ViewNewComponente1(m.id, m.nombre_malla)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons left" }),
                      _vm._v("Más")
                    ]
                  )
                ]),
                _vm._v(" "),
                _vm._l(m.periodo, function(per) {
                  return _c(
                    "tr",
                    [
                      _c("th", { attrs: { rowspan: "m.periodo!=null" } }, [
                        _c("label", [
                          _c(
                            "strong",
                            {
                              staticClass: "modal-trigger",
                              attrs: { "data-target": "mdlmodificarcomp1" },
                              on: {
                                click: function($event) {
                                  _vm.ViewPeriodo(
                                    m.nombre_malla,
                                    per.id,
                                    per.nombre,
                                    per.porcentaje
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(per.nombre))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "badge new  blue-grey lighten-2 sm",
                            attrs: { "data-badge-caption": "" }
                          },
                          [_vm._v("% " + _vm._s(per.porcentaje))]
                        ),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        _c("strong", [
                          _c(
                            "span",
                            {
                              staticClass: "badge new modal-trigger",
                              attrs: {
                                "data-badge-caption": "",
                                "data-target": "mdlnuevocomp2"
                              },
                              on: {
                                click: function($event) {
                                  _vm.ViewComponente2(per.id, per.nombre)
                                }
                              }
                            },
                            [
                              _c("i", { staticClass: "material-icons left" }),
                              _vm._v("Más Componente")
                            ]
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _vm._l(per.nivel1, function(n1) {
                        return _c(
                          "div",
                          [
                            _c(
                              "strong",
                              {
                                staticClass: "modal-trigger",
                                attrs: { "data-target": "mdlmodificarcomp2" },
                                on: {
                                  click: function($event) {
                                    _vm.ViewModificarComp2(
                                      n1.nombre_n1,
                                      n1.id,
                                      n1.porcentaje_n1
                                    )
                                  }
                                }
                              },
                              [_vm._v(_vm._s(n1.nombre_n1))]
                            ),
                            _vm._v(" "),
                            _c("br"),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "badge new  blue-grey lighten-2 sm",
                                attrs: { "data-badge-caption": "" }
                              },
                              [_vm._v("% " + _vm._s(n1.porcentaje_n1))]
                            ),
                            _vm._v(" "),
                            n1.modulo == 1
                              ? _c("strong", [
                                  _c(
                                    "span",
                                    {
                                      staticClass: "badge new modal-trigger",
                                      attrs: {
                                        "data-badge-caption": "",
                                        "data-target": "mdlnuevocomp3"
                                      },
                                      on: {
                                        click: function($event) {
                                          _vm.ViewComponente3(
                                            n1.id,
                                            n1.nombre_n1
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("Más")]
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            n1.modulo == 1
                              ? _c(
                                  "router-link",
                                  { attrs: { to: "/modulos/" + n1.id } },
                                  [
                                    _c(
                                      "span",
                                      {
                                        staticClass: "badge new blue",
                                        attrs: { "data-badge-caption": "" }
                                      },
                                      [_vm._v("Modulos")]
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            n1.nivel2 != null
                              ? _c(
                                  "ol",
                                  [
                                    n1.nivel2.length > 0
                                      ? _c("strong", [
                                          _vm._v("Evaluacion Modular")
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm._l(n1.nivel2, function(n2) {
                                      return n1.nivel2.length > 0
                                        ? _c("li", [
                                            _c(
                                              "strong",
                                              {
                                                staticClass: "modal-trigger",
                                                attrs: {
                                                  "data-target":
                                                    "mdlmodificarcomp3"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    _vm.ViewModificarComponente3(
                                                      n2.id,
                                                      n2.nombre_n2,
                                                      n2.porcentaje_n2
                                                    )
                                                  }
                                                }
                                              },
                                              [_vm._v(_vm._s(n2.nombre_n2))]
                                            ),
                                            _vm._v(" "),
                                            _c("br"),
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "badge new  blue-grey lighten-2 sm",
                                                attrs: {
                                                  "data-badge-caption": ""
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "% " +
                                                    _vm._s(n2.porcentaje_n2)
                                                )
                                              ]
                                            )
                                          ])
                                        : _vm._e()
                                    })
                                  ],
                                  2
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      })
                    ],
                    2
                  )
                })
              ],
              2
            )
          })
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevohijo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(1),
        _vm._v(" "),
        _c("div", [
          _c("div", { staticClass: "input-field col s3" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillmalla.nombre,
                  expression: "fillmalla.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nombremalla", type: "text" },
              domProps: { value: _vm.fillmalla.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillmalla, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(2)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillmalla.nombre != ""
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn  teal lighten-1",
                on: { click: _vm.RegistrarMalla }
              },
              [_vm._v("Guardar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlmalla" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(3),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillmalla.nombre,
                  expression: "fillmalla.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "mallanombre" },
              domProps: { value: _vm.fillmalla.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillmalla, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(4)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillmalla.nombre != ""
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn  teal lighten-1",
                on: { click: _vm.ModificarMalla }
              },
              [_vm._v(" Registrar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevocomp1" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(5),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente1.nombremalla,
                  expression: "fillcomponente1.nombremalla"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "mallacompnombre", disabled: "" },
              domProps: { value: _vm.fillcomponente1.nombremalla },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente1,
                    "nombremalla",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(6)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente1.nombre,
                  expression: "fillcomponente1.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "comp1nombre" },
              domProps: { value: _vm.fillcomponente1.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillcomponente1, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(7)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente1.porcentaje,
                  expression: "fillcomponente1.porcentaje"
                }
              ],
              staticClass: "validate",
              attrs: { type: "number", id: "comp1porcentaje" },
              domProps: { value: _vm.fillcomponente1.porcentaje },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente1,
                    "porcentaje",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(8)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillcomponente1.nombre != "" && _vm.fillcomponente1.porcentaje > 0
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn  teal lighten-1",
                on: { click: _vm.RegistrarComponente1 }
              },
              [_vm._v(" Registrar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlmodificarcomp1" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(9),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente1.nombremalla,
                  expression: "fillcomponente1.nombremalla"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "mallacompnombre_mod", disabled: "" },
              domProps: { value: _vm.fillcomponente1.nombremalla },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente1,
                    "nombremalla",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(10)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente1.nombre,
                  expression: "fillcomponente1.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "comp1nombre_mod" },
              domProps: { value: _vm.fillcomponente1.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillcomponente1, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(11)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente1.porcentaje,
                  expression: "fillcomponente1.porcentaje"
                }
              ],
              staticClass: "validate",
              attrs: { type: "number", id: "comp1porcentaje_mod" },
              domProps: { value: _vm.fillcomponente1.porcentaje },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente1,
                    "porcentaje",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(12)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillcomponente1.nombre != "" && _vm.fillcomponente1.porcentaje > 0
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn  teal lighten-1",
                on: { click: _vm.ModificarComponente1 }
              },
              [_vm._v(" Modificar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevocomp2" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(13),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente2.nombreperiodo,
                  expression: "fillcomponente2.nombreperiodo"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "comp2nombrecomp1_mod", disabled: "" },
              domProps: { value: _vm.fillcomponente2.nombreperiodo },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente2,
                    "nombreperiodo",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(14)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente2.nombre,
                  expression: "fillcomponente2.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "comp2nombre_mod" },
              domProps: { value: _vm.fillcomponente2.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillcomponente2, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(15)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l6 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente2.porcentaje,
                  expression: "fillcomponente2.porcentaje"
                }
              ],
              staticClass: "validate",
              attrs: { type: "number", id: "comp2porcentaje_mod" },
              domProps: { value: _vm.fillcomponente2.porcentaje },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente2,
                    "porcentaje",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(16)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l6 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente2.modulo,
                  expression: "fillcomponente2.modulo"
                }
              ],
              attrs: { type: "checkbox", id: "comp2modulo_mod" },
              domProps: {
                checked: Array.isArray(_vm.fillcomponente2.modulo)
                  ? _vm._i(_vm.fillcomponente2.modulo, null) > -1
                  : _vm.fillcomponente2.modulo
              },
              on: {
                change: function($event) {
                  var $$a = _vm.fillcomponente2.modulo,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 &&
                        _vm.$set(
                          _vm.fillcomponente2,
                          "modulo",
                          $$a.concat([$$v])
                        )
                    } else {
                      $$i > -1 &&
                        _vm.$set(
                          _vm.fillcomponente2,
                          "modulo",
                          $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                        )
                    }
                  } else {
                    _vm.$set(_vm.fillcomponente2, "modulo", $$c)
                  }
                }
              }
            }),
            _vm._v(" "),
            _vm._m(17)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillcomponente2.nombre != "" && _vm.fillcomponente2.porcentaje > 0
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn  teal lighten-1",
                on: { click: _vm.NuevoComponente2 }
              },
              [_vm._v(" Registrar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlmodificarcomp2" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(18),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente2.nombre,
                  expression: "fillcomponente2.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "comp2nombre_mod2" },
              domProps: { value: _vm.fillcomponente2.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillcomponente2, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(19)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente2.porcentaje,
                  expression: "fillcomponente2.porcentaje"
                }
              ],
              staticClass: "validate",
              attrs: { type: "number", id: "comp2porcentaje_mod2" },
              domProps: { value: _vm.fillcomponente2.porcentaje },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente2,
                    "porcentaje",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(20)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillcomponente2.nombre != "" && _vm.fillcomponente2.porcentaje > 0
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn  teal lighten-1",
                on: { click: _vm.ModificarComponente2 }
              },
              [_vm._v(" Modificar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevocomp3" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(21),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente3.nombren1,
                  expression: "fillcomponente3.nombren1"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "comp3nombren1", disabled: "" },
              domProps: { value: _vm.fillcomponente3.nombren1 },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillcomponente3, "nombren1", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(22)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente3.nombre,
                  expression: "fillcomponente3.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "comp3nombre" },
              domProps: { value: _vm.fillcomponente3.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillcomponente3, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(23)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente3.porcentaje,
                  expression: "fillcomponente3.porcentaje"
                }
              ],
              staticClass: "validate",
              attrs: { type: "number", id: "comp3porcentaje" },
              domProps: { value: _vm.fillcomponente3.porcentaje },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente3,
                    "porcentaje",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(24)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillcomponente3.nombre != "" && _vm.fillcomponente3.porcentaje > 0
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn  teal lighten-1",
                on: { click: _vm.NuevoComponente3 }
              },
              [_vm._v(" Registrar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlmodificarcomp3" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(25),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente3.nombre,
                  expression: "fillcomponente3.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text", id: "comp3nombre_mod" },
              domProps: { value: _vm.fillcomponente3.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillcomponente3, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(26)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcomponente3.porcentaje,
                  expression: "fillcomponente3.porcentaje"
                }
              ],
              staticClass: "validate",
              attrs: { type: "number", id: "comp3porcentaje_mod" },
              domProps: { value: _vm.fillcomponente3.porcentaje },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillcomponente3,
                    "porcentaje",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(27)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _vm.fillcomponente3.nombre != "" && _vm.fillcomponente3.porcentaje > 0
          ? _c(
              "button",
              {
                staticClass:
                  "modal-close waves-effect waves-green btn  teal lighten-1",
                on: { click: _vm.ModificarComponente3 }
              },
              [_vm._v(" Modificar")]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col s12", staticStyle: { padding: "5px" } },
      [
        _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
          _vm._v("Mallas Curriculares")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h5", [_vm._v("Nuevo Malla Curricular")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nombremalla" } }, [
      _vm._v("Nombre / Denominación"),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h5", [_vm._v("Modificar Nombre Malla Curricular")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "mallanombre" } },
      [
        _vm._v("Nombre Malla Curricular"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h5", [_vm._v("Nuevo Componente 1")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "mallacompnombre" } },
      [
        _vm._v("Nombre Malla Curricular"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp1nombre" } },
      [
        _vm._v("Nombre / Denominación"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp1porcentaje" } },
      [
        _vm._v("Porcentaje %"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h5", [_vm._v("Modificar Componente 1")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "mallacompnombre_mod" } },
      [
        _vm._v("Nombre Malla Curricular"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp1nombre_mod" } },
      [
        _vm._v("Nombre / Denominación"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp1porcentaje_mod" } },
      [
        _vm._v("Porcentaje %"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h5", [_vm._v("Nuevo Componente 2")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp2nombrecomp1_mod" } },
      [
        _vm._v("Nombre Componente 2"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp2nombre_mod" } },
      [
        _vm._v("Nombre / Denominación"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp2porcentaje_mod" } },
      [
        _vm._v("Porcentaje %"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp2modulo_mod" } },
      [
        _vm._v("Rgistro de modulo"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h5", [_vm._v("Modificar Componente 2")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp2nombre_mod2" } },
      [
        _vm._v("Nombre / Denominación"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp2porcentaje_mod2" } },
      [
        _vm._v("Porcentaje %"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h5", [_vm._v("Nuevo Componente 3")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp3nombren1" } },
      [
        _vm._v("Nombre Componente 1"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp3nombre" } },
      [
        _vm._v("Nombre / Denominación"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp3porcentaje" } },
      [
        _vm._v("Porcentaje %"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("h5", [_vm._v("Modificar Componente 3")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp3nombre_mod" } },
      [
        _vm._v("Nombre / Denominación"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "active", attrs: { for: "comp3porcentaje_mod" } },
      [
        _vm._v("Porcentaje %"),
        _c("span", { staticClass: "red-text" }, [_vm._v("*")])
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-056fe186", module.exports)
  }
}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(112)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(114)
/* template */
var __vue_template__ = __webpack_require__(115)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/JefeDepartamento/ModuloComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-543f56e6", Component.options)
  } else {
    hotAPI.reload("data-v-543f56e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(113);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("b27a92d8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-543f56e6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ModuloComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-543f56e6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ModuloComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n  font-size: 13px;\r\n  color: #999999;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n  color: #999999 ;\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      usuario: global.user,
      fullPage: true,
      isLoading: false,
      modulos: [],
      fillevaluacion: { 'id': '', 'caract_personal_nota': '', 'coevaluacion_nota': '', 'nombre': '' },

      fillmodulo: { 'id': '', 'nombre': '', 'competencia': '', 'objetivo': '' },
      fillmodulo2: { 'id': '', 'nombre': '', 'competencia': '', 'objetivo': '' }

    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    Activar: function Activar(idmodulo) {
      var _this = this;

      var url = '/activarmodulo';
      axios.post(url, {
        'idmodulo': idmodulo
      }).then(function (response) {
        _this.GetModulos();
        M.toast({ html: 'Modulo Activado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    Desactivar: function Desactivar(idmodulo) {
      var _this2 = this;

      var url = '/desactivarmodulo';
      axios.post(url, {
        'idmodulo': idmodulo
      }).then(function (response) {
        _this2.GetModulos();

        M.toast({ html: 'Modulo Desactivado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    Modificar: function Modificar() {
      var _this3 = this;

      var url = '/modificarmodulo';
      axios.post(url, this.fillmodulo2).then(function (response) {
        _this3.GetModulos();
        _this3.fillmodulo2.id = '';
        _this3.fillmodulo2.nombre = '';
        _this3.fillmodulo2.competencia = '';
        _this3.fillmodulo2.objetivo = '';
        M.toast({ html: 'Modulo Modificado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ViewModificar: function ViewModificar(modulo) {
      this.fillmodulo2.id = modulo.id;
      this.fillmodulo2.nombre = modulo.nombre;
      this.fillmodulo2.competencia = modulo.competencia;
      this.fillmodulo2.objetivo = modulo.objetivo;
      document.querySelector("label[for='nombre']").classList.add('active');
      document.querySelector("label[for='competencia']").classList.add('active');
      document.querySelector("label[for='objetivo']").classList.add('active');
    },
    Registrar: function Registrar() {
      var _this4 = this;

      var url = '/nuevomodulo';
      axios.post(url, this.fillmodulo).then(function (response) {
        _this4.GetModulos();
        _this4.fillmodulo.id = '';
        _this4.fillmodulo.nombre = '';
        _this4.fillmodulo.competencia = '';
        _this4.fillmodulo.objetivo = '';
        M.toast({ html: 'Modulo Registrado', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    GetModulos: function GetModulos() {
      var _this5 = this;

      var url = '/getmodulos';
      axios.post(url).then(function (response) {
        _this5.modulos = response.data;
        M.toast({ html: 'Modulos Obtenidos', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });

    this.GetModulos();
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c(
          "button",
          {
            staticClass: "btn modal-trigger waves-effect teal lighten-1 ",
            attrs: { "data-target": "mdlnuevomodulo" }
          },
          [_vm._v("Nuevo\n        ")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn blue-grey lighten-1",
            on: { click: _vm.GetModulos }
          },
          [_vm._v("  Recargar")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _c("table", [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.modulos, function(modulo) {
              return _c("tr", [
                _c("td", [_vm._v(_vm._s(modulo.nombre))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(modulo.competencia))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(modulo.objetivo))]),
                _vm._v(" "),
                _c("td", [
                  modulo.estado == "A"
                    ? _c("strong", { staticClass: "green-text" }, [
                        _vm._v(" Activo")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  modulo.estado == "I"
                    ? _c("strong", { staticClass: "red-text" }, [
                        _vm._v(" Cerrado ")
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c(
                      "router-link",
                      {
                        staticClass:
                          "waves-effect waves-green btn-small btn  indigo",
                        attrs: { to: "/areaconocimiento/" + modulo.id }
                      },
                      [_vm._v("Areas de Conocimiento")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "waves-effect waves-green btn-small btn  cyan darken-1 modal-trigger",
                        attrs: { "data-target": "mdlmodificarmodulo" },
                        on: {
                          click: function($event) {
                            _vm.ViewModificar(modulo)
                          }
                        }
                      },
                      [_vm._v(" Modificar")]
                    ),
                    _vm._v(" "),
                    modulo.estado == "A"
                      ? _c(
                          "button",
                          {
                            staticClass:
                              "waves-effect waves-green btn-small btn   blue-grey",
                            on: {
                              click: function($event) {
                                _vm.Desactivar(modulo.id)
                              }
                            }
                          },
                          [_vm._v(" Desactivar")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    modulo.estado == "I"
                      ? _c(
                          "button",
                          {
                            staticClass:
                              "waves-effect waves-green btn-small btn green accent-4 modal-trigger",
                            on: {
                              click: function($event) {
                                _vm.Activar(modulo.id)
                              }
                            }
                          },
                          [_vm._v(" Activar")]
                        )
                      : _vm._e()
                  ],
                  1
                )
              ])
            })
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevomodulo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(2),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillmodulo.nombre,
                  expression: "fillmodulo.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text" },
              domProps: { value: _vm.fillmodulo.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillmodulo, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(3)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillmodulo.competencia,
                  expression: "fillmodulo.competencia"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text" },
              domProps: { value: _vm.fillmodulo.competencia },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillmodulo, "competencia", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(4)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillmodulo.objetivo,
                  expression: "fillmodulo.objetivo"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text" },
              domProps: { value: _vm.fillmodulo.objetivo },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillmodulo, "objetivo", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(5)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close",
            on: { click: _vm.Registrar }
          },
          [_vm._v("Registrar")]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlmodificarmodulo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(6),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillmodulo2.nombre,
                  expression: "fillmodulo2.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nombre", type: "text" },
              domProps: { value: _vm.fillmodulo2.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillmodulo2, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(7)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillmodulo2.competencia,
                  expression: "fillmodulo2.competencia"
                }
              ],
              staticClass: "validate",
              attrs: { id: "competencia", type: "text" },
              domProps: { value: _vm.fillmodulo2.competencia },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillmodulo2, "competencia", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(8)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillmodulo2.objetivo,
                  expression: "fillmodulo2.objetivo"
                }
              ],
              staticClass: "validate",
              attrs: { id: "objetivo", type: "text" },
              domProps: { value: _vm.fillmodulo2.objetivo },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillmodulo2, "objetivo", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(9)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close",
            on: { click: _vm.Modificar }
          },
          [_vm._v("Modificar")]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col s12", staticStyle: { padding: "5px" } },
      [
        _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
          _vm._v("Modulos")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Modulo")]),
      _vm._v(" "),
      _c("th", [_vm._v("Competencia")]),
      _vm._v(" "),
      _c("th", [_vm._v("Objetivo")]),
      _vm._v(" "),
      _c("th", [_vm._v("Estado")]),
      _vm._v(" "),
      _c("th", [_vm._v("Acciones")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("NUEVO MODULO")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Nombre "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Competencia "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Objetivo "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("MODIFICAR MODULO")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nombre" } }, [
      _vm._v("Nombre "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "competencia" } }, [
      _vm._v("Competencia "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "objetivo" } }, [
      _vm._v("Objetivo "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-543f56e6", module.exports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(117)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(119)
/* template */
var __vue_template__ = __webpack_require__(120)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/administrador/CursosCursandoComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f0c9702", Component.options)
  } else {
    hotAPI.reload("data-v-5f0c9702", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(118);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("1c8e9ded", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5f0c9702\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CursosCursandoComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5f0c9702\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CursosCursandoComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.pagination li.active {\n  background-color: rgb(0,128,128);\n}\n.breadcrumb:before {\ncolor: #999999;\n}\n.breadcrumb {\n  font-size: 18px;\n  color: #999999;\n}\n.breadcrumb:before {\n    color: #999999;\n}\n.breadcrumb:last-child {\n  color: #999999 ;\n}\n", ""]);

// exports


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
var _components$props$dat;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = (_components$props$dat = {
  components: {},
  props: {

    idciclo: String,
    idmatricula: String,
    idmodulo: String
  },
  data: function data() {
    return {
      usuario: global.user,
      fullPage: true,
      isLoading: false,
      cursos: [],
      asignados: [],
      docentes: [],
      fillcurso: { 'id': '', 'curso': '', 'iddocente': '', 'active': false, 'idusuario': '', 'idca': '' },

      fillhorario: { 'idcurso': '', 'dia': '', 'inicio': '', 'termino': '', 'idusuario': '' },

      horarios: [],
      datosciclo: [],
      datosestudiante: [],

      materias: [],
      fillevaluacion: { 'id': '', 'nombre': '', 'nota_aca': '' },

      pagination: { 'total': 0, 'current_page': 0, 'per_page': 0, 'last_page': 0, 'from': 0, 'to': 0 },
      offset: 3,
      page: 1
    };
  }
}, _defineProperty(_components$props$dat, 'components', {
  Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
}), _defineProperty(_components$props$dat, 'computed', {

  isActived: function isActived() {
    return this.pagination.current_page;
  },
  pagesNumber: function pagesNumber() {
    if (!this.pagination.to) {
      return [];
    }

    var from = this.pagination.current_page - this.offset;

    if (from < 1) from = 1;

    var to = from + this.offset * 2;

    if (to >= this.pagination.last_page) to = this.pagination.last_page;

    var pagesArray = [];

    while (from <= to) {
      pagesArray.push(from);
      from++;
    }

    return pagesArray;
  }
}), _defineProperty(_components$props$dat, 'methods', {

  changePage: function changePage(page) {
    this.pagination.current_page = page;
    this.GetCursosCargo(page);
  },
  GetMateria: function GetMateria() {
    var _this = this;

    var url = '/getmateriacursando';
    axios.post(url, { 'idmodulo': this.idmodulo }).then(function (response) {

      _this.materias = response.data;
      M.toast({ html: 'Materias Obtenido', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      M.toast({ html: 'Ocurrio un Error', 'classes': 'red' });
    });
  },


  moment: function (_moment) {
    function moment() {
      return _moment.apply(this, arguments);
    }

    moment.toString = function () {
      return _moment.toString();
    };

    return moment;
  }(function () {
    return moment();
  })

}), _defineProperty(_components$props$dat, 'mounted', function mounted() {

  M.AutoInit();
  this.GetMateria();

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });
}), _components$props$dat);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row container" }, [
      _c(
        "div",
        { staticClass: "col s12" },
        [
          _c(
            "router-link",
            { staticClass: "breadcrumb", attrs: { to: "/promociones" } },
            [_vm._v("Promociones")]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "breadcrumb",
              attrs: { to: "/matricular/" + _vm.idciclo }
            },
            [_vm._v("Matriculados")]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "breadcrumb",
              attrs: {
                to: "/modulomatricula/" + _vm.idciclo + "/" + _vm.idmatricula
              }
            },
            [_vm._v("Modulos")]
          ),
          _vm._v(" "),
          _c("a", { staticClass: "breadcrumb" }, [
            _vm._v("Areas de Conocimiento")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l9 m9" }, [
        _c(
          "table",
          {
            staticClass: "striped responsive-table",
            staticStyle: { "font-size": "12px" }
          },
          [
            _vm._m(0),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.materias, function(materia) {
                return _c("tr", [
                  _c("td", {
                    domProps: { textContent: _vm._s(materia.nombre) }
                  }),
                  _vm._v(" "),
                  _c("td", {
                    domProps: { textContent: _vm._s(materia.nota_aca) }
                  })
                ])
              })
            )
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Area de Conocimiento")]),
      _vm._v(" "),
      _c("th", [_vm._v("Nota "), _c("br"), _c("label", [_vm._v("ACA")])])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5f0c9702", module.exports)
  }
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(122)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(124)
/* template */
var __vue_template__ = __webpack_require__(125)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/JefeDepartamento/AreaConocimientoComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b5e5bfa", Component.options)
  } else {
    hotAPI.reload("data-v-7b5e5bfa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(123);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("0f49a3c2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7b5e5bfa\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AreaConocimientoComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7b5e5bfa\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AreaConocimientoComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n  font-size: 13px;\r\n  color: #999999;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n  color: #999999 ;\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
var _components$props$dat;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = (_components$props$dat = {
  components: {},
  props: {
    idmodulo: String
  },
  data: function data() {
    return {
      usuario: global.user,
      fullPage: true,
      isLoading: false,
      areas: [],
      modulos: [],
      fillevaluacion: { 'id': '', 'caract_personal_nota': '', 'coevaluacion_nota': '', 'nombre': '' },

      fillarea: { 'id': '', 'nombre': '', 'idmodulo': '' },
      fillarea2: { 'id': '', 'nombre': '', 'idmodulo': '' }

    };
  }
}, _defineProperty(_components$props$dat, 'components', {
  Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
}), _defineProperty(_components$props$dat, 'methods', {
  moment: function (_moment) {
    function moment() {
      return _moment.apply(this, arguments);
    }

    moment.toString = function () {
      return _moment.toString();
    };

    return moment;
  }(function () {
    return moment();
  }),
  Activar: function Activar(idarea) {
    var _this = this;

    var url = '/activararea';
    axios.post(url, {
      'idarea': idarea
    }).then(function (response) {
      _this.GetAreas();
      M.toast({ html: 'Area Activado', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  Desactivar: function Desactivar(idarea) {
    var _this2 = this;

    var url = '/desactivararea';
    axios.post(url, {
      'idarea': idarea
    }).then(function (response) {
      _this2.GetAreas();

      M.toast({ html: 'Area Desactivado', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  Modificar: function Modificar() {
    var _this3 = this;

    var url = '/modificararea';
    axios.post(url, this.fillarea2).then(function (response) {
      _this3.GetAreas();
      _this3.fillarea2.id = '';
      _this3.fillarea2.nombre = '';
      M.toast({ html: 'Area Modificado', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  ViewModificar: function ViewModificar(area) {
    this.fillarea2.id = area.id;
    this.fillarea2.nombre = area.nombre;
    document.querySelector("label[for='nombre']").classList.add('active');
  },
  Registrar: function Registrar() {
    var _this4 = this;

    this.fillarea.idmodulo = this.idmodulo;
    var url = '/nuevoarea';
    axios.post(url, this.fillarea).then(function (response) {
      _this4.GetAreas();
      _this4.fillarea.id = '';
      _this4.fillarea.nombre = '';
      M.toast({ html: 'Area Registrado', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  GetAreas: function GetAreas() {
    var _this5 = this;

    var url = '/getareasconocimiento';
    axios.post(url, {
      'idmodulo': this.idmodulo
    }).then(function (response) {
      _this5.areas = response.data;
      M.toast({ html: 'Areas Obtenidos', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  }
}), _defineProperty(_components$props$dat, 'mounted', function mounted() {
  M.AutoInit();

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });

  this.GetAreas();
}), _defineProperty(_components$props$dat, 'computed', {}), _components$props$dat);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l6 m6" }, [
        _c(
          "button",
          {
            staticClass: "btn modal-trigger waves-effect teal lighten-1 ",
            attrs: { "data-target": "mdlnuevomodulo" }
          },
          [_vm._v("Nuevo\n        ")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn blue-grey lighten-1",
            on: { click: _vm.GetAreas }
          },
          [_vm._v("  Recargar")]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "col s12 l6 m6",
          staticStyle: { "text-align": "right" }
        },
        [_c("strong", [_vm._v(_vm._s(_vm.areas.length + " Registros"))])]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _c("table", [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.areas, function(area) {
              return _c("tr", [
                _c("td", [_vm._v(_vm._s(area.nombre))]),
                _vm._v(" "),
                _c("td", [
                  area.estado == "A"
                    ? _c("strong", { staticClass: "green-text" }, [
                        _vm._v(" Activo")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  area.estado == "I"
                    ? _c("strong", { staticClass: "red-text" }, [
                        _vm._v(" Cerrado ")
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c(
                      "router-link",
                      {
                        staticClass:
                          "waves-effect waves-green btn-small btn  indigo",
                        attrs: {
                          to: "/contenidos/" + _vm.idmodulo + "/" + area.id
                        }
                      },
                      [_vm._v("Contenidos Imprescindibles")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "waves-effect waves-green btn-small btn  cyan darken-1 modal-trigger",
                        attrs: { "data-target": "mdlmodificararea" },
                        on: {
                          click: function($event) {
                            _vm.ViewModificar(area)
                          }
                        }
                      },
                      [_vm._v(" Modificar")]
                    ),
                    _vm._v(" "),
                    area.estado == "A"
                      ? _c(
                          "button",
                          {
                            staticClass:
                              "waves-effect waves-green btn-small btn   blue-grey",
                            on: {
                              click: function($event) {
                                _vm.Desactivar(area.id)
                              }
                            }
                          },
                          [_vm._v(" Desactivar")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    area.estado == "I"
                      ? _c(
                          "button",
                          {
                            staticClass:
                              "waves-effect waves-green btn-small btn green accent-4 modal-trigger",
                            on: {
                              click: function($event) {
                                _vm.Activar(area.id)
                              }
                            }
                          },
                          [_vm._v(" Activar")]
                        )
                      : _vm._e()
                  ],
                  1
                )
              ])
            })
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevomodulo" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(2),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillarea.nombre,
                  expression: "fillarea.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text" },
              domProps: { value: _vm.fillarea.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillarea, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(3)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close",
            on: { click: _vm.Registrar }
          },
          [_vm._v("Registrar")]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlmodificararea" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(4),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillarea2.nombre,
                  expression: "fillarea2.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nombre", type: "text" },
              domProps: { value: _vm.fillarea2.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillarea2, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(5)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close",
            on: { click: _vm.Modificar }
          },
          [_vm._v("Modificar")]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col s12", staticStyle: { padding: "5px" } },
      [
        _c("a", { staticClass: "breadcrumb", attrs: { href: "/modulos" } }, [
          _vm._v("Modulos")
        ]),
        _vm._v(" "),
        _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
          _vm._v("Areas de Conocimiento")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Area de Conocimiento")]),
      _vm._v(" "),
      _c("th", [_vm._v("Estado")]),
      _vm._v(" "),
      _c("th", [_vm._v("Acciones")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("NUEVO AREA DE CONOCIMIENTO")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Nombre "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("MODIFICAR AREA DE CONOCIMIENTO")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nombre" } }, [
      _vm._v("Nombre "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7b5e5bfa", module.exports)
  }
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(127)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(129)
/* template */
var __vue_template__ = __webpack_require__(130)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/JefeDepartamento/ContenidoComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-262eeb0e", Component.options)
  } else {
    hotAPI.reload("data-v-262eeb0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(128);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("10f8bfde", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-262eeb0e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ContenidoComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-262eeb0e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ContenidoComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n  font-size: 13px;\r\n  color: #999999;\n}\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n  color: #999999 ;\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
var _components$props$dat;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = (_components$props$dat = {
  components: {},
  props: {
    idmodulo: String,
    idarea: String
  },
  data: function data() {
    return {
      usuario: global.user,
      fullPage: true,
      isLoading: false,
      contenidos: [],
      modulos: [],
      fillevaluacion: { 'id': '', 'caract_personal_nota': '', 'coevaluacion_nota': '', 'nombre': '' },

      fillcontenido: { 'id': '', 'nombre': '', 'idarea': '' },
      fillcontenido2: { 'id': '', 'nombre': '', 'idarea': '' }
    };
  }
}, _defineProperty(_components$props$dat, 'components', {
  Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
}), _defineProperty(_components$props$dat, 'methods', {
  moment: function (_moment) {
    function moment() {
      return _moment.apply(this, arguments);
    }

    moment.toString = function () {
      return _moment.toString();
    };

    return moment;
  }(function () {
    return moment();
  }),
  Activar: function Activar(idcontenido) {
    var _this = this;

    var url = '/activarcontenido';
    axios.post(url, {
      'idcontenido': idcontenido
    }).then(function (response) {
      _this.GetContenido();
      M.toast({ html: 'Contenido Activado', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  Desactivar: function Desactivar(idcontenido) {
    var _this2 = this;

    var url = '/desactivarcontenido';
    axios.post(url, {
      'idcontenido': idcontenido
    }).then(function (response) {
      _this2.GetContenido();

      M.toast({ html: 'Contenido Desactivado', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  Modificar: function Modificar() {
    var _this3 = this;

    var url = '/modificarcontenido';
    axios.post(url, this.fillcontenido2).then(function (response) {
      _this3.GetContenido();
      _this3.fillcontenido2.id = '';
      _this3.fillcontenido2.nombre = '';
      _this3.fillcontenido2.idarea = '';
      M.toast({ html: 'Modulo Modificado', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  ViewModificar: function ViewModificar(contenido) {
    this.fillcontenido2.id = contenido.id;
    this.fillcontenido2.nombre = contenido.nombre;
    this.fillcontenido2.idarea = contenido.idarea;
    document.querySelector("label[for='nombre']").classList.add('active');
  },
  Registrar: function Registrar() {
    var _this4 = this;

    this.fillcontenido.idarea = this.idarea;
    var url = '/nuevocontenido';
    axios.post(url, this.fillcontenido).then(function (response) {
      _this4.GetContenido();
      _this4.fillcontenido.id = '';
      _this4.fillcontenido.nombre = '';
      M.toast({ html: 'Contenido Registrado', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  },
  GetContenido: function GetContenido() {
    var _this5 = this;

    var url = '/getcontenido';
    axios.post(url, {
      'idarea': this.idarea
    }).then(function (response) {
      _this5.contenidos = response.data;
      M.toast({ html: 'Areas Obtenidos', 'classes': 'teal lighten-1' });
    }).catch(function (error) {
      console.log(error.response);
    });
  }
}), _defineProperty(_components$props$dat, 'mounted', function mounted() {
  M.AutoInit();

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });

  this.GetContenido();
}), _defineProperty(_components$props$dat, 'computed', {}), _components$props$dat);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c(
        "div",
        { staticClass: "col s12", staticStyle: { padding: "5px" } },
        [
          _c("a", { staticClass: "breadcrumb", attrs: { href: "/modulos" } }, [
            _vm._v("Modulos")
          ]),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "breadcrumb",
              attrs: { to: "/areaconocimiento/" + _vm.idmodulo }
            },
            [_vm._v("Areas de Conocimiento")]
          ),
          _vm._v(" "),
          _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
            _vm._v("Contenido Imprescindible")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c(
          "button",
          {
            staticClass: "btn modal-trigger waves-effect teal lighten-1",
            attrs: { "data-target": "mdlnuevocontenido" }
          },
          [_vm._v("Nuevo\n        ")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn blue-grey lighten-1",
            on: { click: _vm.GetContenido }
          },
          [_vm._v("  Recargar")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _c("table", [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.contenidos, function(contenido) {
              return _c("tr", [
                _c("td", [_vm._v(_vm._s(contenido.nombre))]),
                _vm._v(" "),
                _c("td", [
                  contenido.estado == "A"
                    ? _c("strong", { staticClass: "green-text" }, [
                        _vm._v(" Activo")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  contenido.estado == "I"
                    ? _c("strong", { staticClass: "red-text" }, [
                        _vm._v(" Cerrado ")
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("td", [
                  _c(
                    "button",
                    {
                      staticClass:
                        "waves-effect waves-green btn-small btn  cyan darken-1 modal-trigger",
                      attrs: { "data-target": "mdlmodificarcontenido" },
                      on: {
                        click: function($event) {
                          _vm.ViewModificar(contenido)
                        }
                      }
                    },
                    [_vm._v(" Modificar")]
                  ),
                  _vm._v(" "),
                  contenido.estado == "A"
                    ? _c(
                        "button",
                        {
                          staticClass:
                            "waves-effect waves-green btn-small btn   blue-grey",
                          on: {
                            click: function($event) {
                              _vm.Desactivar(contenido.id)
                            }
                          }
                        },
                        [_vm._v(" Desactivar")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  contenido.estado == "I"
                    ? _c(
                        "button",
                        {
                          staticClass:
                            "waves-effect waves-green btn-small btn green accent-4 modal-trigger",
                          on: {
                            click: function($event) {
                              _vm.Activar(contenido.id)
                            }
                          }
                        },
                        [_vm._v(" Activar")]
                      )
                    : _vm._e()
                ])
              ])
            })
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlnuevocontenido" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillcontenido.nombre,
                  expression: "fillcontenido.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { type: "text" },
              domProps: { value: _vm.fillcontenido.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillcontenido, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(2)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close",
            on: { click: _vm.Registrar }
          },
          [_vm._v("Registrar")]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "modal", attrs: { id: "mdlmodificarcontenido" } },
      [
        _c("div", { staticClass: "modal-content" }, [
          _vm._m(3),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "input-field col s12 l12 m12" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fillcontenido2.nombre,
                    expression: "fillcontenido2.nombre"
                  }
                ],
                staticClass: "validate",
                attrs: { id: "nombre", type: "text" },
                domProps: { value: _vm.fillcontenido2.nombre },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.fillcontenido2, "nombre", $event.target.value)
                  }
                }
              }),
              _vm._v(" "),
              _vm._m(4)
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "modal-footer" }, [
          _c(
            "button",
            {
              staticClass:
                "waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close",
              on: { click: _vm.Modificar }
            },
            [_vm._v("Modificar")]
          ),
          _vm._v(" "),
          _c(
            "button",
            { staticClass: "modal-close waves-effect waves-green btn-flat" },
            [_vm._v("Salir")]
          )
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("Contenido Imprescindible")]),
      _vm._v(" "),
      _c("th", [_vm._v("Estado")]),
      _vm._v(" "),
      _c("th", [_vm._v("Acciones")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("NUEVO CONTENIDO")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Nombre "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("MODIFICAR CONTENIDO")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nombre" } }, [
      _vm._v("Nombre "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-262eeb0e", module.exports)
  }
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(132)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(134)
/* template */
var __vue_template__ = __webpack_require__(135)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/JefeDepartamento/ModuloMatriculaComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3cdfb3bf", Component.options)
  } else {
    hotAPI.reload("data-v-3cdfb3bf", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(133);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(5)("222f490f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3cdfb3bf\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ModuloMatriculaComponent.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3cdfb3bf\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ModuloMatriculaComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n.breadcrumb:before {\r\n    color: #999999;\n}\n.breadcrumb {\r\n \r\n  font-size: 13px;\r\n \r\n  color: #999999;\n}\n.breadcrumb:before {\r\n \r\n    color: #999999;\n}\n.breadcrumb:last-child {\r\n \r\n  color: #999999 ;\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_loading_overlay_dist_vue_loading_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    idciclo: String,
    idmatricula: String
  },
  data: function data() {
    return {
      usuario: global.user,
      fullPage: true,
      isLoading: false,
      modulos: [],
      fillevaluacion: { 'id': '', 'caract_personal_nota': '', 'coevaluacion_nota': '', 'nombre': '', 'nota_aig': '' }
    };
  },

  components: {
    Loading: __WEBPACK_IMPORTED_MODULE_0_vue_loading_overlay___default.a
  },
  methods: {
    moment: function (_moment) {
      function moment() {
        return _moment.apply(this, arguments);
      }

      moment.toString = function () {
        return _moment.toString();
      };

      return moment;
    }(function () {
      return moment();
    }),
    RegistrarNota: function RegistrarNota() {
      var _this = this;

      var url = '/registrarnotamodulo';
      axios.post(url, this.fillevaluacion).then(function (response) {
        _this.GetModulos();
        M.toast({ html: 'Notas Registrados', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    Evaluar: function Evaluar(modulo) {

      this.fillevaluacion.id = modulo.idmc;
      this.fillevaluacion.caract_personal_nota = modulo.caract_personal_nota;
      this.fillevaluacion.coevaluacion_nota = modulo.coevaluacion_nota;
      this.fillevaluacion.nota_aig = modulo.nota_aig;
      this.fillevaluacion.nombre = modulo.nombre;
      document.querySelector("label[for='nombre']").classList.add('active');
      document.querySelector("label[for='nota1']").classList.add('active');
      document.querySelector("label[for='nota2']").classList.add('active');
      document.querySelector("label[for='nota3']").classList.add('active');
    },
    GetModulos: function GetModulos() {
      var _this2 = this;

      var url = '/getmodulosmatricula';
      axios.post(url, {
        'idmatricula': this.idmatricula
      }).then(function (response) {
        _this2.modulos = response.data;
        M.toast({ html: 'Modulos Obtenidos', 'classes': 'teal lighten-1' });
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    ScritpActive: function ScritpActive() {

      document.querySelector("label[for='nombrehMOD']").classList.add('active');
      document.querySelector("label[for='siglahMOD']").classList.add('active');
    }
  },
  mounted: function mounted() {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
    });

    this.GetModulos();
  },
  computed: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "vld-parent" },
      [
        _c("loading", {
          attrs: {
            active: _vm.isLoading,
            "can-cancel": false,
            color: "#008080",
            "is-full-page": _vm.fullPage
          },
          on: {
            "update:active": function($event) {
              _vm.isLoading = $event
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c(
        "div",
        { staticClass: "col s12", staticStyle: { padding: "5px" } },
        [
          _c(
            "router-link",
            {
              staticClass: "breadcrumb",
              attrs: { to: "/matricular/" + _vm.idciclo }
            },
            [_vm._v("Matricula")]
          ),
          _vm._v(" "),
          _c("a", { staticClass: "breadcrumb", attrs: { href: "" } }, [
            _vm._v("Modulos")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 l12 m12" }, [
        _c(
          "button",
          {
            staticClass: "waves-effect waves-light btn blue-grey lighten-1",
            on: { click: _vm.GetModulos }
          },
          [_vm._v("  Recargar")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col s12 container" }, [
        _c("table", [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.modulos, function(modulo) {
              return _c("tr", [
                _c("td", [_vm._v(_vm._s(modulo.nombre))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(modulo.caract_personal_nota))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(modulo.coevaluacion_nota))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(modulo.nota_aig))]),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c(
                      "router-link",
                      {
                        staticClass:
                          "waves-effect waves-green btn-small btn  indigo",
                        attrs: {
                          to:
                            "/asignaturas/" +
                            _vm.idciclo +
                            "/" +
                            _vm.idmatricula +
                            "/" +
                            modulo.idmc
                        }
                      },
                      [_vm._v("Areas de Conocimiento")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "waves-effect waves-green btn-small btn teal lighten-1 modal-trigger",
                        attrs: { "data-target": "mdlevaluar" },
                        on: {
                          click: function($event) {
                            _vm.Evaluar(modulo)
                          }
                        }
                      },
                      [_vm._v(" Evaluar")]
                    )
                  ],
                  1
                )
              ])
            })
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", attrs: { id: "mdlevaluar" } }, [
      _c("div", { staticClass: "modal-content" }, [
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "input-field col s12 l12 m12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.nombre,
                  expression: "fillevaluacion.nombre"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nombre", type: "text", disabled: "" },
              domProps: { value: _vm.fillevaluacion.nombre },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillevaluacion, "nombre", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(2)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.caract_personal_nota,
                  expression: "fillevaluacion.caract_personal_nota"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nota1", type: "number" },
              domProps: { value: _vm.fillevaluacion.caract_personal_nota },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillevaluacion,
                    "caract_personal_nota",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(3)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.coevaluacion_nota,
                  expression: "fillevaluacion.coevaluacion_nota"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nota2", type: "number" },
              domProps: { value: _vm.fillevaluacion.coevaluacion_nota },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.fillevaluacion,
                    "coevaluacion_nota",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _vm._m(4)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "input-field col s4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fillevaluacion.nota_aig,
                  expression: "fillevaluacion.nota_aig"
                }
              ],
              staticClass: "validate",
              attrs: { id: "nota3", type: "number" },
              domProps: { value: _vm.fillevaluacion.nota_aig },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.fillevaluacion, "nota_aig", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _vm._m(5)
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass:
              "waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close",
            on: { click: _vm.RegistrarNota }
          },
          [_vm._v("Registrar")]
        ),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "modal-close waves-effect waves-green btn-flat" },
          [_vm._v("Salir")]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("th", [_vm._v("MODULO")]),
      _vm._v(" "),
      _c("th", [
        _vm._v("NOTA "),
        _c("br"),
        _c("label", [_vm._v("Caracteristica Personal")])
      ]),
      _vm._v(" "),
      _c("th", [
        _vm._v("NOTA "),
        _c("br"),
        _c("label", [_vm._v("Coevaluación")])
      ]),
      _vm._v(" "),
      _c("th", [
        _vm._v("NOTA "),
        _c("br"),
        _c("label", [_vm._v("Actividad Integradora Grupal")])
      ]),
      _vm._v(" "),
      _c("th", [_vm._v("ACCIONES")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("strong", [_vm._v("EVALUAR MODULO")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nombre" } }, [
      _vm._v("Modulo "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nota1" } }, [
      _vm._v("Caracteristica Personal "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nota2" } }, [
      _vm._v("Coevaluación "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "nota3" } }, [
      _vm._v("Actividad Integradora Grupal "),
      _c("span", { staticClass: "red-text" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3cdfb3bf", module.exports)
  }
}

/***/ })
/******/ ]);