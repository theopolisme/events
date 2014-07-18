/**
 * <https://github.com/theopolisme/events>
 * Copyright (c) 2014 Theopolisme <theopolismewiki@gmail.com>
 */
(function(a,b){if(typeof define==="function"&&define.amd){define([],b)}else{if(typeof exports==="object"){module.exports=b()}else{a.Events=b()}}}(this,function(){function a(f){var d,c={},b=typeof f!=="undefined";if(b){for(d=0;d<f.length;d++){c[f[d]]=[]}}function e(g){if(!c.hasOwnProperty(g)){if(b){throw'Events: The event "'+g+'" is not defined.'}else{c[g]=[]}}}return{on:function(g,h){e(g);c[g].push(h)},one:function(g,h){e(g);c[g].push(function(){h.apply(null,arguments);c[g].splice(c[g].indexOf(this),1)})},off:function(g,i){var h;e(g);if(i){h=c[g].indexOf(i);if(h!==-1){c[g].splice(h,1)}}else{c[g]=[]}},fire:function(g){var h,j;e(g);j=c[g];for(h=0;h<j.length;h++){j[h].apply(null,Array.prototype.slice.call(arguments,1))}}}}return function(){return a.apply(Object.create(a.prototype),arguments)}}));
