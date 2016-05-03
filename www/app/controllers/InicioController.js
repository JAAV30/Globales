angular.module('app').controller('InicioController',['$window','$scope','$ionicPlatform','$ionicLoading','$timeout','QuestionsService',InicioController]);

function InicioController($window,$scope,$ionicPlatform,$ionicLoading,$timeout,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready InicioController");
      $scope.dueno="Montes Scope";
      show();// --> inicia el Loading
      service.initDBs();
      service.syncDB()
      .then(
        function(dataSync){
          console.log("Success replicating", dataSync);
        })
      .catch(
        function(error){
          console.log("An error occurred when replicating", error);
        })
      .then(service.get_ID_subject_difficult) // objengo todas las preguntas pero unicamente con el ID,MATERIA,DIFICULTAD
      .then(function(questions){

        setTimeout(function(){ // despues de un segundo se oculta el loading
          hide(); //oculta el Loading
          $window.location.href = 'views/RegistroView.html'
        },1000);
        console.log("Now after sync, we got all the questions",questions.rows);
        $scope.$apply(function(){
          $scope.questionsCollection = questions.rows;
        });
      })

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
