(function loginServiceJsIife(global){

  angular.module('app').service('loginService', loginService);

  var loginToken = "devNotesLoginToken";

  loginService.$inject = [];

  function loginService() {
  }

  loginService.prototype.isLoggedIn = function isLoggedIn() {
    return localStorage.getItem(loginToken);
  }

})(window);
