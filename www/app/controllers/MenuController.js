angular.module('app').controller('MenuController',['$scope','$ionicPlatform',MenuController]);

function MenuController($scope,$ionicPlatform) {

  $ionicPlatform.ready(function() {

      console.log("Ready MenuController");
      $scope.dueno="Josue trabaje aqui, mensaje por medio de scope de angular";
  });


}
