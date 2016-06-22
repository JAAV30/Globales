angular.module('app').controller('ErrorDataController',['$scope','$ionicPlatform','$ionicPopup','$injector','$ionicLoading','$ionicHistory','QuestionsService',ErrorDataController]);

function ErrorDataController($scope,$ionicPlatform,$ionicPopup,$injector,$ionicLoading,$ionicHistory,service) {

  $ionicPlatform.ready(function() {

      console.log("Ready ErrorDataController");
      $scope.dueno="Algun valiente que xD trabaje aqui, mensaje por medio de scope de angular";
  });

  $scope.syncDB = function(){
    show();
    service.syncDB()
           .then(
             function(dataSync){ //syncDB success
               hide();
               showMessage("¡Perfecto!","Se ha sincronizado correctamente",
               function(){
                   $ionicHistory.nextViewOptions({
                       disableBack: true
                   });
                   $injector.get('$state').go('registro');
               });
             },

             function(error){ //syncDB fail
                 hide();
                console.log(error)
                showMessage("¡Lo sieto!","No ha sido posible sincronizar, intente de nuevo");
             }

           )
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

  function show() {
    $ionicLoading.show({
      //duration: 50000,
      noBackdrop: true,
      template: '<p class="item-icon-left">Cargando datos...<ion-spinner icon="lines"/></p>'
    });
    //hide();
  };

  function hide (){
    $ionicLoading.hide();
  };


}
