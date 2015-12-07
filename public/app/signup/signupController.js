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

          // Here we will display to the user the problem
          switch (error.code) {
            case "EMAIL_TAKEN":
              toastr.error("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              toastr.error("The specified email is not a valid email.");
              break;
            default:
              toastr.error("Error creating user:", error);
          }
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
