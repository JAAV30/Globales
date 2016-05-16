angular.module('app').controller('EstadisticasController',['$scope','$ionicPlatform','$ionicModal','$ionicPopup','$ionicLoading','$injector','QuestionsService',EstadisticasController]);

function EstadisticasController($scope,$ionicPlatform,$ionicModal,$ionicPopup,$ionicLoading,$injector,service) {

  $ionicPlatform.ready(function() {

    console.log("Ready EstadisticasController");
    $scope.currentPlayer = service.getCurrentPlayer();
    $scope.options1 = {
      chart: {
        type: 'pieChart',
        height: 250,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: false,
        title: "Rendimiento",
        donut: true,
        tooltips: true,
        showLegend:true

      }
    };

    $scope.data1 = [
      {
        key: "Juegos Ganados",
        y: $scope.currentPlayer.statistics.partidas.ganadas,
        color:"#00C853"
      },
      {
        key: "Juegos Perdidos",
        y: $scope.currentPlayer.statistics.partidas.perdidas,
        color : "#D50000"
      }
    ];

    $scope.options2 = {
      chart: {
        type: 'multiBarHorizontalChart',
        height: 260,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 95
        },
        x: function(d){return d.label;},
        y: function(d){return d.value + (1e-10);},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: '',
          axisLabelDistance: 25
        },
        showXAxis: true,
        showYAxis: false,
        showControls:false,
        stacked : true
      }
    };

    $scope.data2 = [
      {
        key: 'Acertadas',
        color:"#00C853",
        values: [
          {
            "label" : "Matemática" ,
            "value" :  $scope.currentPlayer.statistics.Matemática.correctas
          } ,
          {
            "label" : "Español" ,
            "value" : $scope.currentPlayer.statistics.Español.correctas
          } ,
          {
            "label" : "Ciencia" ,
            "value" : $scope.currentPlayer.statistics.Ciencia.correctas
          } ,
          {
            "label" : "Cívica" ,
            "value" : $scope.currentPlayer.statistics.Cívica.correctas
          } ,
          {
            "label" : "Est. Sociales" ,
            "value" : $scope.currentPlayer.statistics.Estudios.correctas
          } ,
          {
            "label" : "Idioma" ,
            "value" : $scope.currentPlayer.statistics.Idioma.correctas
          }
        ]
      },
      {
        key: 'Falladas',
          color:"#D50000",
        values: [
          {
            "label" : "Matemática" ,
            "value" : $scope.currentPlayer.statistics.Matemática.incorrectas * -1
          } ,
          {
            "label" : "Español" ,
            "value" : $scope.currentPlayer.statistics.Español.incorrectas * -1
          } ,
          {
            "label" : "Ciencia" ,
            "value" : $scope.currentPlayer.statistics.Ciencia.incorrectas * -1
          } ,
          {
            "label" : "Cívica" ,
            "value" : $scope.currentPlayer.statistics.Cívica.incorrectas * -1
          } ,
          {
            "label" : "Est. Sociales" ,
            "value" : $scope.currentPlayer.statistics.Estudios.incorrectas * -1
          } ,
          {
            "label" : "Idioma" ,
            "value" : $scope.currentPlayer.statistics.Idioma.incorrectas * -1
          }
        ]
      }
    ];



  });
  $scope.play = function(){

    //construyo las preguntas para alistar el juego....
    service.prepareToPlay()
           .then(function(response){
             console.log("Prepare to play",response);
              $injector.get('$state').go('ruleta');
           });

  }

  $ionicModal.fromTemplateUrl('edit-player.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showEditPlayerModal = function(player) {
    $scope.player = player;
    $scope.action = 'Edit';
    $scope.isAdd = false;
    $scope.modal.show();
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

  $scope.editPlayer = function() {
    if($scope.player.nickname &&
       $scope.player.nickname.trim() &&
       $scope.player.science &&
       $scope.player.language){
         $scope.player._id = $scope.player.nickname;
         showBusy();
         service.updataPlayer($scope.player)
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
        showMessage("¡Error!","El jugador es invalido",null);
       }
  };


  $scope.deletePlayer = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

}
