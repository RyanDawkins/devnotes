(function checkAuthJsIife(global){

  angular.module('app').run(checkAuth);

  checkAuth.$inject = ['loginService', '$location', '$rootScope'];

  function checkAuth(loginService, $location, $rootScope) {

    $rootScope.$on('$routeChangeStart', function(next, current) {
      authRedirect();
    });

    function authRedirect() {
      if(!loginService.isLoggedIn() && $location.path() != '/signup') {
        $location.path('/signup').replace();
      }
    }

  }

})(window);
