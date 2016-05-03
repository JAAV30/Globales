angular.module('app').controller('EstadisticasController',['$scope','$ionicPlatform','$ionicModal','QuestionsService',EstadisticasController]);

function EstadisticasController($scope,$ionicPlatform,$ionicModal,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready EstadisticasController");
      $scope.dueno="Josue trabaje aqui, mensaje por medio de scope de angular";


      $scope.$apply(function(){
        $scope.currentPlayer = service.getCurrentPlayer();
      });
  });

  $ionicModal.fromTemplateUrl('edit-player.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showEditPlayerModal = function() {
    $scope.action = 'Edit';
    $scope.isAdd = false;
    $scope.modal.show();
  };

  $scope.savePlayer = function() {

    $scope.modal.hide();
  };

  $scope.deletePlayer = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


}
