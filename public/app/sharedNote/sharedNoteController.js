(function sharedNoteControllerJsIife(global){

  angular.module('app').controller('sharedNoteController', sharedNoteController);

  sharedNoteController.$inject = ['$routeParams', 'noteLookupService', '$scope'];

  function sharedNoteController($routeParams, noteLookupService, $scope) {

    var vm = this;
    vm.note = {
      title: "",
      text: ""
    }

    var user_uid = $routeParams['user'];
    var note_uid = $routeParams["note"];

    console.debug("got to sharedNote");

    if(!user_uid || !note_uid) {
      $location.path('/404').replace();
    }

    noteLookupService.lookup(user_uid, note_uid, function onNoteCallback(note, error){

      if(error) {
        console.error(error);
        return;
      }

      console.debug(user_uid);
      console.debug(note_uid);
      console.debug(note);


      $scope.$apply(function applyingToScope(){
        vm.note = note;
      });

    });

  }

})(window);
