define( [
	"./core",
	"./core/nodeName",
	"./core/camelCase",
	"./core/toType",
	"./var/isFunction",
	"./var/isWindow",
	"./var/slice",

	"./deprecated/ajax-event-alias",
	"./deprecated/event"
], function( jQuery, nodeName, camelCase, toType, isFunction, isWindow, slice ) {

"use strict";

// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s$" at each space position.
// It is important that non-whitespace char is mandatory for regexp performance reasons,
// however, it does not break correctness since whitespace-only string will be trimmed by ltrim above.
var ltrim = /^[\s\uFEFF\xA0]+/,
	rtrim = /([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/,
	useDefaultTrim = false;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

if ( String.prototype.trim ) {
	useDefaultTrim = "_" === " \uFEFF\xA0_\uFEFF\xA0 ".trim();
}

if ( useDefaultTrim ) {
	jQuery.trim = function( text ) {
		return text == null ?
			"" :
			( text + "" ).trim();
	};
} else {
	jQuery.trim = function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( ltrim, "" ).replace( rtrim, "$1" );
	};
}
} );
