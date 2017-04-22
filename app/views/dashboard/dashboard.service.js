(function () {
    'use strict';

    angular
        .module('martita')
        .service('DashboardService', DashboardService);

    /* @ngInject */
    function DashboardService($firebaseArray) {
        var self = this;

        self.obterDadosMartita = obterDadosMartita;
        function obterDadosMartita() {
            return $firebaseArray(
                firebase.database().ref()
                    .child('martita')
                    .orderByChild("tempo/day")
                    .limitToLast(40));
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

