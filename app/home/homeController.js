(function homeControllerJsIife(global){
  'use strict';

  angular.module('app').controller('homeController', homeController);

  homeController.$inject = ['$scope', 'noteService'];

  function homeController($scope, noteService) {

    var vm = this;
    vm.currentNote = {
      text: "",
      title: "",
    };
    vm.notes = [];
    vm.startEditing = startEditing;
    vm.createNote = createNote;
    vm.saveNote = saveNote;
    vm.shareNote = shareNote;
    vm.deleteNote = deleteNote;

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
    }

    function createNote() {
      vm.currentNote = {
        text: "",
        title: ""
      }
    }

    function saveNote() {

    }

    function shareNote() {
      
    }

    function deleteNote() {

    }

  }

})(window);
