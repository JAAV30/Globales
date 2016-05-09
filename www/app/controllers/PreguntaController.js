angular.module('app').controller('AppPregunta',['$scope','$ionicPlatform','$ionicPopup','$injector','QuestionsService',AppPregunta]);

function AppPregunta($scope,$ionicPlatform,$ionicPopup,$injector,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready AppPregunta");
      //$scope.dueno="LuisMi y yo trabajamos aqui, mensaje por medio de scope de angular";
      $scope.answered = false;
     //se carga de la base de datos
     $scope.question = service.getLastQuestion();
     var seleccionado;
     console.log("Current question:", $scope.question);


  function showMessage(title,message,cb) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   });

   alertPopup.then(function(res) {
     if(cb){
       cb();
     }
   });
  };

  $scope.answerAction = function (e){
    $scope.answered = true;
    if($scope.question.structure.correctAnswer === e.toString()){
      service.correctAnswerAction($scope.question);
    }
    else{
      service.failAnswerAction($scope.question);
    }

    var action = service.continueAction();
    console.log("ACTION",action);
    if(action.finished){
      if(action.status ==="WON"){
        setTimeout(function(){
          showMessage("¡Excelente!","Haz ganado el juego",function(){
            $injector.get('$state').go('estadisticas');
            $scope.answered = false;
          });
        },500);
      }
      else if(action.status ==="LOST"){
        setTimeout(function(){
          showMessage("¡Es una lástima!","Haz perdido el juego",function(){
            $injector.get('$state').go('estadisticas');
            $scope.answered = false;
          });
        },500);
      }
    }
    else{
       setTimeout(function(){
          $injector.get('$state').go('ruleta');
          $scope.answered = false;
       },1000);
    }

  };

  });


}
