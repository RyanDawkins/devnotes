(function noteServiceJsIife(){

  angular.module('app').service('noteService', noteService);

  noteService.$inject = ['firebaseRef'];

  function noteService(firebaseRef) {
    this.firebaseRef = firebaseRef;
  }

  noteService.prototype.createNote = function createNote(title, text) {

    // This ties the note to the user.
    var user_uid = this.firebaseRef.getAuth().uid;
    console.debug(user_uid);

    // Creating an id for the note
    var uid = this._getNewUid();

    var note = {
      uid: uid,
      title: title,
      text: text,
      user_uid: user_uid
    };

    return this.updateNote(note);
  }

  noteService.prototype.updateNote = function updateNote(note) {
    if(note && note.uid && note.user_uid) {
      this._getNoteRef(note).set(note);
    } else {
      console.error(note);
      throw "Note does not contain uid or is undefined";
    }

    return note;
  }

  noteService.prototype.deleteNote = function deleteNote(note) {
    if(note && note.uid) {
      this._getNoteRef(note).remove();
    } else {
      console.error(note);
      throw "Note does not contain uid or is undefined";
    }
  }

  noteService.prototype.getNotes = function getNotes(callback) {
    var user_uid = this.firebaseRef.getAuth().uid;
    var notesRef = this.firebaseRef.child('users').child(user_uid).child('notes');

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

  noteService.prototype._getNoteRef = function _getNoteRef(note) {
    if(note && note.user_uid && note.uid) {
      return this.firebaseRef.child('users').child(note.user_uid).child('notes').child(note.uid);
    }
    console.error("A field is missing from the note");
    throw "A field is missing from the note.";
  }

  noteService.prototype._getNewUid = function _getNewUid() {
    var ref = this.firebaseRef.push();
    return ref.path.o[0];
  }

})();
