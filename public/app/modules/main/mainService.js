(function() {
  'use strict';

  angular
    .module('data-collaboration.services')
    .factory('mainService', mainService);

  mainService.$inject = ['$http'];

  function mainService($http) {
    return {
    }

  };
})();