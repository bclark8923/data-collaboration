(function() {
	'use strict';

	angular.module('data-collaboration', [
	    'ui.router',
	    'data-collaboration.controllers',
	    'data-collaboration.services'
	]);

	angular
	    .module('data-collaboration.controllers', []);
	angular
	    .module('data-collaboration.services', []);
})();