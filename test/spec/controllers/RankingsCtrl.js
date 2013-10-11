'use strict';

describe('Controller: RankingsCtrl', function () {

  // load the controller's module
  beforeEach(module('PongorithmApp'));

  var RankingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RankingsCtrl = $controller('RankingsCtrl', {
      $scope: scope
    });
  }));

  it('should not blow up', function () {
    expect(true).toBe(true);
  });
});
