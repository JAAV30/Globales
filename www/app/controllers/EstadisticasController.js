angular.module('app').controller('EstadisticasController',['$scope','$ionicPlatform','$ionicModal','$injector','QuestionsService',EstadisticasController]);

function EstadisticasController($scope,$ionicPlatform,$ionicModal,$injector,service) {

  $ionicPlatform.ready(function() {

    console.log("Ready EstadisticasController");
    $scope.currentPlayer = service.getCurrentPlayer();
    $scope.dueno="Josue trabaje aqui, mensaje por medio de scope de angular";
    $scope.ganada=" 17";
    $scope.perdida=" 6";
    $scope.habilidad=" Ingles";
    $scope.debilidad=" Matemáticas";
    $scope.tiempo=" 40:30";
    $scope.chart1 = {};
    $scope.chart2 = {};
    $scope.chart1.options = {
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

    $scope.chart1.data = [
      {
        key: "Juegos Ganados",
        y: 4,
        color:"#00C853"
      },
      {
        key: "Juegos Perdidos",
        y: 11,
        color : "#D50000"
      }
    ];

    $scope.chart2.options = {
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

    $scope.chart2.data = [
      {
        key: 'Acertadas',
        color:"#00C853",
        values: [
          {
            "label" : "Matemática" ,
            "value" : 2
          } ,
          {
            "label" : "Español" ,
            "value" : 10
          } ,
          {
            "label" : "Química" ,
            "value" : 7
          } ,
          {
            "label" : "Cívica" ,
            "value" : 18
          } ,
          {
            "label" : "Est. Sociales" ,
            "value" : 16
          } ,
          {
            "label" : "Inglés" ,
            "value" : 5
          }
        ]
      },
      {
        key: 'Falladas',
          color:"#D50000",
        values: [
          {
            "label" : "Matemática" ,
            "value" : -10
          } ,
          {
            "label" : "Español" ,
            "value" : -4
          } ,
          {
            "label" : "Química" ,
            "value" : -5
          } ,
          {
            "label" : "Cívica" ,
            "value" : -2
          } ,
          {
            "label" : "Est. Sociales" ,
            "value" : -5
          } ,
          {
            "label" : "Inglés" ,
            "value" : -6
          }
        ]
      }
    ];

    $scope.play = function(){

      //construyo las preguntas para alistar el juego....
      $injector.get('$state').transitionTo('ruleta');
    }

    $scope.currentPlayer = service.getCurrentPlayer();
  });

  $ionicModal.fromTemplateUrl('edit-player.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showEditPlayerModal = function() {
    $scope.action = 'Edit';
    $scope.isAdd = false;
    $scope.modal.show();
  };

  $scope.savePlayer = function() {

    $scope.modal.hide();
  };

  $scope.deletePlayer = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


}
