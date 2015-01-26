(function() {
  'use strict';

  angular
    .module('data-collaboration.controllers')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$location', '$stateParams', 'homeService', 'questions'];

  function HomeController($scope, $location, $stateParams, homeService, questions) {
    var vm = this;
    vm.questions = questions.data;

    // $scope.questions = ['q1', 'q2'];

    $scope.addQuestion = function() {
      var question = vm.question;

      if(!question || question.trim() === '') {
        alert('Input a question');
        return;
      }

      homeService.createQuestion(question, $stateParams.orgDomain)
        .success(function(data){
          console.log('success: ', data);
        }).error(function(err){
          console.log('error: ', err);

        });
    }

  };
})();

