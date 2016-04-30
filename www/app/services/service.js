(function() {

  angular.module('app').factory('QuestionsService', ['$q',QuestionsService]);
  function QuestionsService($q) {
      var _db;
      var _questions;

      return {

          initDB : initDB,
          addQuestion : addQuestion,
          getQuestions: getQuestions,
          syncDB : syncDB

      };

      function initDB() {
          // Creates the database or opens if it already exists
          console.log("Init db!");
          _db = new PouchDB('questions_db');
          _db.info().then(console.log.bind(console));
          console.log(_db.adapter);
      };

      function addQuestion(question) {
          return $q.when(_db.post(question));
      };

      function getQuestions() {

          if (!_questions) {
              return $q.when(_db.allDocs({ include_docs: true}))
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
                          _db.changes({ live: true, since: 'now', include_docs: true})
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

      function syncDB(){
        // return a promise
        return _db.replicate.from('http://52.25.123.177:5984/questions_db',{live: false,retry: false});

    };
  }
})();
