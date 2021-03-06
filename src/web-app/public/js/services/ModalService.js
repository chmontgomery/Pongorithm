(function() {
    'use strict';

    angular.module('PongorithmApp.services.modal', [])
        .factory('ModalService', function () {
            var error = function(title, message) {
                title = title || "Ugh";
                message = message || "Sorry, there was an unexpected error. Please try again.";
                // TODO
                console.log(title, message);
            };

            return {
                error: error
            };
        });
})();
