(function () {

    'use strict';

    angular
        .module('martita')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController($scope, $state, $mdSidenav, AuthService, $location, $filter, DashboardService) {

        var vm = this;

        vm.openSideNavPanel = openSideNavPanel;
        vm.closeSideNavPanel = closeSideNavPanel;
        vm.alterarRota = alterarRota;
        vm.dataTemperaturas = [];
        vm.dataUmidades = [];
        vm.dataSolo = [];
        vm.seriesTemperatura = ['Temperatura'];
        vm.seriesUmidade = ['Umidade'];
        vm.seriesSolo = ['Solo'];

        init();

        function init() {
            AuthService.firebaseIsInitialized();
            $state.go('dashboard');
            vm.result = DashboardService.obterDadosMartita();
            $scope.$applyAsync();
            vm.result.$loaded().then(function(result) {
                vm.datas = [];
                vm.temperaturas = [];
                vm.umidades = [];
                vm.solo = [];
                vm.tempo = [];
                for (var i = 0; i < vm.result.length; i++) {
                    var obj = vm.result[i];
                    var tempo = obj.tempo.hours + ':' + obj.tempo.minutes;
                    vm.temperaturas.push(obj.temperatura);
                    vm.umidades.push(obj.umidade);
                    vm.solo.push(obj.solo);
                    vm.tempo.push(tempo);
                    vm.datas.push($filter('date')(obj.data, "h:mm"));
                }
                vm.dataTemperaturas.push(vm.temperaturas);
                vm.dataUmidades.push(vm.umidades);
                vm.dataSolo.push(vm.solo);
                vm.labels = vm.tempo;
            }).catch(function(error) {
                console.error("Error:", error);
            });

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

        function isUsuarioLogado() {
            return AuthService.isUsuarioLogado();
        }

        function signOut() {
            AuthService.signOut().then(function () {
                $state.go('login');
                $location.url('login');
            });
        }

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
    }
})();