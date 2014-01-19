(function() {
    'use strict';

    angular.module('lib.lodash', [])
        .factory('_', function() {
            return window._;
        });

    angular.module('lib.io', [])
        .factory('io', function() {
            return window.io;
        });
})();