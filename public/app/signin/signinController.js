(function signinControllerJsIife(global){

  angular.module('app').controller('signinController', signinController);

  signinController.$inject = ['$rootScope', '$location', 'loginService'];

  function signinController($rootScope, $location, loginService) {

    var vm = this;
    vm.email = "";
    vm.password = "";
    vm.showSpinner = false;

    vm.signin = signin;

    function signin() {
      vm.showSpinner = true;

      loginService.login(vm.email, vm.password, function signinCallback(user, error){

        if(error) {
          console.error(error);
          return;
        }

        $rootScope.$apply(function(){
          vm.showSpinner = false;
          $location.path("/").replace();
        });

      });
    }
  }

})(window);
