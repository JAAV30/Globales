(function() {

  angular.module('app').factory('QuestionsService', ['$window','$q',QuestionsService]);
  function QuestionsService($window,$q) {

      //variables questions_db
      var questions_db;
      var _questions; // base array of questions

      //questions Arrays -> e=EASY  i= INTERMEDIATE h=HARD
      //Mathematics
      var eMath = [];
      var iM =[];
      var hM = [];
      //Spanish
      var eSpanish = [];
      var iSpanish =[];
      var hSpanish = [];
      //Social Studies
      var eSStudies = [];
      var iSStudies=[];
      var hSStudies = [];
      //Science
      var eScience = [];
      var iScience =[];
      var hScience= [];
      //Civic
      var eCivic = [];
      var iCivic =[];
      var hCivic = [];
      var _lastQuestion;
      //Language
      var eLanguage = [];
      var iLanguage=[];
      var hLanguage= [];
      //default question
      var _testQuestion ={

          structure : {

            header:"Lea la siguiente pregunta",
            question: "Quien es el mas culiolo del equipo?",
            answers : ["Luismi","Roco","Josue","Hume"],
            correctAnswer : 2,
            subject:"Civica"
          }
      }
      //game variable
      var MAX_QUESTION = 5;
      var MAX_LIVES = 3;
      var num_lives;
      var turn;
      var infoGame;
      var answered = false;
      //variables app_db
      var app_db;
      var _players;
      var _currentPlayer;


      return {
          //metodos públicos que se van a exponer
          initDBs : initDBs,
          //questions operations
          getQuestions :get_ID_subject_difficult,
          syncDB : syncDB,
          prepareQuestion : prepareQuestion,
          getLastQuestion : getLastQuestion,
          getTurn : getTurn,
          getLive : getLive,
          getInfoGame : getInfoGame,
          getQuestion : getQuestion,

          // app operations
          createPlayer: createPlayer,
          updataPlayer : updataPlayer,
          getPlayers : getPlayers,
          setCurrentPlayer:setCurrentPlayer,
          getCurrentPlayer:getCurrentPlayer,

          //game  public operations
          prepareToPlay : prepareToPlay,
          continueAction : continueAction,
          correctAnswerAction: correctAnswerAction,
          failAnswerAction : failAnswerAction,

      };

      function initDBs() {
          // Creates the database or opens if it already exists
          console.log("Init db!");
          questions_db = new PouchDB('questions_db');
          app_db =  new PouchDB('app_db');

          questions_db.info().then(console.log.bind(console));
          app_db.info().then(console.log.bind(console));
      };

      //*************************Questions operations***************************

      //Se creo una vista en la base de datos en base a
      //el archivo queries para poder aplicar un query
      //Retorna unicamente el ID,SUBJECT,DIFFICULTY de la pregunta
      function get_ID_subject_difficult(){
        if(!_questions){

          return $q.when(questions_db.query('get_ID_subject_difficulty/by_id_subj_diff'))
                   .then(
                     function(docs){
                        _questions = docs.rows.map(function(row){
                           return row.value;
                        });

                        return _questions;
                     },
                     function(error){
                       console.log("Error get questions view",error);

                     });
        }
        else{
          return $q.when(_questions);
        }

      };

      function syncDB(){
        // return a promise
        return questions_db.replicate.from('http://52.25.123.177:5984/questions_db',{live: false,retry: false});

      };

      function getQuestion(id , options){
        return $q.when(questions_db.get(id,options));
      };

      function getLastQuestion (){
        return _lastQuestion;
      }

      function getTurn (){
        return turn;
      }
      function getLive (){
        return num_lives;
      }
      //*************************DB APP operations***************************
      function getPlayers() {

          if (!_players) {
              return $q.when(app_db.allDocs({ include_docs: true}))
                        .then(
                        function(docs) {

                          // Each row has a .doc object and we just want to send an
                          // array of birthday objects back to the calling controller,
                          // so let's map the array to contain just the .doc objects.
                          _players = docs.rows.map(function(row) {
                              // Dates are not automatically converted from a string.
                              return row.doc;
                          });

                          // Listen for changes on the database.

                          app_db.changes({ live: true, since: 'now', include_docs: true})
                             .on('change', onDatabaseChange);


                         return _players;
                       },
                     function (error){

                       console.log("Error getting the questions");
                       console.log(error);

                     });
          } else {
              // Return cached data as a promise
              return $q.when(_players);
          }
      };

      function createPlayer (player){
        return $q.when(app_db.post(player));
      };

      function updataPlayer (player){
        return $q.when(app_db.put(player));
      };
      //guardo el usuario actual en el almacenamiento de la session
      function setCurrentPlayer (player){
        _currentPlayer = player;
      };
      //obtengo el usuario actual en el almacenamiento de la session
      function getCurrentPlayer (){
        return _currentPlayer;
      };

      function getInfoGame(){
        return infoGame;
      };

      function onDatabaseChange(change) {
          var index = findIndex(_players, change.id);
          var player = _players[index];

          if (change.deleted) {
              if (player) {
                  _players.splice(index, 1); // delete
              }
          } else {
              if (player && player._id === change.id) {
                  _players[index] = change.doc; // update
              } else {
                  _players.splice(index, 0, change.doc) // insert
              }
          }
      };

      function findIndex(array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
          mid = (low + high) >>> 1;
          array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
      };

      //********************GAME OPERATIONS************************************
      function buildArrays(){
        var language = _currentPlayer.language;
        var science = _currentPlayer.science;
        var count = 0;

        for(var i = 0; i< _questions.length ; i++){
          //Matematicas--
          if(_questions[i].subject ==="Matemática" && _questions[i].difficulty === "E"){
            if(eMath.length < 5 && count<90){
              eMath.push(_questions[i]._id);
              count = count + 1;
            }
          }
          else if(_questions[i].subject ==="Matemática" && _questions[i].difficulty === "I"){
            if(iM.length < 5 && count<90){
              iM.push(_questions[i]._id);
              count = count + 1;
            }
          }

          else if(_questions[i].subject ==="Matemática" && _questions[i].difficulty ==="H"){
            if(hM.length < 5 && count<90){
              hM.push(_questions[i]._id);
              count = count + 1;
            }
          }
          //Español--
          else if(_questions[i].subject ==="Español" && _questions[i].difficulty === "E"){
            if(eSpanish.length < 5 && count<90){
              eSpanish.push(_questions[i]._id);
              count = count + 1;
            }
          }
          else if(_questions[i].subject ==="Español" && _questions[i].difficulty === "I"){
            if(iSpanish.length < 5 && count<90){
              iSpanish.push(_questions[i]._id);
              count = count + 1;
            }
          }

          else if(_questions[i].subject ==="Español" && _questions[i].difficulty === "H"){
            if(hSpanish.length < 5 && count<90){
              hSpanish.push(_questions[i]._id);
              count = count + 1;
            }
          }
          //Estudios sociales--
          else if(_questions[i].subject ==="Estudios Sociales" && _questions[i].difficulty === "E"){
            if(eSStudies.length < 5 && count<90){
              eSStudies.push(_questions[i]._id);
              count = count + 1;
            }
          }
          else if(_questions[i].subject ==="Estudios Sociales" && _questions[i].difficulty === "I"){
            if(iSStudies.length < 5 && count<90){
              iSStudies.push(_questions[i]._id);
              count = count + 1;
            }
          }

          else if(_questions[i].subject ==="Estudios Sociales" && _questions[i].difficulty === "H"){
            if(hSStudies.length < 5 && count<90){
              hSStudies.push(_questions[i]._id);
              count = count + 1;
            }
          }
          //Science--
          else if(_questions[i].subject ===science && _questions[i].difficulty ==="E"){
            if(eScience.length < 5 && count<90){
              eScience.push(_questions[i]._id);
              count = count + 1;
            }
          }
          else if(_questions[i].subject ===science && _questions[i].difficulty === "I"){
            if(iScience.length < 5 && count<90){
              iScience.push(_questions[i]._id);
              count = count + 1;
            }
          }

          else if(_questions[i].subject ===science && _questions[i].difficulty === "H"){
            if(hScience.length < 5 && count<90){
              hScience.push(_questions[i]._id);
              count = count + 1;
            }
          }
          //Civica--
          else if(_questions[i].subject ==="Cívica" && _questions[i].difficulty === "E"){
            if(eCivic.length < 5 && count<90){
              eCivic.push(_questions[i]._id);
              count = count + 1;
            }
          }
          else if(_questions[i].subject ==="Cívica" && _questions[i].difficulty === "I"){
            if(iCivic.length < 5 && count<90){
              iCivic.push(_questions[i]._id);
              count = count + 1;
            }
          }

          else if(_questions[i].subject ==="Cívica" && _questions[i].difficulty === "H"){
            if(hCivic.length < 5 && count<90){
              hCivic.push(_questions[i]._id);
              count = count + 1;
            }
          }
          //Lenguaje--
          else if(_questions[i].subject ===language && _questions[i].difficulty === "E"){
            if(eLanguage.length < 5 && count<90){
              eLanguage.push(_questions[i]._id);
              count = count + 1;
            }
          }
          else if(_questions[i].subject ===language && _questions[i].difficulty === "I"){
            if(iLanguage.length < 5 && count<90){
              iLanguage.push(_questions[i]._id);
              count = count + 1;
            }
          }

          else if(_questions[i].subject ===language && _questions[i].difficulty === "H"){
            if(hLanguage.length < 5 && count<90){
              hLanguage.push(_questions[i]._id);
              count = count + 1;
            }
          }
          else {

          }
        }

        return count;
      };

      function initialize_Game (){

        turn = 0;
        num_lives = 3;
        infoGame ={
          Matemática:{"correctas":0, "incorrectas":0},
          Español:{"correctas":0, "incorrectas":0},
          Ciencia:{"correctas":0, "incorrectas":0},
          Idioma:{"correctas":0, "incorrectas":0},
          Cívica:{"correctas":0, "incorrectas":0},
          Estudios:{"correctas":0, "incorrectas":0}
        };
        eMath = [];
        iM =[];
        hM = [];
        //Spanish
        eSpanish = [];
        iSpanish =[];
        hSpanish = [];
        //Social Studies
        eSStudies = [];
        iSStudies=[];
        hSStudies = [];
        //Science
        eScience = [];
        iScience =[];
        hScience= [];
        //Civic
        eCivic = [];
        iCivic =[];
        hCivic = [];
        _lastQuestion;
        //Language
        eLanguage = [];
        iLanguage=[];
        hLanguage= [];
      };

      function prepareToPlay (){

        return $q.when (get_ID_subject_difficult().then(
          function(questions){

            _questions.shuffle();
            initialize_Game();
            var count = buildArrays();  // llenar arreglos con las preguntas segun su materia y dificultad
            return {"counter":count};
        }));

      };

      function prepareQuestion (subject,difficulty){

        turn = turn + 1;
        var questionID;
        var language = _currentPlayer.language;
        var science = _currentPlayer.science;
        if( subject ==="Matemática" && difficulty === "E"){
            questionID = eMath.shift();

        }
        else if(subject ==="Matemática" && difficulty === "I"){
            questionID = iM.shift();

        }

        else if(subject ==="Matemática" && difficulty ==="H"){
            questionID = hM.shift();

        }
        //Español--
        else if(subject ==="Español" && difficulty === "E"){
            questionID = eSpanish.shift();

        }
        else if(subject ==="Español" && difficulty === "I"){
            questionID = iSpanish.shift();

        }

        else if(subject ==="Español" && difficulty === "H"){
            questionID = hSpanish.shift();

        }
        //Estudios sociales--
        else if(subject ==="Estudios Sociales" && difficulty === "E"){
            questionID = eSStudies.shift();

        }
        else if(subject ==="Estudios Sociales" && difficulty === "I"){
            questionID = niSStudies.shift();

        }

        else if(subject ==="Estudios Sociales" && difficulty === "H"){

            questionID = hSStudies.shift();
        }
        //Science--
        else if(subject ===science && difficulty ==="E"){

            questionID = eScience.shift();
        }
        else if(subject ===science && difficulty === "I"){

            questionID = iScience.shift();
        }

        else if(subject ===science && difficulty === "H"){
            questionID = hScience.shift();
        }
        //Civica--
        else if(subject ==="Cívica" && difficulty === "E"){
            questionID = eCivic.shift();
        }
        else if(subject ==="Cívica" && difficulty === "I"){
            questionID = iCivic.shift();
        }

        else if(subject ==="Cívica" && difficulty === "H"){
            questionID = hCivic.shift();

        }
        //Lenguaje--
        else if(subject ===language && difficulty === "E"){
            questionID = eLanguage.shift();
        }
        else if(subject ===language && difficulty === "I"){
            questionID = iLanguage.shift();
        }

        else if(subject ===language && difficulty === "H"){
            questionID = hLanguage.shift();
        }
        else {
            questionID = null;
        }

        if(questionID){

          return $q.when(getQuestion(questionID,{attachments: true}))
                   .then(
                     function(questionObj){
                       _lastQuestion = questionObj;
                       return {ok: "true", bd:"true", error:null};
                    },
                    function(error){
                      _lastQuestion = null;
                      return {ok:"false",bd:"false", error:error};
                    }
                 );
        }
        else{
          _lastQuestion = _testQuestion;
          return $q.when( {ok:"true",bd:"false", error:null});
        }
      };

      function correctAnswerAction(question){
        if(!answered){

          console.log("SUCCESS!");
          var subject = _lastQuestion.subject;//question.subject;
          if(subject == "Química" || subject == "Biología"|| subject == "Física Matemática"){
            subject="Ciencia";
          }
          else if(subject == "Inglés" || subject == "Francés"){
            subject="Idioma";
          }
          else if(subject == "Estudios Sociales"){
            subject="Estudios";
          }
          infoGame[subject].correctas=infoGame[subject].correctas+1;
        }
      };

      function failAnswerAction(question){
        console.log("FAIL!");
        var subject = _lastQuestion.subject;//question.subject;
        if(subject == "Química" || subject == "Biología"|| subject == "Física Matemática"){
          subject="Ciencia";
        }
        else if(subject == "Inglés" || subject == "Francés"){
          subject="Idioma";
        }
        else if(subject == "Estudios Sociales"){
          subject="Estudios";
        }
        infoGame[subject].incorrectas=infoGame[subject].incorrectas+1;
        num_lives = num_lives - 1;
      };

      function continueAction (){

        console.log("Turn",turn);
        console.log("Lives",num_lives);
        console.log("MAX_QUESTION",MAX_QUESTION);
        var response;
        if(turn === MAX_QUESTION && num_lives > 0 ){

          response = {finished : true,status: "WON"};
        }
        else if (num_lives === 0){

          response = {finished: true,status : "LOST"};
        }
        else {

          response = {finished: false ,status : "LIVING"};
        }

        return response;
      };
  }
})();
