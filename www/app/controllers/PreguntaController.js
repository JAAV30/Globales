angular.module('app').controller('AppPregunta',['$scope','$ionicPlatform',AppPregunta]);

function AppPregunta($scope,$ionicPlatform) {

  $ionicPlatform.ready(function() {

      console.log("Ready AppPregunta");
      //$scope.dueno="LuisMi y yo trabajamos aqui, mensaje por medio de scope de angular";
      $scope.buttonColor="button button-block button-positive";
      var respuestaCorrecta=1;
      var analizado=false;
     $scope.RespuestaA="RESPUESTA A";//se carga de la base de datos
     $scope.RespuestaB="RESPUESTA B";
     $scope.RespuestaC="RESPUESTA C";
     $scope.RespuestaD="RESPUESTA D";

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
