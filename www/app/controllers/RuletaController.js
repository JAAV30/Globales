angular.module('app').controller('RuletaController',['$scope','$ionicPlatform','$injector','$ionicModal','QuestionsService','$timeout','$cordovaNativeAudio',RuletaController]);

function RuletaController($scope,$ionicPlatform,$injector,$ionicModal,service,$timeout,$cordovaNativeAudio) {

	$ionicPlatform.ready(function() {
		//$cordovaNativeAudio.preloadSimple('roulette', 'app/sounds/hotroulette.wav');
		//$cordovaNativeAudio.preloadSimple('selected', 'app/sounds/selected.wav');
		$scope.currentPlayer = service.getCurrentPlayer();
		var currentSubject = null;
		var materia = "";
		console.log("Ready RuletaController");
		loadPhaserSettings(service);
	});


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
		$injector.get('$state').go('pregunta');

	};

	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.$on('modal.hide', function() {
	});
	$scope.$on('modal.removed', function() {
	});
	$scope.$on('modal.shown', function() {
		console.log(materia);
	});

	$scope.imageSrc = 'app/img/avatar.svg';

	$scope.showImage = function(materia) {
		//$cordovaNativeAudio.play('selected');
		switch(materia) {
			case "Matematica":
			$scope.imageSrc = 'app/img/avatar.svg';
			break;
			default :
			$scope.imageSrc = 'app/img/ionic.png';
		}
		$scope.openModal();
	}
	//}

	var wierd_modal = function(txt_field, materia){
		$scope.showImage(materia);
	}


	function loadPhaserSettings(service){
		var language = $scope.currentPlayer.language;
		var  science= $scope.currentPlayer.science;
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
		var slicePrizes = ["Estudios Sociales",science, "Matemática","Cívica","Español", language];
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
				game.load.image("wheel", "app/img/wheel.png");
				game.load.image("pin", "app/img/pin.png");
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
				wheel.align = "center";
				// the game has just started = we can spin the wheel
				canSpin = true;
				// waiting for your input, then calling "spin" function
				game.input.onDown.add(this.spin, this);
			},
			// function to spin the wheel
			spin: function(){
				// can we spin the wheel?
				if(canSpin){
					//$cordovaNativeAudio.play('roulette');
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
				var subject = slicePrizes[prize];
				//prizeText.text = slicePrizes[prize];
				//$injector.get('$state').transitionTo('pregunta');
				s.prepareQuestion(subject,"H")
				.then(function(response){
					console.log("Response: ",response);
					wierd_modal(prizeText, subject);
				});
			}
		}

		game = new Phaser.Game(375, 350, Phaser.AUTO, "workspace",null,true);
		game.state.add("PlayGame",playGame);
		game.state.start("PlayGame");

	}

}
