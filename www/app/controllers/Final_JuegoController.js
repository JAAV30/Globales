angular.module('app').controller('Final_JuegoController',['$scope','$ionicPlatform',Final_JuegoController]);

function Final_JuegoController($scope,$ionicPlatform) {

  $ionicPlatform.ready(function() {

      console.log("Ready Final_JuegoController");
      $scope.dueno="Algun valiente que xD trabaje aqui, mensaje por medio de scope de angular";
  });


}
