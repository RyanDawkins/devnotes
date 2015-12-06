(function routesJsIife(global){

  angular.module('app').config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/home/home.html',
        controller: 'homeController',
        controllerAs: 'vm'
      })
      .when('/signup', {
        templateUrl: '/app/signup/signup.html',
        controller: 'signupController',
        controllerAs: 'vm'
      })
      .when('/signin', {
        templateUrl: '/app/signin/signin.html',
        controller: 'signinController',
        controllerAs: 'vm'
      })
      .when('/user/:user/note/:note',{
        templateUrl: '/app/sharedNote/sharedNote.html',
        controller: 'sharedNoteController',
        controllerAs: 'vm'
      })
      .when('/404', {
        templateUrl: '/app/notFound/notFound.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
  }

})(window);
