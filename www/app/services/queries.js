
// Los queries se estan guardando manualmente a la base de datos COUCHDB
//getAll_ID_subject_difficulty
var get_ID_subject_difficulty =
{
  _id: '_design/get_ID_subject_difficulty',
  views: {
    by_id_subj_diff: {
      map:
      function (doc) {
        if(doc.subject && doc.difficulty){
          emit(doc._id , {_id: doc._id, subject :doc.subject, difficulty:doc.difficulty});
        }

      }.toString()
    }
  }
};
