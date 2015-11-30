(function loginServiceJsIife(global){

  angular.module('app').service('loginService', loginService);

  var loginToken = "devNotesLoginToken";

  loginService.$inject = [];

  function loginService() {
  }

  loginService.prototype.isLoggedIn = function isLoggedIn() {
    return !!Parse.User.current();
  }

  loginService.prototype.logout = function logout() {
    Parse.User.logOut();
  }

  loginService.prototype.login = function login(email, password, callback) {
    Parse.User.logIn(email, password, {
      success: function successCallback(user) {
        callback(user);
      },
      error: function errorCallback(user, error) {
        callback(user, error);
      }
    });
  }

})(window);
