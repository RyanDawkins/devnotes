(function signinControllerJsIife(global){

  angular.module('app').controller('signinController', signinController);

  signinController.$inject = ['$location', 'loginService'];

  function signinController($location, loginService) {

    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.signin = signin;

    function signin() {
      loginService.login(vm.email, vm.password, function signinCallback(user, error){

        if(error) {
          console.error(error);
          return;
        }

        console.debug("login worked!");

        $location.path("/").replace();
      });
    }
  }

})(window);
