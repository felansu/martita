var serialPort = require('serialport');
var moment = require('moment');
var firebase = require("firebase");

var spInstance;
var config;
var martita;
var ultimoDadoMartita;
var elementosSensoriais;

const PORTA_SERIAL = 'COM3';
const READLINE = '\n';
const NOME_VASO = 'martita';

init();

function init() {

	config = {
		baudRate: 9600,
		parser: serialPort.parsers.readline(READLINE)
	};

	spInstance = new serialPort(PORTA_SERIAL, config);

	spInstance.on('open', conexaoAberta);
	spInstance.on('data', salvarDados);
	spInstance.on('close', conexaoFechada);
	spInstance.on('error', deuPau);

	firebase.initializeApp({
		serviceAccount: "serviceAccountCredentials.json",
		databaseURL: "https://martita-50f93.firebaseio.com"
	});
}

function conexaoAberta() {
	console.log('\f Conexão aberta.' +
		'\n * BaudRate: ' + config.baudRate +
		'\n * Line delimiter: ' + JSON.stringify(READLINE) + '\n');
}

function salvarDados(data) {
	montaObjeto(data);
	if (teveAlteracaoDados()) {
		salvar();
	}
}

function conexaoFechada() {
	console.log('Conexão fechada');
}

function deuPau(error) {
	console.log('Pau: ' + error);
}

function montaObjeto(data) {
	var bananaSplit = data.split("|");
	var dados = {};

	dados['data'] = moment().format();
	elementosSensoriais = [];
	for (var i = 0; bananaSplit.length > i; i++) {
		var tmp = bananaSplit[i].split(':');
		dados[tmp[0]] = tmp[1];
		elementosSensoriais.push(tmp[0])
	}

	martita = dados;
}

function teveAlteracaoDados() {
	if (!ultimoDadoMartita) {
		ultimoDadoMartita = martita;
		return true;
	}

	for (var i = 0; i < elementosSensoriais.length; i++) {
		if (ultimoDadoMartita[elementosSensoriais[i]] !== martita[elementosSensoriais[i]]) {
			ultimoDadoMartita = martita;
			return true;
		}
	}

	console.log("Não teve alteração de dados");
}

function salvar() {
	firebase.database().ref(NOME_VASO).push(martita);
	console.log(JSON.stringify(martita));
}