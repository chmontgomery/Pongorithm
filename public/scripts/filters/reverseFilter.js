'use strict';

angular.module('PongorithmApp')
    .filter('reverse', function() {
        return function(items) {
            if (items && items.length > 1) {
                return items.slice().reverse();
            }
            return items;
        };
    });