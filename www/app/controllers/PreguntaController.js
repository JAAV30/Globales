  angular.module('app').controller('AppPregunta',['$scope','$ionicPlatform','$ionicPopup','$injector','QuestionsService',AppPregunta]);

  function AppPregunta($scope,$ionicPlatform,$ionicPopup,$injector,service) {

    $ionicPlatform.ready(function() {

      console.log("Ready AppPregunta");
      //$scope.dueno="LuisMi y yo trabajamos aqui, mensaje por medio de scope de angular";
      //se carga de la base de datos
      $scope.question = service.getLastQuestion();
      if($scope.question._attachments){
          $scope.imageQuestion = "data:image/jpg;base64,"+$scope.question._attachments["imagen.jpg"].data; // add data URIs
      }

      console.log("Current question:", $scope.question);


    });
    $scope.$parent.$on('$ionicView.beforeEnter', function(e){
      console.log("Entering to Pregunta View");
      $scope.answered = false;
      $scope.materia=$scope.question.subject;
    });

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
      if(!$scope.answered){
        $scope.answered = true;
        if(parseInt($scope.question.structure.correctAnswer) === parseInt(e)){
          service.correctAnswerAction($scope.question);
        }
        else{
          service.failAnswerAction($scope.question);
        }

        var action = service.continueAction();
        console.log("ACTION",action);
        if(action.finished){
          service.getCurrentPlayer().statistics.Matemática.correctas=service.getCurrentPlayer().statistics.Matemática.correctas+service.getInfoGame().Matemática.correctas;
          service.getCurrentPlayer().statistics.Matemática.incorrectas=service.getCurrentPlayer().statistics.Matemática.incorrectas+service.getInfoGame().Matemática.incorrectas;

          service.getCurrentPlayer().statistics.Español.correctas=service.getCurrentPlayer().statistics.Español.correctas+service.getInfoGame().Español.correctas;
          service.getCurrentPlayer().statistics.Español.incorrectas=service.getCurrentPlayer().statistics.Español.incorrectas+service.getInfoGame().Español.incorrectas;

          service.getCurrentPlayer().statistics.Idioma.correctas=service.getCurrentPlayer().statistics.Idioma.correctas+service.getInfoGame().Idioma.correctas;
          service.getCurrentPlayer().statistics.Idioma.incorrectas=service.getCurrentPlayer().statistics.Idioma.incorrectas+service.getInfoGame().Idioma.incorrectas;

          service.getCurrentPlayer().statistics.Estudios.correctas=service.getCurrentPlayer().statistics.Estudios.correctas+service.getInfoGame().Estudios.correctas;
          service.getCurrentPlayer().statistics.Estudios.incorrectas=service.getCurrentPlayer().statistics.Estudios.incorrectas+service.getInfoGame().Estudios.incorrectas;

          service.getCurrentPlayer().statistics.Cívica.correctas=service.getCurrentPlayer().statistics.Cívica.correctas+service.getInfoGame().Cívica.correctas;
          service.getCurrentPlayer().statistics.Cívica.incorrectas=service.getCurrentPlayer().statistics.Cívica.incorrectas+service.getInfoGame().Cívica.incorrectas;

          service.getCurrentPlayer().statistics.Ciencia.correctas=service.getCurrentPlayer().statistics.Ciencia.correctas+service.getInfoGame().Ciencia.correctas;
          service.getCurrentPlayer().statistics.Ciencia.incorrectas=service.getCurrentPlayer().statistics.Ciencia.incorrectas+service.getInfoGame().Ciencia.incorrectas;


          console.log(service.getCurrentPlayer());
          console.log(service.getInfoGame());
          if(action.status ==="WON"){
            setTimeout(function(){
              showMessage("¡Excelente!","Haz ganado el juego",function(){
                $injector.get('$state').go('estadisticas');
                service.getCurrentPlayer().statistics.partidas.ganadas = service.getCurrentPlayer().statistics.partidas.ganadas + 1;
                service.updataPlayer(service.getCurrentPlayer());
              });
            },500);
          }
          else if(action.status ==="LOST"){
            setTimeout(function(){
              showMessage("¡Es una lástima!","Haz perdido el juego",function(){
                $injector.get('$state').go('estadisticas');
                service.getCurrentPlayer().statistics.partidas.perdidas = service.getCurrentPlayer().statistics.partidas.perdidas + 1;
                service.updataPlayer(service.getCurrentPlayer());
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
      }
    };


  }
