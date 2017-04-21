(function () {

    'use strict';

    angular
        .module('martita')
        .controller('MainController', MainController);

    /* @ngInject */
    function MainController($state, $mdSidenav, MainService, $scope, $filter, AuthService) {

        var vm = this;

        vm.showMobileMainHeader = true;
        vm.teste = [];
        vm.datas = [];

        vm.openSideNavPanel = openSideNavPanel;
        vm.closeSideNavPanel = closeSideNavPanel;
        vm.alterarRota = alterarRota;

        init('main');

        function init(rota) {
            AuthService.firebaseIsInitialized();
            $state.go(rota);
            MainService.obterDadosMartita()
                .then(function (result) {
                    $scope.$applyAsync();
                    vm.datas = [];
                    vm.temperaturas = [];
                    vm.umidades = [];
                    vm.solo = [];
                    result = Object.values(result.martita);
                    for (var i = 0; i < result.length; i++) {
                        var obj = result[i];
                        vm.temperaturas.push(obj.temperatura);
                        vm.umidades.push(obj.umidade);
                        vm.solo.push(obj.solo);
                        vm.datas.push($filter('date')(obj.data, "h:mm"));
                    }
                    vm.teste.push(vm.temperaturas);
                    vm.teste.push(vm.umidades);
                    vm.teste.push(vm.solo);


                    $scope.chartData = {
                        labels: vm.datas,
                        datasets: [
                            {
                                label: "Temperatura",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "green",
                                borderColor: "green",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "green",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "green",
                                pointHoverBorderColor: "green",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: vm.teste[0],
                                spanGaps: false
                            },
                            {
                                label: "Umidade",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "brown",
                                borderColor: "brown",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "brown",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "brown",
                                pointHoverBorderColor: "brown",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: vm.teste[1],
                                spanGaps: false
                            },
                            {
                                label: "Umidade do solo",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "blue",
                                borderColor: "blue",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "blue",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "blue",
                                pointHoverBorderColor: "blue",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: vm.teste[2],
                                spanGaps: false
                            }
                        ]
                    };

                    $scope.chartOptions = {};

                    $scope.onChartClick = function (event) {
                        console.log('LineController', 'onChartClick', event);
                    }
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

    }
})();