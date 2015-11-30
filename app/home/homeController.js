(function homeControllerJsIife(global){
  'use strict';

  angular.module('app').controller('homeController', homeController);

  homeController.$inject = [];

  function homeController() {

    var vm = this;
    vm.notes = [];

  }

})(window);
