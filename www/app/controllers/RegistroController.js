angular.module('app').controller('RegistroController',['$window','$scope','$ionicPlatform','$ionicModal','$ionicPopup','$ionicLoading','$injector','QuestionsService',RegistroController]);

function RegistroController($window,$scope,$ionicPlatform,$ionicModal,$ionicPopup,$ionicLoading,$injector,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready RegistroController");
      service.getPlayers()
             .then(function(players){
                console.log("Players",players);
                $scope.players = players;
             });
  });

  $ionicModal.fromTemplateUrl('add-player.html', {
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
    if($scope.player.nickname &&
       $scope.player.nickname.trim() &&
       $scope.player.science &&
       $scope.player.language){

         showBusy();
         service.createPlayer($scope.player)
                .then(
                  function(){
                    $scope.modal.hide();
                    hideBusy();
                  },
                  function(){
                    $scope.modal.hide();
                    hideBusy();
                  });
       }

       else{
        showMessage("¡Error!","El jugador es invalido");
       }



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

  };

  function showBusy() {
    $ionicLoading.show({
      //duration: 50000,
      noBackdrop: true,
      template: '<p class="item-icon-left">Saving player...<ion-spinner icon="lines"/></p>'
    });
    //hide();
  };

  function hideBusy(){
    $ionicLoading.hide();
  };

  function showMessage(title,message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   });

  };

  $scope.closeModal=function(){
    $scope.modal.hide();
  }
}
