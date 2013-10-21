'use strict';

describe('Controller: RankingsCtrl', function () {

    // load the controller's module
    beforeEach(module('PongorithmApp.controllers'));

    var $scope,
        $controller,
        $q,
        PlayerService,
        ModalService,
        deferred;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $controller = $injector.get('$controller');
        PlayerService = $injector.get('PlayerService');
        $q = $injector.get('$q');
        ModalService = $injector.get('ModalService');
        deferred = $q.defer();
    }));

    function createCtrl() {
        return $controller('RankingsCtrl', {
            $scope: $scope,
            $q: $q,
            PlayerService: PlayerService,
            ModalService: ModalService
        });
    }

    it('should get all players from service', function () {
        spyOn(PlayerService, 'getAllPlayers').andReturn(deferred.promise);

        createCtrl();

        deferred.resolve([{ name: 'player one', rank: 120 }]);

        $scope.$root.$digest();

        expect(PlayerService.getAllPlayers.calls.length).toBe(1);
        expect($scope.allPlayers.length).toBe(1);
    });
});
