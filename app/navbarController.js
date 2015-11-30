(function navbarControllerJsIife(global){

  angular.module('app').controller('navbarController', navbarController);

  navbarController.$inject = ['loginService', '$location', 'userService'];

  function navbarController(loginService, $location, userService) {

    var vm = this;

    vm.logout = logout;
    vm.isLoggedIn = isLoggedIn;
    vm.getName = getName;

    function logout() {
      loginService.logout();
      $location.path('/signin').replace();
    }

    function isLoggedIn() {
      return loginService.isLoggedIn();
    }

    function getName() {
      if(isLoggedIn()) {
        return userService.getName();
      }
      return "";
    }

  }

})(window);
