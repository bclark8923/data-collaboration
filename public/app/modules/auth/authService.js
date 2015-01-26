(function() {
  'use strict';

  angular
    .module('data-collaboration.services')
    .factory('authService', authService);

  authService.$inject = ['$http'];

  function authService($http) {
    return {
      login: login,
      signup: signup,
      logout: logout
    }

    function login(email, password) {
      var param = {
        username: email,
        password: password
      }

      return $http({
        url:'/auth/login', 
        method: "POST",
        data: param, 
        headers: {'Content-Type': 'application/json'}
      });
    }

    function signup(name, email, password) {
      var param = {
        username: email,
        password: password,
        name: name
      }

      return $http({
        url:'/auth/signup', 
        method: "POST",
        data: param, 
        headers: {'Content-Type': 'application/json'}
      });
    }

    function logout() {
      return $http({
        url:'/auth/logout', 
        method: "POST"
      });
    }

  };
})();