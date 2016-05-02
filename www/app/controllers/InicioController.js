angular.module('app').controller('InicioController',['$scope','$ionicPlatform','$ionicLoading','$timeout','QuestionsService',InicioController]);

function InicioController($scope,$ionicPlatform,$ionicLoading,$timeout,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready InicioController");
      $scope.dueno="Roco trabaje aqui, mensaje por medio de scope de angular";

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
        });
      })
      
      $scope.show = function() {
        $ionicLoading.show({
          duration: 1000,
          noBackdrop: true,
          template: '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>'
        });
        //hide();
      };
      function hide (){
        $ionicLoading.hide();
      };
      
  });


}
