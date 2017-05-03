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
                    .limitToLast(68));
        }
    }

})();