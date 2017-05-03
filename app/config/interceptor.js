(function () {

	'use strict';

	var interceptor = function ($q) {

		var interceptor = {};

		function request(config) {
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