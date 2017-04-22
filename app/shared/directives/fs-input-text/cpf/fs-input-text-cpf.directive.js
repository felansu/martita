(function () {
	'use strict';

	angular
		.module('martita')
		.directive('fsInputTextCpf', fsInputTextCpf);

	/* @ngInject */
	function fsInputTextCpf(FsAlertService) {
		var directive = {
			restrict: 'E',
			require: '^form',
			templateUrl: 'shared/directives/fs-input-text/cpf/fs-input-text-cpf.template.html',
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
			$scope.inputName = 'fsInputTextCpf' + $scope.$id;
			$scope.tipo = $scope.tipo ? $scope.tipo : 'text';

			var input = angular.element(element.children()[0]);
			input.bind('keyup', function (value) {
				var valorDigitado = angular.element("#" + value.target.id).val();
				if (valorDigitado.length == 14 && $scope.ngModel == null) {
					FsAlertService.showSuccess('CPF Inv�lido!');
				}
			});
		}
	}

})();