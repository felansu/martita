var firebase = require("firebase");

const NOME_VASO = 'martita';

init();

function init() {

	firebase.initializeApp({
		serviceAccount: "serviceAccountCredentials.json",
		databaseURL: "https://martita-50f93.firebaseio.com"
	});

	var starCountRef = firebase.database().ref(NOME_VASO);
	starCountRef.on('value', function (snapshot) {
		console.log(snapshot.val());
	});
}
