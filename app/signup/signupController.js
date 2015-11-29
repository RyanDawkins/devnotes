(function signupControllerJsIife(global){

  angular.module('app').controller('signupController', signupController);

  function signupController() {

    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.signup = signup;

    function signup() {
      console.debug(vm.email);
      console.debug(vm.password);
    }

  }

})(window);
