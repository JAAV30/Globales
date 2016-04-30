angular.module('app').controller('AppPregunta',['$scope','$ionicPlatform',AppPregunta]);

function AppPregunta($scope,$ionicPlatform) {

  $ionicPlatform.ready(function() {

      console.log("Ready AppPregunta");
      $scope.dueno="LuisMi y yo trabajamos aqui, mensaje por medio de scope de angular";
  });


}
