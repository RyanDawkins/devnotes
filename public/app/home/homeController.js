(function homeControllerJsIife(global){
  'use strict';

  angular.module('app').controller('homeController', homeController);

  homeController.$inject = ['$scope', '$timeout', 'noteService', 'userLookupService'];

  function homeController($scope, $timeout, noteService, userLookupService) {

    var vm = this;

    // Notes stuff
    vm.currentNote = {
      text: "",
      title: "Untitled Note",
      newNote: true,
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

    $scope.$watch('vm.currentNote.text', onChangeText);

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
          title: "Untitled Note",
          newNote: true,
        }
      },0);
    }

    function saveNote() {
      if(vm.currentNote.uid) {

        // This forces it to happen async. This fixes a digest error...
        $timeout(function(){
          vm.currentNote = noteService.updateNote(vm.currentNote);
        },0);
      } else {

        // This forces it to happen async. This fixes a digest error...
        $timeout(function(){
          vm.currentNote = noteService.createNote(vm.currentNote.title, vm.currentNote.text);
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
      $('#linkModal').modal('show');

      var user_uid = this.currentNote.user_uid;
      var note_uid = this.currentNote.uid;

      var link = location.host+"/#/"+"user/"+user_uid+"/note/"+note_uid;
      vm.noteLink = link;

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

    var typingInterval = 2000;
    var typingTimer;
    var lastSaveTime = null;
    var startedTyping = false;
    function onChangeText(newVal, oldVal) {

      // This prevents auto saving.
      if(vm.currentNote.newNote) {
        vm.currentNote.newNote = false;
        return;
      }

      var currentTime = (new Date()).getTime();
      if(lastSaveTime != null && currentTime - lastSaveTime > typingInterval) {
        doneTypingSaveNote(currentTime);
      } else if(lastSaveTime == null && oldVal == "") {
        typingTimer = setTimeout(doneTypingSaveNote, typingInterval);
      }
    }

    function doneTypingSaveNote(currentTime) {

      clearTimeout(typingTimer);

      if(currentTime) {
        lastSaveTime = currentTime;
      } else {
        lastSaveTime = (new Date()).getTime();
      }
      saveNote();
      typingTimer = setTimeout(saveNote, typingInterval);
    }

  }

})(window);
