(function () {
	'use strict';

	angular
		.module('martita')
		.service('MainService', MainService);

	/* @ngInject */
	function MainService($firebaseArray) {
		var self = this;

		self.obterDadosMartita = obterDadosMartita;

		function obterDadosMartita() {
			abreConexao();
			var ref = firebase.database().ref('martita').limitToLast(100);
			return $firebaseArray(ref);
		}

		function abreConexao() {
			if (existeConexaoAberta()) {
				var config = {
					databaseURL: "https://martita-50f93.firebaseio.com"
				};
				firebase.initializeApp(config);
			}
		}

		function existeConexaoAberta() {
			return !firebase.apps.length
		}
	}

})();

