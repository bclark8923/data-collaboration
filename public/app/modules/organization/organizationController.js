(function() {
  'use strict';

  angular
    .module('data-collaboration.controllers')
    .controller('OrganizationController', OrganizationController);

  OrganizationController.$inject = ['$scope', '$location', 'organizationService'];

  function OrganizationController($scope, $location, organizationService) {
    $scope.create = function() {
      var name = $scope.createName;
      var domain = $scope.createDomain

      if(!name || name.trim() === '') {
        $scope.error = "Please set a name";
      }

      if(!domain || domain.trim() === '') {
        $scope.error = "Please set a domain";
      }

      organizationService.createOrganization(name, domain)
        .success(function(data) {
          $location.url('/organization/'+data.domain);
        })
        .error(function(data) {
          $scope.error = "Error creating ";
        });
    }
  };
})();

