angular.module('app').controller('InicioController',['$window','$scope','$ionicPlatform','$ionicLoading','$timeout','QuestionsService',InicioController]);

function InicioController($window,$scope,$ionicPlatform,$ionicLoading,$timeout,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready InicioController");
      $scope.dueno="Montes Scope";
      show();// --> inicia el Loading
      service.initDB();

      service.syncDB()
      .then(
        function(dataSync){
          console.log("Success replicating", dataSync);
          $scope.start_sync = dataSync.start_time;
          $scope.end_sync = dataSync.end_time;
          $scope.docs_read =dataSync.docs_read;
          $scope.docs_written =dataSync.docs_written;
          $scope.docs_written_fail =dataSync.doc_write_failures ;
          $scope.status_sync =dataSync.status ;
          hide(); // Esconde el loading cuando cargo todo
          //$window.location.href = 'views/RegistroView.html' //redirecciona
        })
      .catch(
        function(error){
          console.log("An error occurred when replicating", error);
        })
      .then(service.getQuestions)
      .then(function(questions){

        console.log("Now after sync, we got all the questions",questions);
        $scope.$apply(function(){
          $scope.num_localDocs = questions.length ;

          if(questions.length > 0){
            $window.location.href = 'views/RegistroView.html'
          }

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
