'use strict';

angular.module('PongorithmApp')
	.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});