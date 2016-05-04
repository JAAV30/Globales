angular.module('app').controller('AppPregunta',['$scope','$ionicPlatform',AppPregunta]);

function AppPregunta($scope,$ionicPlatform) {

  $ionicPlatform.ready(function() {

      console.log("Ready AppPregunta");
      //$scope.dueno="LuisMi y yo trabajamos aqui, mensaje por medio de scope de angular";
      $scope.buttonColor="button button-block button-positive";
      var analizado=false;

     //se carga de la base de datos
    $scope.objeto={
      header:"Considere el siguiente enunciado",
      statement:"El área 'A' de la esfera en función de su radio 'r' esta dada por A(r) = 4πr²",
      proporsals:[{header:"De acuerdo con el enunciado anterior, considere las siguientes proposiciones",
      list:[
      {opc:"r es una variable independiente."},
      {opc:"El área de la esfera depende del radio"},
    ]}],
      question:"La diferencia entre dos números naturales es 9 y la suma de sus cuadrados es 725, entonces el número menor es",
      answers:[
        {a:"Ambas"},
        {b:"Ninguna"},
        {c:"Solo la I"},
        {d:"Solo la II"}],
      correctAnswer:0
    }
    var respuestaCorrecta=$scope.objeto.correctAnswer;
    $scope.encabezado=$scope.objeto.header;
    $scope.enunciado=$scope.objeto.statement;
    $scope.imagen="img";
    $scope.encabezadoProposiciones=$scope.objeto.proporsals[0].header;
    $scope.listaProposiciones=$scope.objeto.proporsals[0].list;
    $scope.cuerpoPregunta=$scope.objeto.question;
    $scope.RespuestaA=$scope.objeto.answers[0];
    $scope.RespuestaB=$scope.objeto.answers[1];
    $scope.RespuestaC=$scope.objeto.answers[2];
    $scope.RespuestaD=$scope.objeto.answers[3];
    $scope.enunciado=createHTML();

  function createHTML(){

    var texto="";
      if($scope.encabezado != null){
        texto=texto+"<p>"+$scope.encabezado+"</p><br>";
      }
      if($scope.enunciado != null){
        texto=texto+"<p>"+$scope.enunciado+"</p><br>";
      }
      if($scope.encabezadoProposiciones != null){
        texto=texto+"<p>"+$scope.encabezadoProposiciones+"</p><br>";
      }
      if($scope.listaProposiciones.length > 0){
        texto=texto+"<p><ol>";
        for (var i = 0; i < $scope.listaProposiciones.length; i++) {
          texto=texto+"<li>"+(i+1)+" "+$scope.listaProposiciones[i].opc+"</li>";
        };
        texto=texto+"</ol></p>";
      }
      console.log(texto);
      return texto;
  }

	$scope.colorClass=function(value){
  		if(analizado){
  			if(value==respuestaCorrecta){
  				return "button button-block button-balanced";
  			}
  			else {
  				return "button button-block button-assertive";
  			}
  		}
  		return "button button-block button-positive";
  	}

  $scope.checkAnswer=function(value){
		analizado=true;
		if(respuestaCorrecta == value){
			showAlert();
		}
	}

  });


}
