(function() {
  'use strict';

  angular
    .module('data-collaboration.services')
    .factory('homeService', homeService);

  homeService.$inject = ['$http'];

  function homeService($http) {
    return {
      createQuestion: createQuestion,
      getQuestions: getQuestions
    }

    function createQuestion(question, domain) {
      var param = {
        question: question
      }

      return $http({
        url:'/organization/'+domain+'/question/create', 
        method: "POST",
        data: param,
        headers: {'Content-Type': 'application/json'}
      });
    }

    function getQuestions(domain) {
      return $http({
        url:'/organization/'+domain+'/questions', 
        method: "GET"
      });
    }

  };
})();