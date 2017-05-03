(function () {
    'use strict';

    angular
        .module('martita')
        .service('DashboardService', DashboardService);

    /* @ngInject */
    function DashboardService(FsService, $firebaseArray) {
        this.getFsService = getFsService;

        function getFsService() {
            var fs = new FsService();
            fs.entidadeFirebase = 'martita';
            fs.listaEntidades = $firebaseArray(firebase.database().ref().child(fs.entidadeFirebase)
                .limitToLast(120));

            return fs;
        }
    }

})();