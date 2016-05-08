angular.module('app').controller('AppPregunta',['$scope','$ionicPlatform','$ionicPopup','$injector','QuestionsService',AppPregunta]);

function AppPregunta($scope,$ionicPlatform,$ionicPopup,$injector,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready AppPregunta");
      //$scope.dueno="LuisMi y yo trabajamos aqui, mensaje por medio de scope de angular";
      $scope.buttonColor="button button-block button-positive";

      var analizado=false;

     //se carga de la base de datos
     $scope.question = service.getLastQuestion();
     var respuestaCorrecta;
     var seleccionado;
     console.log("Current question:", $scope.question);

	$scope.colorClass=function(key){
  		if(analizado){
  			if(key==respuestaCorrecta){
  				return "button button-block button-balanced";
  			}
  			else {
  				return "button button-block button-assertive";
  			}
  		}
  		return "button button-block button-positive";
  	}

  $scope.checkAnswer=function(key){
		analizado=true;
		$scope.colorClass(key);
	};

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
    //blockButtons();
    console.log("Answer selected",e);
    console.log("Correct answer",$scope.question.structure.correctAnswer);
    respuestaCorrecta=$scope.question.structure.correctAnswer;
    seleccionado=e.toString();
    $scope.checkAnswer(e);
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
            $injector.get('$state').transitionTo('estadisticas');
          });
        },500);
      }
      else if(action.status ==="LOST"){
        setTimeout(function(){
          showMessage("¡Es una lástima!","Haz perdido el juego",function(){
            $injector.get('$state').transitionTo('estadisticas');
          });
        },500);
      }
    }
    else{
       setTimeout(function(){
          $injector.get('$state').transitionTo('ruleta');
       },1000);
    }

  };

  });


}
