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
      });
  }

})(window);
