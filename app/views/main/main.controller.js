(function () {

	'use strict';

	angular
		.module('martita')
		.controller('MainController', MainController);

	/* @ngInject */
	function MainController($state, $mdSidenav, MainService, $scope, $filter) {

		var vm = this;

		vm.showMobileMainHeader = true;
		vm.todos = [];
		vm.teste = [];
		vm.datas = [];

		vm.openSideNavPanel = openSideNavPanel;
		vm.closeSideNavPanel = closeSideNavPanel;
		vm.alterarRota = alterarRota;

		init('main');

		function init(rota) {
			$state.go(rota);
			vm.todos = MainService.obterDadosMartita();
			vm.todos.$loaded().then(function (response) {
				vm.datas = [];
				vm.temperaturas = [];
				vm.umidades = [];
				vm.umidadesSolo = [];
				for (var i = 0; i < response.length; i++) {
					var obj = response[i];
					vm.temperaturas.push(obj.temperatura);
					vm.umidades.push(obj.umidade);
					vm.umidadesSolo.push(obj.umidadeSolo);
					vm.datas.push($filter('date')(obj.data, "h:mm"));
				}
				vm.teste.push(vm.temperaturas);
				vm.teste.push(vm.umidades);
				vm.teste.push(vm.umidadesSolo);


				$scope.chartData = {
					labels: vm.datas,
					datasets: [
						{
							label: "Temperatura",
							fill: false,
							lineTension: 0.1,
							backgroundColor: "rgba(75,192,192,0.4)",
							borderColor: "rgba(75,192,192,1)",
							borderCapStyle: 'butt',
							borderDash: [],
							borderDashOffset: 0.0,
							borderJoinStyle: 'miter',
							pointBorderColor: "rgba(75,192,192,1)",
							pointBackgroundColor: "#fff",
							pointBorderWidth: 1,
							pointHoverRadius: 5,
							pointHoverBackgroundColor: "rgba(75,192,192,1)",
							pointHoverBorderColor: "rgba(220,220,220,1)",
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
							backgroundColor: "rgba(75,192,192,0.4)",
							borderColor: "rgba(75,192,192,1)",
							borderCapStyle: 'butt',
							borderDash: [],
							borderDashOffset: 0.0,
							borderJoinStyle: 'miter',
							pointBorderColor: "rgba(75,192,192,1)",
							pointBackgroundColor: "#fff",
							pointBorderWidth: 1,
							pointHoverRadius: 5,
							pointHoverBackgroundColor: "rgba(75,192,192,1)",
							pointHoverBorderColor: "rgba(220,220,220,1)",
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
							backgroundColor: "rgba(75,192,192,0.4)",
							borderColor: "rgba(75,192,192,1)",
							borderCapStyle: 'butt',
							borderDash: [],
							borderDashOffset: 0.0,
							borderJoinStyle: 'miter',
							pointBorderColor: "rgba(75,192,192,1)",
							pointBackgroundColor: "#fff",
							pointBorderWidth: 1,
							pointHoverRadius: 5,
							pointHoverBackgroundColor: "rgba(75,192,192,1)",
							pointHoverBorderColor: "rgba(220,220,220,1)",
							pointHoverBorderWidth: 2,
							pointRadius: 1,
							pointHitRadius: 10,
							data: vm.teste[2],
							spanGaps: false
						}
					]
				};

				$scope.chartOptions = {};

				$scope.onChartClick = function(event) {
					console.log('LineController', 'onChartClick', event);
				}
			}).catch(function (error) {
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

	}
})();