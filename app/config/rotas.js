(function () {
	'use strict';

	angular
		.module('martita')
		.config(config);

	/* @ngInject */
	function config($stateProvider) {

		const main = {
			name: 'main',
			url: '/main',
			templateUrl: 'views/main/main.html',
			controller: 'MainController',
			controllerAs: 'vm'
		};

		$stateProvider
			.state('main', main)
	}

})();