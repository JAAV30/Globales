angular.module('app').controller('InicioController',['$window','$scope','$ionicPlatform','$ionicLoading','$timeout','$injector','$ionicHistory','QuestionsService',InicioController]);
function InicioController($window,$scope,$ionicPlatform,$ionicLoading,$timeout,$injector,$ionicHistory,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready InicioController");
      $scope.dueno="Montes Scope";
      show();// --> inicia el Loading
      service.initDBs();
      service.syncDB() /*promise*/
      .then(
        function(dataSync){ // syncDB success function
          console.log("Success replicating", dataSync);
          setTimeout(function(){ // despues de un segundo se oculta el loading
            hide(); //oculta el Loading
            if(!service.getCurrentPlayer()){

              $ionicHistory.nextViewOptions({
                  disableBack: true
              });
              $injector.get('$state').go('registro');
            }

          },1000);
        },
        function(errorSync){ //syncDB error function

          console.log("Error replicating:", errorSync);
          service.getQuestions() /*promise*/
                 .then(
                   function(questions){ //success function
                     if(questions){
                       setTimeout(function(){ // despues de un segundo se oculta el loading
                         hide(); //oculta el Loading
                         if(!service.getCurrentPlayer()){

                           $ionicHistory.nextViewOptions({
                               disableBack: true
                           });
                           $injector.get('$state').go('registro');
                         }

                       },1000);
                     }
                     else{
                       console.log("Exit app");
                       setTimeout(function(){ // despues de un segundo se oculta el loading
                         hide(); //oculta el Loading
                         $ionicHistory.nextViewOptions({
                             disableBack: true
                         });
                         $injector.get('$state').go('errorData');
                         //ionic.Platform.exitApp();

                       },1500);

                     }
                  }); // close getQuestions .then

        });// close syncDB .then


      function show() {
        $ionicLoading.show({
          //duration: 50000,
          noBackdrop: true,
          template: '<p class="item-icon-left">Cargando datos...<ion-spinner icon="lines"/></p>'
        });
        //hide();
      };

      function hide (){
        $ionicLoading.hide();
      };

  });


}
