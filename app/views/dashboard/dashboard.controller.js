(function () {

    'use strict';

    angular
        .module('martita')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController($scope, $state, $mdSidenav, $location, $filter, AuthService, DashboardService) {

        var vm = this;

        vm.openSideNavPanel = openSideNavPanel;
        vm.closeSideNavPanel = closeSideNavPanel;
        vm.alterarRota = alterarRota;
        vm.seriesTemperatura = ['Temperatura'];
        vm.seriesUmidade = ['Umidade'];
        vm.seriesSolo = ['Solo'];
        vm.dados = {tempo: [], temperatura: [], umidade: [], solo: []};
        vm.dadosMax = {temperatura: 0, umidade: 0, solo: 0};
        vm.dadosMin = {temperatura: 100, umidade: 100, solo: 100};

        init();

        function init() {
            AuthService.firebaseIsInitialized();
            vm.dashboardService = DashboardService.getFsService();
            $scope.$watch('vm.dashboardService.listaEntidades', function (result) {
                var controleRepeticao = '';
                if (result.$resolved) {
                    var ultimoDia = ("0" + result[result.length - 1].tempo.day).slice(-2);
                }
                for (var i = 0; i < result.length; i++) {
                    var obj = result[i];
                    var hora = ("0" + obj.tempo.hours).slice(-2);
                    var minutos = ("0" + obj.tempo.minutes).slice(-2);
                    var dia = ("0" + obj.tempo.day).slice(-2);
                    var mes = ("0" + obj.tempo.month).slice(-2);
                    var tempo = dia + '/' + mes + '  ' + hora + ':' + minutos;
                    var controleRepeticaoAtual = hora + '/' + dia + '/' + mes;
                    if (controleRepeticao !== controleRepeticaoAtual) {
                        vm.dados.tempo.push(tempo);
                        vm.dados.temperatura.push(obj.temperatura);
                        vm.dados.umidade.push(obj.umidade);
                        vm.dados.solo.push(obj.solo);
                    }
                    if (dia === ultimoDia) {
                        vm.dadosMax.temperatura = parseInt(vm.dadosMax.temperatura) < parseInt(obj.temperatura) ?
                            obj.temperatura : parseInt(vm.dadosMax.temperatura);
                        vm.dadosMax.umidade = parseInt(vm.dadosMax.umidade) < parseInt(obj.umidade) ?
                            obj.umidade : parseInt(vm.dadosMax.umidade);
                        vm.dadosMax.solo = parseInt(vm.dadosMax.solo) < parseInt(obj.solo) ?
                            obj.solo : parseInt(vm.dadosMax.solo);

                        vm.dadosMin.temperatura = parseInt(vm.dadosMin.temperatura) > parseInt(obj.temperatura) ?
                            obj.temperatura : parseInt(vm.dadosMin.temperatura);
                        vm.dadosMin.umidade = parseInt(vm.dadosMin.umidade) > parseInt(obj.umidade) ?
                            obj.umidade : parseInt(vm.dadosMin.umidade);
                        vm.dadosMin.solo = parseInt(vm.dadosMin.solo) > parseInt(obj.solo) ?
                            obj.solo : parseInt(vm.dadosMin.solo);
                    }
                    controleRepeticao = controleRepeticaoAtual;
                }

                vm.ultimosDados = {
                    temperatura: vm.dados.temperatura[vm.dados.temperatura.length - 1],
                    umidade: vm.dados.umidade[vm.dados.umidade.length - 1],
                    solo: vm.dados.solo[vm.dados.solo.length - 1]
                };

                getClassTemperatura();
                getClassUmidade();
                getClassSolo();
            }, true);
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