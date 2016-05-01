angular.module('app').controller('AppPregunta',['$scope','$ionicPlatform',AppPregunta]);

function AppPregunta($scope,$ionicPlatform) {

  $ionicPlatform.ready(function() {

      console.log("Ready AppPregunta");
      //$scope.dueno="LuisMi y yo trabajamos aqui, mensaje por medio de scope de angular";
      $scope.buttonColor="button button-block button-positive";
      var respuestaCorrecta=3;
      var analizado=false;
     
     //se carga de la base de datos
    $scope.encabezado="encabezado";
    $scope.enunciado="enunciado";
    $scope.imagen="img";
    $scope.encabezadoProposiciones="Encabezado Proposiciones";
    $scope.listaProposiciones=["uno","dos","tres"];
    $scope.cuerpoPregunta="AQUI LA PREGUNTA";
    $scope.RespuestaA="RESPUESTA A";
    $scope.RespuestaB="RESPUESTA B";
    $scope.RespuestaC="RESPUESTA C";
    $scope.RespuestaD="RESPUESTA D";
    $scope.enunciado=createHTML();;

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
          texto=texto+"<li>"+$scope.listaProposiciones[i]+"</li>";
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
