(function () {

	'use strict';

	var interceptor = function ($q, AuthService, $location) {

		var interceptor = {};

		function request(config) {
			// if (!AuthService.isUsuarioLogado()) {
			// 	config.url = 'views/login/login.html';
			// 	$location.path('/login');
			// }
			return config;
		}

		function response(result) {
			return result;
		}

		function responseError(rejection) {
			if (rejection.status === 403) {
				console.log('Failed with', rejection, 'status');
			}
			return $q.reject(rejection);
		}

		interceptor.request = request;
		interceptor.response = response;
		interceptor.responseError = responseError;

		return interceptor;
	};

	angular
		.module('martita')
		.config(function ($httpProvider) {
			$httpProvider.interceptors.push(interceptor);
		});


})();