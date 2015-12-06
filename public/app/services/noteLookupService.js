(function noteLookupServiceJsIife(global){

  angular.module('app').service('noteLookupService', noteLookupService);

  noteLookupService.$inject = ['firebaseRef'];

  function noteLookupService(firebaseRef) {
    this.firebaseRef = firebaseRef;
  }

  noteLookupService.prototype.lookup = function lookup(user_uid, note_uid, callback) {

    var noteRef = this.firebaseRef.child('users').child(user_uid).child('notes').child(note_uid);

    noteRef.on('value', function onSuccessCallback(snapshot){
      callback(snapshot.val());
    }, function onErrorCallback(error){
      callback(null, error);
    });

  }

})(window);
