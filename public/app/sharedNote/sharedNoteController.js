(function sharedNoteControllerJsIife(global){

  angular.module('app').controller('sharedNoteController', sharedNoteController);

  sharedNoteController.$inject = ['firebaseRef', '$routeParams'];

  function sharedNoteController(firebaseRef, $routeParams) {

    var user_uid = $routeParams['user'];
    var note_uid = $routeParams["note"];

    if(!user_uid || !note_uid) {
      $location.path('/404').replace();
    }

  }

})(window);
