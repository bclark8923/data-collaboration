(function() {
  'use strict';

  angular
    .module('data-collaboration.services')
    .factory('organizationService', organizationService);

  organizationService.$inject = ['$http'];

  function organizationService($http) {
    return {
      createOrganization: createOrganization,
      getOrganization: getOrganization//,
      // getOrganizations: getOrganizations
    }

    function createOrganization(name, domain) {
      var param = {
        name: name,
        domain: domain
      }

      return $http({
        url:'/organization/create', 
        method: "POST",
        data: param, 
        headers: {'Content-Type': 'application/json'}
      });
    }

    function getOrganization(domain) {
      return $http({
        url:'/organization/'+domain, 
        method: "GET"
      });
    }

  };
})();