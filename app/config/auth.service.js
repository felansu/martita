(function () {

    'use strict';

    angular
        .module('martita')
        .service('AuthService', AuthService);

    /* @ngInject */
    function AuthService() {

        var self = this;

        self.firebaseIsInitialized = firebaseIsInitialized;

        function firebaseIsInitialized() {
            if (!firebase.apps.length) {
                conectaFirebase();
            }
        }

        function conectaFirebase() {
            var config = {
                apiKey: 'AIzaSyAsf6prKcKymxdDzJQIFlgWwLAyArYcc9A',
                authDomain: 'fs-systrans.firebaseapp.com',
                databaseURL: 'https://martita-50f93.firebaseio.com',
                storageBucket: 'martita-50f93.appspot.com',
                messagingSenderId: '567554290671'
            };
            firebase.initializeApp(config);
        }

    }
})();