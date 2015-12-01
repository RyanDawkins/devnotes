(function noteServiceJsIife(){

  angular.module('app').service('noteService', noteService);

  noteService.$inject = ['firebaseRef'];

  function noteService(firebaseRef) {
    this.firebaseRef = firebaseRef;
  }

  noteService.prototype.createNote = function createNote(title, text) {
    var uid = this.firebaseRef.push();
    var note = {
      uid: uid,
      title: title,
      text: text
    };

    this.firebaseRef.child('notes').child(uid).set(note);

    return note;
  }

  noteService.prototype.updateNote = function updateNote(note) {
    if(note && note.uid) {
      this.firebaseRef.child('notes').child(note.uid).set(note);
    } else {
      console.error(note);
      throw "Note does not contain uid or is undefined";
    }
  }

  noteService.prototype.deleteNote = function deleteNote(note) {
    if(note && note.uid) {
      this.firebaseRef.child('notes').child(note.uid).remove();
    } else {
      console.error(note);
      throw "Note does not contain uid or is undefined";
    }
  }

  noteService.prototype.getNotes = function getNotes(callback) {
    var notesRef = this.firebaseRef.child('notes');

    notesRef.on('value', function onValueCallback(snapshot){

      // On success
      console.debug("got notes");
      console.debug(snapshot);
      console.debug(snapshot.val());
      callback(snapshot.val());

    }, function errorCallback(error){

      // On success
      console.debug("read failed");
      console.error(error);
      callback(null, error);
    });
  }

})();
