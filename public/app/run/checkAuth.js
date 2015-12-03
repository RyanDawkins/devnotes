(function checkAuthJsIife(global){

  angular.module('app').run(checkAuth);

  checkAuth.$inject = ['loginService', '$location', '$rootScope'];

  function checkAuth(loginService, $location, $rootScope) {

    if(loginService.isLoggedIn()) {
      // Load user info...
      // This will pull from /users/{uid}
    }

    $rootScope.$on('$routeChangeStart', function(next, current) {
      authRedirect();
    });

    function authRedirect() {

      if($location.path() == "/404") {

      }
      else if(!loginService.isLoggedIn() && $location.path() != '/signup' && $location.path() != '/signin') {
        $location.path('/signin').replace();
        return;
      }
      else if(loginService.isLoggedIn() && ($location.path() == '/signup' || $location.path() == "/signin")) {
        loginService.logout();
      }
    }
  }

})(window);
