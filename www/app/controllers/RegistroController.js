angular.module('app').controller('RegistroController',['$window','$scope','$ionicPlatform','$ionicModal','$injector','QuestionsService',RegistroController]);

function RegistroController($window,$scope,$ionicPlatform,$ionicModal,$injector,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready RegistroController");
      $scope.dueno="ZORRO";
  });

  $scope.players = [{nickname:"jodafm",science:"Química",languaje:"Inglés"},
                    {nickname:"player2",science:"Biología",languaje:"Inglés"},
                    {nickname:"player3",science:"Química",languaje:"Francés"}];

  $ionicModal.fromTemplateUrl('add-or-edit-player.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

  $scope.showAddPlayerModal = function() {
    console.log("Open modal");
    $scope.player = {};
		$scope.action = 'Add';
		$scope.isAdd = true;
		$scope.modal.show();
	};

	$scope.showEditPlayerModal = function(player) {
		$scope.player = player;
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

  $scope.selectPlayer = function(player){
    console.log("Selected player", player);
    service.setCurrentPlayer(player);
    $injector.get('$state').transitionTo('estadisticas');
  }

}
