(function () {
    'use strict';

    angular.module('martita')
        .service('FsService', FsService);

    function FsService($http, FsAlertService) {
        return function () {
            var self = this;

            self.entidade = {};
            self.listaEntidade = [];
            self.provider = [];
            self.listaEnditadeCarregada = false;

            self.salvar = salvar;
            self.eliminar = eliminar;
            self.limpar = limpar;
            self.listar = listar;
            self.listarWithPromise = listarWithPromise;
            self.editar = editar;
            self.switchCard = switchCard;
            self.isListaCarregada = isListaCarregada;

            function salvar() {
                if (self.entidade.key) {
                    return firebase.database()
                        .ref()
                        .child(self.entidadeFirebase + '/' + self.entidade.key)
                        .set(self.entidade)
                        .then(success);
                } else {
                    return firebase.database()
                        .ref()
                        .child(self.entidadeFirebase)
                        .push(self.entidade)
                        .then(success);
                }

                function success(result) {
                    FsAlertService.showSuccess('Registro salvo com sucesso!');
                    limpar();
                    listar();
                    self.reload();
                    return !!result.key;
                }
            }

            function eliminar(key) {
                return firebase.database()
                    .ref(self.entidadeFirebase)
                    .child(key)
                    .remove()
                    .then(function () {
                        listar();
                        if (Object.keys(self.listaEntidade).length <= 1) {
                            self.switchCard();
                        }
                        FsAlertService.showSuccess('Registro eliminado !');
                        return true;
                    });
            }

            function listar() {
                firebase.database()
                    .ref()
                    .child(self.entidadeFirebase)
                    .limitToLast(1)
                    .once('value')
                    .then(function (response) {
                        self.listaEnditadeCarregada = true;
                        self.listaEntidade = response.val();
                        self.reload();
                    });
            }

            function listarWithPromise() {
                return firebase.database()
                    .ref()
                    .child(self.entidadeFirebase)
                    .once('value')
                    .then(function (response) {
                        return response.val();
                    });
            }

            function editar(key) {
                self.entidade = self.listaEntidade[key];
                self.entidade.key = key;
                self.switchCard();
            }

            function limpar() {
                self.entidade = {};
            }

            function switchCard() {
                self.cardReveal = $('.card-reveal .card-title') ? $('.card-reveal .card-title') : $('.card .activator');
                self.cardReveal.click();
            }

            function isListaCarregada() {
                return self.listaEnditadeCarregada;
            }

        };
    }
})();