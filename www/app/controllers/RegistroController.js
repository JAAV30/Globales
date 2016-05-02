angular.module('app').controller('RegistroController',['$scope','$ionicPlatform',RegistroController]);

function RegistroController($scope,$ionicPlatform) {

  $ionicPlatform.ready(function() {

      console.log("Ready RegistroController");
      $scope.dueno="ZORRO";
  });


}
