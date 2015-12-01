(function homeControllerJsIife(global){
  'use strict';

  angular.module('app').controller('homeController', homeController);

  homeController.$inject = [];

  function homeController() {

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

    function test() {
      var text = editor.getValue();
      
    }
  }

})(window);
