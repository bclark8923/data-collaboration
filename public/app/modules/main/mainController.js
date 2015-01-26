(function() {
  'use strict';

  angular
    .module('data-collaboration.controllers')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$location', 'authService', 'organizationService', 'orgName'];

  function MainController($scope, $location, authService, organizationService, orgName) {
    var vm = this;
    vm.organizationName = orgName.data;

    // init();

    $scope.logout = function() {
      authService.logout()
        .success(function(data) {
          $location.url('/login');
        }).error(function(data) {
          $location.url('/login');
        });
    }

    // function init() {
      // vm.organizationName = 'test';//orgName.data;
    // }

  };
})();

