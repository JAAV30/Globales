angular.module('app').controller('RuletaController',['$scope','$ionicPlatform','$injector','$ionicModal',RuletaController]);

function RuletaController($scope,$ionicPlatform,$injector,$ionicModal) {
	var src = '../app/img/myniggasong.mp3';
    var media = null;
	$scope.play = function() {
		if (media == null) {
            media = $cordovaMedia.newMedia(src, null, null, mediaStatusCallback);
        }
		media.play();
	};
    $ionicModal.fromTemplateUrl('modal', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
	  $injector.get('$state').transitionTo('pregunta');
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    $scope.$on('modal.hide', function() {
    });
    $scope.$on('modal.removed', function() {
    });
	var materiaa = ""
    $scope.$on('modal.shown', function() {
      console.log(materiaa);
    });
    $scope.imageSrc = '../app/img/josue.jpg';
	
    $scope.showImage = function(index, materia) {
		switch(index) {
			case 1:
				$scope.imageSrc = '../app/img/josue.jpg';
				break;
			case 2:
				break;
			case 3:
				break;
		} 
		$scope.openModal();
    }
  //}
	
	var wierd_modal = function(txt_field, materia){
			materiaa = materia
            //txt_field.text = materia;
			$scope.showImage(1, materia);
	}
  $ionicPlatform.ready(function() {

      console.log("Ready RuletaController");
      $scope.dueno="Humesito trabajando aquí!";
      loadPhaserSettings();
  });

  function loadPhaserSettings(service){
    var s = service;
    console.log("Drawing ....");
    // the game itself
    var game;
    // the spinning wheel
    var wheel;
    // can the wheel spin?
    var canSpin;
    // slices (prizes) placed in the wheel
    var slices = 6;
    // prize names, starting from 12 o'clock going clockwise
    var slicePrizes = ["Estudios Sociales","Ciencia", "Matemáticas","Cívica","Español", "Idioma"];
    // the prize you are about to win
    var prize;
    // text field where to show the prize
    var prizeText;
    // PLAYGAME STATE
    var playGame = function(game){};
    playGame.prototype = {
         // function to be executed once the state preloads
         preload: function(){
              // preloading graphic assets
              console.log("Loading ....");
              game.load.crossOrigin =  'anonymous' ;
              game.load.image("wheel", "../app/img/wheel.png");
              game.load.image("pin", "../app/img/pin.png");
         },
         // funtion to be executed when the state is created
        create: function(){
              // giving some color to background
              // adding the wheel in the middle of the canvas
          wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");

              // setting wheel registration point in its center
              wheel.anchor.set(0.5);
              // adding the pin in the middle of the canvas
              var pin = game.add.sprite(game.width / 2, (game.width / 2) - 8 , "pin");
              // setting pin registration point in its center
              pin.anchor.set(0.5);
              // adding the text field
              prizeText = game.add.text(game.world.centerX, 290, "");
              // setting text field registration point in its center
              prizeText.anchor.set(0.5);
              // aligning the text to center
              prizeText.align = "center";
              // the game has just started = we can spin the wheel
              canSpin = true;
              // waiting for your input, then calling "spin" function
              game.input.onDown.add(this.spin, this);
      },
         // function to spin the wheel
         spin: function(){
              // can we spin the wheel?
              if(canSpin){
                   // resetting text field
                   prizeText.text = "";
                   // the wheel will spin round from 2 to 4 times. This is just coreography
                   //rnd = RandomDataGenerator
                   var rounds = game.rnd.between(6, 8);
                   console.log(rounds);
                   // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
                   var degrees = game.rnd.between(0, 360);
                   console.log(degrees);
                   // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
                   prize = slices - 1 - Math.floor(degrees / (360 / slices));
                   console.log(prize);
                   // now the wheel cannot spin because it's already spinning
                   canSpin = false;
                   // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
                   // the quadratic easing will simulate friction
                   var spinTween = game.add.tween(wheel).to({
                        angle: (360 * rounds) + degrees
                   }, 6000, Phaser.Easing.Quartic.InOut, true);
                   // once the tween is completed, call winPrize function
                   spinTween.onComplete.add(this.winPrize, this);
              }

              else{

                console.log("The wheel is running yet");
              }
         },
         // function to assign the prize
         winPrize: function(){
              // now we can spin the wheel again
              canSpin = true;
              // writing the prize you just won
			  wierd_modal(prizeText, slicePrizes[prize])
              //prizeText.text = slicePrizes[prize];
              //$injector.get('$state').transitionTo('pregunta');


         }
      }

      game = new Phaser.Game(300, 300, Phaser.AUTO, "workspace",null,true);
      game.state.add("PlayGame",playGame);
      game.state.start("PlayGame");

  }



}
