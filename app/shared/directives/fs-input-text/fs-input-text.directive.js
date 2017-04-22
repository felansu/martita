(function () {
	'use strict';

	angular
		.module('martita')
		.directive('fsInputText', fsInputText);

	/* @ngInject */
	function fsInputText() {
		var directive = {
			restrict: 'E',
			require: '^form',
			templateUrl: 'shared/directives/fs-input-text/fs-input-text.template.html',
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
			$scope.inputName = 'fsInputText' + $scope.$id;
			$scope.tipo = $scope.tipo ? $scope.tipo : 'text';
		}
	}

})();