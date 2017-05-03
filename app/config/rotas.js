(function () {
	'use strict';

	angular
		.module('martita')
		.config(config);

	/* @ngInject */
	function config($stateProvider) {

		const dashboard = {
			name: 'dashboard',
			url: '',
			templateUrl: 'views/dashboard/dashboard.html',
			controller: 'DashboardController',
			controllerAs: 'vm'
		};

		$stateProvider
			.state('dashboard', dashboard);

	}

})();