(function signupControllerJsIife(global){

  angular.module('app').controller('signupController', signupController);

  signupController.$inject = ['signupFactory', '$location'];

  function signupController(signupFactory, $location) {

    var vm = this;
    vm.name = "";
    vm.email = "";
    vm.password = "";

    vm.signup = signup;

    function signup() {

      signupFactory.signup(vm.name, vm.email, vm.password, function signupCallback(user, error){

        if(error) {
          console.error(error);
          return;
        }

        console.debug("signup was a success", user);

        $location.path('/').replace();

      });

    }

  }

})(window);
