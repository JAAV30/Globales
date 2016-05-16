// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic','nvd3','ngCordova'])

.run(function($ionicPlatform) {


  $ionicPlatform.ready(function() {
    console.log("Ready app.js....");
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


  });
})
.config(function($stateProvider) {
  $stateProvider
  .state('registro', {
    url: '/registro',
    templateUrl: 'views/RegistroView.html'
  })
  .state('estadisticas', {
    url: '/estadisticas',
    templateUrl: 'views/EstadisticasView.html'
  })
  .state('ruleta', {
    url: '/ruleta',
    templateUrl: 'views/RuletaView.html'
  })
  .state('pregunta', {
    url: '/pregunta',
    templateUrl: 'views/PreguntaView.html'
  })
  .state('final', {
    url: '/final',
    templateUrl: 'views/Final_JuegoView.html'
  })
  .state('errorData', {
    url: '/errorData',
    templateUrl: 'views/ErrorData.html'
  });
});
