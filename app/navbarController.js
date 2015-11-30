(function navbarControllerJsIife(global){

  angular.module('app').controller('navbarController', navbarController);

  navbarController.$inject = ['loginService', '$location'];

  function navbarController(loginService, $location) {

    var vm = this;

    vm.logout = logout;
    vm.isLoggedIn = isLoggedIn;

    function logout() {

      loginService.logout();
      $location.path('/signin').replace();

    }

    function isLoggedIn() {
      return loginService.isLoggedIn();
    }
  }

})(window);
