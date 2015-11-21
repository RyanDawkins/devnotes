(function routesJsIife(global){

  angular.module('app').config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/partials/index.html',
        controller: 'indexController',
        controllerAs: 'vm'
      });
  }

})(window);
