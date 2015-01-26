(function() {
  'use strict';

  angular.module('data-collaboration').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      var checkLoggedin = function($q, $timeout, $http, $location){ 
        // Initialize a new promise 
        var deferred = $q.defer(); 

        // Make an AJAX call to check if the user is logged in 
        $http.get('/loggedin').success(function(user){ 
          // Authenticated 
          if (user !== '0') {
            $timeout(deferred.resolve); 
          }
          // Not Authenticated 
          else { 
            $timeout(deferred.reject); 
            $location.url('/login'); 
          } 
        });

        return deferred.promise;
      };

      $urlRouterProvider.otherwise('/login');

      $stateProvider
        .state('main', {
          templateUrl: 'modules/main/main.html',
          controller: 'MainController', 
          controllerAs: 'vm',
          resolve: { 
            loggedin: checkLoggedin,
            orgName: ['organizationService', '$stateParams', function(organizationService, $stateParams) {
              return organizationService.getOrganization($stateParams.orgDomain);
            }]
          }
        })
        .state('create-organization', {
          url: '/create/organization',
          templateUrl: 'modules/organization/create.html',
          controller: 'OrganizationController', 
          resolve: { 
            loggedin: checkLoggedin 
          }
        })
        .state('main.home', {
          url: '/organization/:orgDomain',
          templateUrl: 'modules/home/home.html',
          controller: 'HomeController', 
          controllerAs: 'vm',
          resolve: { 
            loggedin: checkLoggedin,
            questions: ['homeService', '$stateParams', function(homeService, $stateParams) {
              return homeService.getQuestions($stateParams.orgDomain);
            }]
          }
        })
        // .state('main.question', {
        //   url: '/organization/:orgDomain/question/:questionId',
        //   templateUrl: 'modules/home/question.html',
        //   controller: 'HomeController', 
        //   controllerAs: 'vm',
        //   resolve: { 
        //     loggedin: checkLoggedin,
        //     question: ['homeService', '$stateParams', function(homeService, $stateParams) {
        //       return homeService.getQuestion($stateParams.orgDomain, $stateParams.questionId);
        //     }]
        //   }
        // })
        .state('auth', {
          templateUrl: 'modules/auth/auth.html',
          controller: 'AuthController'
        })
        .state('auth.login', {
          url: '/login',
          templateUrl: 'modules/auth/login.html',
          controller: 'AuthController'
        })
        .state('auth.signup', {
          url: '/signup',
          templateUrl: 'modules/auth/signup.html',
          controller: 'AuthController'
        });
    }
  ]);
})();