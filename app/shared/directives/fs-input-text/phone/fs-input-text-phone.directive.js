(function () {
	'use strict';

	angular
		.module('martita')
		.directive('fsInputTextPhone', fsInputTextPhone);

	/* @ngInject */
	function fsInputTextPhone() {
		var directive = {
			restrict: 'E',
			require: '^form',
			templateUrl: 'shared/directives/fs-input-text/phone/fs-input-text-phone.template.html',
			link: link,
			scope: {
				label: '@',
				largura: '@',
				icone: '@',
				tamanho: '@',
				tipo: '@',
				ngModel: '=',
				ngRequired: '='
			}
		};
		return directive;

		function link($scope, element, attrs, formCtrl) {
			$scope.formCtrl = formCtrl;
			$scope.inputName = 'fsInputTextPhone' + $scope.$id;
			$scope.tipo = $scope.tipo ? $scope.tipo : 'text';
		}
	}

})();