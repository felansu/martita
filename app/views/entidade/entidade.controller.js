(function () {
	'use strict';

	angular
		.module('martita')
		.controller('AlunoController', AlunoController);

	/* @ngInject */
	function AlunoController(AlunoService, InstituicaoService) {
		var vm = this;

		vm.alunoService = AlunoService.getFsService();
		vm.instituicaoService = InstituicaoService.getFsService();

	}

})();

