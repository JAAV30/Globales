angular.module('app').controller('EstadisticasController',['$scope','$ionicPlatform','QuestionsService',EstadisticasController]);

function EstadisticasController($scope,$ionicPlatform,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready EstadisticasController");
      $scope.dueno="Josue trabaje aqui, mensaje por medio de scope de angular";


      $scope.$apply(function(){
        $scope.currentPlayer = service.getCurrentPlayer();
      });
  });


}
