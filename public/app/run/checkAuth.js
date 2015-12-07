(function checkAuthJsIife(global){

  angular.module('app').run(checkAuth);

  checkAuth.$inject = ['loginService', '$location', '$rootScope'];

  function checkAuth(loginService, $location, $rootScope) {

    if(loginService.isLoggedIn()) {
      // Load user info...
      // This will pull from /users/{uid}
    }

    $rootScope.$on('$routeChangeStart', function(next, current) {
      // This is how we handle auth on nagivation events.
      authRedirect();
    });

    function authRedirect() {

      if($location.path() == "/404") {
        // This ensures they can still navigate to the 404
      }
      else if(!loginService.isLoggedIn() && $location.path() != '/signup' && $location.path() != '/signin') {
        // Redirects to signin unless the path is to signin or signup
        $location.path('/signin').replace();
        return;
      }
      else if(loginService.isLoggedIn() && ($location.path() == '/signup' || $location.path() == "/signin")) {
        // If they navigate to signin or logout it will log them out.
        loginService.logout();
      }
    }
  }

})(window);
