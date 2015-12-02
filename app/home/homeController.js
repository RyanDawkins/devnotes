(function homeControllerJsIife(global){
  'use strict';

  angular.module('app').controller('homeController', homeController);

  homeController.$inject = ['$scope', 'noteService'];

  function homeController($scope, noteService) {

    var vm = this;
    vm.currentNote = null;
    vm.text = "";
    vm.currentTitle = "";
    vm.notes = [];
    vm.startEditing = startEditing;
    vm.createNote = createNote;

    vm.codeMirrorOptions = {
      lineNumbers: true,
      lineWrapping: true,
    };

    init();

    function init() {
      noteService.getNotes(function getNotesCallback(notes, error){
        if(error) {
          console.debug("Didn't work.. Had Error");
          return;
        }

        console.debug("It worked. Here's the notes");
        console.debug(notes);

        $scope.$apply(function addingNotesToVm(){
          vm.notes = notes;
        });
      });
    }

    function startEditing(note) {
      vm.currentNote = note;
      vm.text = note.text;
      vm.currentTitle = note.title;
    }

    function createNote() {
      vm.currentNote = null;
      vm.text = "";
      vm.currentTitle = "";
    }

  }

})(window);
