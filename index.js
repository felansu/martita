var serialPort = require('serialport');
var moment = require('moment');

var spInstance;

const PORTA_SERIAL = 'COM3';
const READLINE = '\n';

init();

function init() {

	var config = {
		baudRate: 9600,
		parser: serialPort.parsers.readline(READLINE)
	};

	spInstance = new serialPort(PORTA_SERIAL, config);

	spInstance.on('open', conexaoAberta);
	spInstance.on('data', obterDados);
	spInstance.on('close', conexaoFechada);
	spInstance.on('error', deuPau);
}

function conexaoAberta() {
	console.log('\f Conexão aberta.' +
		'\n * BaudRate: ' + spInstance.options.baudRate +
		'\n * Line delimiter: ' + JSON.stringify(READLINE) + '\n\n');
}

function obterDados(data) {
	var JSONdata = montaJSON(data);
	console.log(JSONdata);
}

function conexaoFechada() {
	console.log('Conexão fechada');
}

function deuPau(error) {
	console.log('Pau Error: ' + error);
}

function montaJSON(data) {
	var bananaSplit = data.split("|");
	var dados = {};

	dados['data'] = moment().format();

	for (var i = 0; bananaSplit.length > i; i++) {
		var tmp = bananaSplit[i].split(':');
		dados[tmp[0]] = tmp[1];
	}

	return JSON.stringify(dados);
}