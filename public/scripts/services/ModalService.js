'use strict';

angular.module('PongorithmApp')
    .factory('ModalService', function () {
        var error = function(message) {
            // TODO
            alert(message);
        };

        return {
            error: error
        }
    });