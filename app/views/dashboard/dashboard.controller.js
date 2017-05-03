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
            vm.result.$loaded().then(function (result) {
                vm.temperaturas = [];
                vm.umidades = [];
                vm.solo = [];
                vm.tempo = [];
                for (var i = 0; i < result.length; i++) {
                    var obj = result[i];
                    var tempo = obj.tempo.hours;
                    vm.tempo[tempo] = vm.tempo[tempo] ? vm.tempo[tempo] : [];
                    vm.tempo[tempo]['temperatura'] = vm.tempo[tempo]['temperatura'] ?
                        vm.tempo[tempo]['temperatura'] : [];
                    vm.tempo[tempo]['umidade'] = vm.tempo[tempo]['umidade'] ? vm.tempo[tempo]['umidade'] : [];
                    vm.tempo[tempo]['solo'] = vm.tempo[tempo]['solo'] ? vm.tempo[tempo]['solo'] : [];

                    vm.tempo[tempo]['temperatura'].push(obj.temperatura);
                    vm.tempo[tempo]['umidade'].push(obj.umidade);
                    vm.tempo[tempo]['solo'].push(obj.solo);
                    if(i === result.length-1){
                        vm.ultimaTemperatura = obj.temperatura;
                        vm.ultimaUmidade = obj.umidade;
                        vm.ultimaSolo = obj.solo;
                    }
                }
                vm.dataTemperaturas = vm.tempo.map(function (a) {
                    var soma = a.temperatura.reduce(function (a, b) {
                        return parseFloat(a) + parseFloat(b);
                    });
                    return parseFloat(soma / a.temperatura.length);
                });
                vm.dataUmidades = vm.tempo.map(function (a) {
                    var soma = a.umidade.reduce(function (a, b) {
                        return parseFloat(a) + parseFloat(b);
                    });
                    return soma / a.umidade.length;
                });
                vm.dataSolo = vm.tempo.map(function (a) {
                    var soma = a.solo.reduce(function (a, b) {
                        return parseFloat(a) + parseFloat(b);
                    });
                    return soma / a.solo.length;
                });
                vm.dataTemperaturas = [Object.values(vm.dataTemperaturas)];
                vm.dataUmidades = [Object.values(vm.dataUmidades)];
                vm.dataSolo = [Object.values(vm.dataSolo)];
                vm.labels = Object.keys(vm.tempo);

                getClassTemperatura();
                getClassUmidade();
                getClassSolo();
            }).catch(function (error) {
                console.error('Error:', error);
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

        function getClassTemperatura() {
            if (vm.ultimaTemperatura < 28) {
                vm.classTemperatura = 'temperatura-baixa';
            } else if (vm.ultimaTemperatura > 30) {
                vm.classTemperatura = 'temperatura-alta';
            } else {
                vm.classTemperatura = 'temperatura-media';
            }
        }

        function getClassUmidade() {
            if (vm.ultimaUmidade < 50) {
                vm.classUmidade = 'umidade-baixa';
            } else if (vm.ultimaUmidade > 80) {
                vm.classUmidade = 'umidade-alta';
            } else {
                vm.classUmidade = 'umidade-media';
            }
        }

        function getClassSolo() {
            if (vm.ultimaSolo < 40) {
                vm.classSolo = 'solo-baixa';
            } else if (vm.ultimaSolo > 80) {
                vm.classSolo = 'solo-alta';
            } else {
                vm.classSolo = 'solo-media';
            }
        }
    }
})();