(function () {
	'use strict';

	angular
		.module('martita')
		.directive('fsSelect', fsSelect);

	/* @ngInject */
	function fsSelect() {
		var directive = {
			restrict: 'E',
			require: '^form',
			templateUrl: 'shared/directives/fs-select/fs-select.template.html',
			link: link,
			scope: {
				largura: '@',
				icone: '@',
				tamanhoIcone: '@',
				mensagem: '@',
				show: '@',
				keyAsValue: '=',
				lista: '=',
				ngModel: '=',
				function: '=',
				ngRequired: '=',
				control: '='
			}
		};
		return directive;

		function link($scope, element, attrs, formCtrl) {
			$scope.formCtrl = formCtrl;
			$scope.selectName = 'fsSelect' + $scope.$id;
			$scope.selectControl = $scope.control || {};
			$scope.largura = $scope.largura ? $scope.largura : '12';
			$scope.tamanhoIcone = $scope.tamanhoIcone ? $scope.tamanhoIcone : '48';
			var lista = $scope.lista ? $scope.lista : [];

			if (typeof $scope.function === 'function') {
				$scope.function().then(function (result) {
					lista = result;
				});
			}

			$scope.getLista = function () {
				return lista;
			};
		}
	}

})();