(function homeControllerJsIife(global){
  'use strict';

  angular.module('app').controller('homeController', homeController);

  homeController.$inject = ['$scope', 'noteService'];

  function homeController($scope, noteService) {

    var vm = this;
    vm.currentNote = null;
    vm.currentTitle = "";
    vm.notes = [];
    vm.startEditing = startEditing;
    vm.createNote = createNote;

    var editor = CodeMirror.fromTextArea(document.getElementById("md-content"), {
      mode: 'gfm',
      lineNumbers: true,
      theme: "default"
    });

    editor.on('change', function editorOnChange(cm, changedObject){
    });

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

    function getContent() {
      return editor.getValue();
    }

    function startEditing(note) {
      vm.currentNote = note;
      vm.currentTitle = note.title;
      editor.setValue(note.text);
    }

    function createNote() {
      vm.currentNote = null;
      vm.currentTitle = "";
      editor.setValue("");
    }

  }

})(window);
