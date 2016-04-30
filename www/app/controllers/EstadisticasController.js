angular.module('app').controller('EstadisticasController',['$scope','$ionicPlatform',EstadisticasController]);

function EstadisticasController($scope,$ionicPlatform) {

  $ionicPlatform.ready(function() {

      console.log("Ready EstadisticasController");
      $scope.dueno="Josue trabaje aqui, mensaje por medio de scope de angular";
  });


}
