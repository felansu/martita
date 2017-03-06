(function () {

	'use strict';

	angular
		.module('martita')
		.controller('MainController', MainController);

	/* @ngInject */
	function MainController($state, $mdSidenav, MainService) {

		var vm = this;

		vm.showMobileMainHeader = true;
		vm.todos = [];

		vm.openSideNavPanel = openSideNavPanel;
		vm.closeSideNavPanel = closeSideNavPanel;
		vm.alterarRota = alterarRota;

		init('main');

		function init(rota) {
			$state.go(rota);
			vm.todos = MainService.obterDadosMartita();
		}

		function alterarRota(state) {
			$state.go(state);
			closeSideNavPanel();
		}

		function openSideNavPanel() {
			$mdSidenav('left').open();
		}

		function closeSideNavPanel() {
			$mdSidenav('left').close();
		}

	}
})();