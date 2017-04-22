(function () {
	'use strict';

	angular.module('martita')
		.service('FsAlertService', FsAlertService);

	function FsAlertService() {

		var self = this;

		self.showSuccess = showSuccess;
		self.showError = showError;
		self.showInfo = showInfo;

		function showSuccess(mensagem) {
			Materialize.toast(mensagem || 'Sucesso', 1000, 'rounded');
		}

		function showError(mensagem) {
			Materialize.toast(mensagem || 'Erro', 1000, 'rounded');
		}

		function showInfo(mensagem) {
			Materialize.toast(mensagem || 'Informação', 1000, 'rounded');
		}
	}

})();

