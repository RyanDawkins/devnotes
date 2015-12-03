(function signupControllerJsIife(global){

  angular.module('app').controller('signupController', signupController);

  signupController.$inject = ['$rootScope', 'signupFactory', '$location'];

  function signupController($rootScope, signupFactory, $location) {

    var vm = this;
    vm.name = "";
    vm.email = "";
    vm.password = "";
    vm.showSpinner = false;

    vm.signup = signup;

    function signup() {

      vm.showSpinner = true;

      signupFactory.signup(vm.name, vm.email, vm.password, function signupCallback(user, error){

        if(error) {
          console.error(error);
          return;
        }

        console.debug("signup was a success", user);

        // This is necessary because the callback runs outside of angular scope binding
        $rootScope.$apply(function(){
          vm.showSpinner = false;
          $location.path('/').replace();
        });
      });
    }
  }

})(window);
