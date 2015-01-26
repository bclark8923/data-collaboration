(function() {
  'use strict';

  angular
    .module('data-collaboration.controllers')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', '$location', 'authService'];

  function AuthController($scope, $location, authService) {

    $scope.login = function() {
      delete $scope.error;
      
      var username = $scope.email;
      var password = $scope.password;

      authService.login(username, password)
        .success(function(data) {
          if(data.organizations.length > 0) {
            $location.url('/organization/'+data.organizations[0]);
          } else {
            $location.url('/create/organization');
          }
        }).error(function(data) {
          $scope.error = "Invalid Email/Password";
        });
    };

    $scope.signup = function() {
      delete $scope.error;

      var name = $scope.name;
      var username = $scope.email;
      var password = $scope.password;

      authService.signup(name, username, password)
        .success(function(data) {
          // if(data.organizations.length > 0) {
            // $location.url('/organization/'+data.organizations[0]);
          // } else {
            $location.url('/create/organization');
          // }
        }).error(function(data) {
          $scope.error = data.error;
        });
    };
  };
})();

