(function() {

  angular.module('app').factory('QuestionsService', ['$window','$q',QuestionsService]);
  function QuestionsService($window,$q) {

      //variables questions_db
      var questions_db;
      var _questions;
      //variables app_db
      var app_db;
      var _players;

      return {

          initDBs : initDBs,
          //questions operations
          getQuestions: getQuestions,
          syncDB : syncDB,
          getQuestion : getQuestion,
          get_ID_subject_difficult : get_ID_subject_difficult,

          // app operations
          createPlayer: createPlayer,
          getPlayers : getPlayers,
          setCurrentPlayer:setCurrentPlayer,
          getCurrentPlayer:getCurrentPlayer
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
      function getQuestions() {

          if (!_questions) {
              return $q.when(questions_db.allDocs({ include_docs: true}))
                        .then(
                        function(docs) {

                          // Each row has a .doc object and we just want to send an
                          // array of birthday objects back to the calling controller,
                          // so let's map the array to contain just the .doc objects.
                          _questions = docs.rows.map(function(row) {
                              // Dates are not automatically converted from a string.
                              return row.doc;
                          });

                          // Listen for changes on the database.
                          /*
                          questions_db.changes({ live: true, since: 'now', include_docs: true})
                             .on('change', onDatabaseChange);
                             */

                         return _questions;
                       },
                     function (error){

                       console.log("Error getting the questions");
                       console.log(error);

                     });
          } else {
              // Return cached data as a promise
              return $q.when(_questions);
          }
      };

      //Se creo una vista en la base de datos en base a
      //el archivo queries para poder aplicar un query
      function get_ID_subject_difficult(){

        return $q.when(questions_db.query('get_ID_subject_difficulty/by_id_subj_diff'));
      };

      function syncDB(){
        // return a promise
        return questions_db.replicate.from('http://52.25.123.177:5984/questions_db',{live: false,retry: false});

      };

      function getQuestion(subject,difficulty){};

      //*************************APP operations***************************

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
        if(!($window.sessionStorage.hasOwnProperty("currentPlayer"))){

          $window.sessionStorage.setItem("currentPlayer",JSON.stringify(player));
        }
        else{

            $window.sessionStorage.currentPlayer = JSON.stringify(player);
        }

      };
      //obtengo el usuario actual en el almacenamiento de la session
      function getCurrentPlayer (player){
        if($window.sessionStorage.hasOwnProperty("currentPlayer")){
          return JSON.parse($window.sessionStorage.getItem("currentPlayer"))
        }
        else{
          return null;
        }
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
  }
})();
