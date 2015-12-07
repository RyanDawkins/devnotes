(function navbarControllerJsIife(global){

  angular.module('app').controller('navbarController', navbarController);

  navbarController.$inject = ['loginService', '$location', 'userService', '$rootScope'];

  function navbarController(loginService, $location, userService, $rootScope) {

    var vm = this;

    vm.logout = logout;
    vm.isLoggedIn = isLoggedIn;
    vm.getName = getName;

    $rootScope.$on('$routeChangeStart', onRouteChange);

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

    function onRoutechange(next, current) {

      // This is here to ensure the name exists or doesn't depending upon status
      if(loginService.isLoggedIn()){
        userService.loadUser(function loadUserCallback(user, error){
          userService.setName(user.name);
        });
      }
    }

  }

})(window);
