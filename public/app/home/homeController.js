(function homeControllerJsIife(global){
  'use strict';

  angular.module('app').controller('homeController', homeController);

  homeController.$inject = ['$scope', '$timeout', 'noteService', 'userLookupService'];

  function homeController($scope, $timeout, noteService, userLookupService) {

    var vm = this;

    // Notes stuff
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

    // Searching for email
    vm.searchByEmail = searchByEmail;
    vm.emailSearchInput = "";

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
      $timeout(function(){
        vm.currentNote = {
          text: "",
          title: ""
        }
      },0);
    }

    function saveNote() {
      var self = this;
      if(vm.currentNote.uid) {

        // This forces it to happen async. This fixes a digest error...
        $timeout(function(){
          self.currentNote = noteService.updateNote(self.currentNote);
        },0);
      } else {

        // This forces it to happen async. This fixes a digest error...
        $timeout(function(){
          self.currentNote = noteService.createNote(self.currentNote.title, self.currentNote.text);
        },0);
      }
      noteService.getNotes(function getNotesCallback(notes, error){
        if(error) {
          console.error(error);
          return;
        }

        // This forces it to happen async. This fixes a digest error...
        $timeout(function(){
          vm.notes = notes;
        },0);
      });
    }

    function shareNote() {
      $("#userLookupModal").modal("show");
    }

    function deleteNote() {
      noteService.deleteNote(this.currentNote);

      this.createNote();

      noteService.getNotes(function getNotesCallback(notes, error){
        if(error) {
          console.error(error);
          return;
        }

        // This forces it to happen async. This fixes a digest error...
        $timeout(function(){
          vm.notes = notes;
        },0);
      });
    }

    function searchByEmail() {
      var email = vm.emailSearchInput;
      var value = userLookupService.byEmail(email, function emailCallback(users, error){
        if(error) {
          console.error(error);
          return;
        }
        console.debug("here's the users");
        console.debug(users);
      });
    }

  }

})(window);
