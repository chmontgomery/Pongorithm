(function() {
    'use strict';

    angular.module('PongorithmApp.filters', [])
        .filter('reverse', function() {
            return function(items) {
                if (items && items.length > 1) {
                    return items.slice().reverse();
                }
                return items;
            };
        });
})();
