(function () {
	'use strict';

	angular
		.module('martita')
		.factory('AlunoFactory', AlunoFactory);

	/* @ngInject */
	function AlunoFactory($firebaseObject) {
		return function (ref) {
			var cached = {};
			cached.$load = function (id) {
				if (!cached.hasOwnProperty(id)) {
					cached[id] = $firebaseObject(ref.child(id));
				}
				return cached[id];
			};
			cached.$dispose = function () {
				angular.forEach(cached, function (user) {
					user.$destroy();
				});
			};
			cached.$remove = function (id) {
				delete cached[id];
				ref.child(id).remove();
			};
			return cached;
		}
	}

})();