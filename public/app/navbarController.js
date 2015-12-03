(function navbarControllerJsIife(global){

  angular.module('app').controller('navbarController', navbarController);

  navbarController.$inject = ['loginService', '$location', 'userService', '$rootScope'];

  function navbarController(loginService, $location, userService, $rootScope) {

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
      return userService.getName();
    }

    $rootScope.$on('$routeChangeStart', function(next, current) {
      if(loginService.isLoggedIn()){
        userService.loadUser(function loadUserCallback(user, error){
          userService.setName(user.name);
        });
      }
    });

  }

})(window);
