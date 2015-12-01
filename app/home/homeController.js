(function homeControllerJsIife(global){
  'use strict';

  angular.module('app').controller('homeController', homeController);

  homeController.$inject = ['$scope'];

  function homeController($scope) {

    var vm = this;
    vm.currentTitle = "";
    vm.content = "";
    vm.notes = [];

    vm.test = test;

    var editor = CodeMirror.fromTextArea(document.getElementById("md-content"), {
      mode: 'gfm',
      lineNumbers: true,
      theme: "default"
    });

    editor.on('change', function editorOnChange(cm, changedObject){
    });

    function getContent() {
      return editor.getValue();
    }

    function test() {
      console.debug(getContent());
    }
  }

})(window);
