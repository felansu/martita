(function () {

	'use strict';

	angular
		.module('martita')
		.controller('MainController', MainController);

	/* @ngInject */
	function MainController($state, $mdSidenav, $firebaseArray) {

		var vm = this;

		vm.showMobileMainHeader = true;
		vm.todos = [];

		vm.openSideNavPanel = openSideNavPanel;
		vm.closeSideNavPanel = closeSideNavPanel;
		vm.alterarRota = alterarRota;

		init('main');

		function init(rota) {
			$state.go(rota);
			firebaseInit();
		}

		function firebaseInit() {
			if (!firebase.apps.length) {
				var config = {
					databaseURL: "https://martita-50f93.firebaseio.com"
				};
				firebase.initializeApp(config);
			}
			watchMartita();
		}

		function watchMartita() {
			var ref = firebase.database().ref('martita').limitToLast(100);
			vm.todos = $firebaseArray(ref);
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