var serialport = require('serialport');

var portaSerial;

init();

function init() {
	const PORTA_SERIAL = 'COM3';

	var config = {
		baudRate: 9600,
		parser: serialport.parsers.readline('\n')
	};

	portaSerial = new serialport(PORTA_SERIAL, config);

	portaSerial.on('open', conexaoAberta);
	portaSerial.on('data', obterDados);
	portaSerial.on('close', conexaoFechada);
	portaSerial.on('error', deuPau);
}
function conexaoAberta() {
	console.log('BaudRate: ' + portaSerial.options.baudRate);
	console.log('Readline: ' + portaSerial.options.parser);
}

function obterDados(data) {
	console.log(data);
}

function conexaoFechada() {
	console.log('Conexão fechada');
}

function deuPau(error) {
	console.log('Pau Error: ' + error);
}

