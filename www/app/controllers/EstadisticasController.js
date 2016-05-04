angular.module('app').controller('EstadisticasController',['$scope','$ionicPlatform','ionic', 'chart.js',EstadisticasController]);

function EstadisticasController($scope,$ionicPlatform,$ionic,$chart.js) {

  $ionicPlatform.ready(function() {

      console.log("Ready EstadisticasController");
      $scope.dueno="Josue trabaje aqui, mensaje por medio de scope de angular";

      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.series = ['Series A', 'Series B'];
      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
        ];
  });


}
