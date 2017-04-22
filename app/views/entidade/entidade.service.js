(function () {
	'use strict';

	angular
		.module('martita')
		.service('AlunoService', AlunoService);

	/* @ngInject */
	function AlunoService(FsService, AlunoFactory, $firebaseArray) {

		this.getFsService = getFsService;

		function getFsService() {
			var fs = new FsService();
			fs.tituloPaginaCadastro = 'Cadastro de aluno';
			fs.tituloPaginaPesquisa = 'Pesquisa de aluno';
			fs.entidadeFirebase = 'alunos';

			fs.listaEntidade = $firebaseArray(firebase.database().ref().child(fs.entidadeFirebase));
			fs.instituicao = AlunoFactory(firebase.database().ref().child('instituicoes'));
			fs.carregaInstituicao = carregaInstituicao;

			function carregaInstituicao(keyInstituicao) {
				return fs.instituicao.$load(keyInstituicao)
			}

			return fs;
		}


	}
})();

