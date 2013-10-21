'use strict';

describe('Controller: RankingsCtrl', function () {

  // load the controller's module
  beforeEach(module('PongorithmApp.controllers'));

  var $scope,
    $controller,
    PlayerService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    $scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
    PlayerService = $injector.get('PlayerService');
  }));

  function createCtrl() {
    return $controller('RankingsCtrl', {
      $scope: $scope,
      PlayerService: PlayerService
    });
  }

  it('should get all players from service', function () {
    spyOn(PlayerService, 'getAllPlayers').andReturn([{ name: 'player one', rank: 120 }]);

    createCtrl();

    expect(PlayerService.getAllPlayers.calls.length).toBe(1);
    expect($scope.allPlayers.length).toBe(1);
  });
});
