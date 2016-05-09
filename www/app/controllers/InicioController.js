angular.module('app').controller('InicioController',['$window','$scope','$ionicPlatform','$ionicLoading','$timeout','$injector','QuestionsService',InicioController]);
function InicioController($window,$scope,$ionicPlatform,$ionicLoading,$timeout,$injector,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready InicioController");
      $scope.dueno="Montes Scope";
      show();// --> inicia el Loading
      service.initDBs();
      service.syncDB()
      .then(
        function(dataSync){
          console.log("Success replicating", dataSync);
          setTimeout(function(){ // despues de un segundo se oculta el loading
            hide(); //oculta el Loading
            if(!service.getCurrentPlayer()){

              $injector.get('$state').go('registro');
            }

          },1000);
        })
      .catch(
        function(error){
          console.log("An error occurred when replicating", error);
        })
      .then(service.getQuestions);
      function show() {
        $ionicLoading.show({
          //duration: 50000,
          noBackdrop: true,
          template: '<p class="item-icon-left">Loading database information...<ion-spinner icon="lines"/></p>'
        });
        //hide();
      };

      function hide (){
        $ionicLoading.hide();
      };

  });


}
