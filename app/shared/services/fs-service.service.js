(function () {
	'use strict';

	angular.module('martita')
		.service('FsService', FsService);

	function FsService(FsAlertService) {
		return function () {
			var self = this;

			self.entidade = {};
			self.listaEntidade = [];
			self.provider = [];

			self.salvar = salvar;
			self.eliminar = eliminar;
			self.limpar = limpar;
			self.editar = editar;
			self.switchCard = switchCard;

			function salvar() {
				if (self.entidade.$id) {
					self.listaEntidade.$save(self.entidade).then(function (response) {
						FsAlertService.showSuccess('Registro atualizado com sucesso');
						limpar();
						return response;
					}, function (error) {
						console.log(error)
					});
				} else {
					self.listaEntidade.$add(self.entidade).then(function (response) {
						FsAlertService.showSuccess('Novo registro salvo com sucesso');
						limpar();
						return response;
					});
				}
			}

			function eliminar(key) {
				self.listaEntidade.$remove(self.listaEntidade[key])
					.then(function (response) {
						FsAlertService.showSuccess('Registro eliminado com sucesso');
						if (self.listaEntidade.length == 0) {
							switchCard();
						}
						return response;
					}, function (error) {
						console.log(error)
					});
			}

			function editar(key) {
				self.entidade = self.listaEntidade[key];
				self.switchCard();
			}

			function limpar() {
				self.entidade = {};
			}

			function switchCard() {
				self.cardReveal = '';
				if($('.card-reveal .card-title')){
					self.mode = 'list';
					self.cardReveal = $('.card-reveal .card-title')
				}else{
					self.mode = 'edit';
					self.cardReveal = $('.card .activator')
				}
				self.cardReveal.click();
			}

		};
	}
})();