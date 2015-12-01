(function loginServiceJsIife(global){

  angular.module('app').service('loginService', loginService);

  var loginToken = "devNotesLoginToken";

  loginService.$inject = ['firebaseRef'];

  var self;

  function loginService(firebaseRef) {
    self = this;
    this.firebaseRef = firebaseRef;
  }

  loginService.prototype.isLoggedIn = function isLoggedIn() {
    return !!this.firebaseRef.getAuth();
  }

  loginService.prototype.logout = function logout() {
    this.firebaseRef.unauth();
  }

  loginService.prototype.login = function login(email, password, callback) {
    this.firebaseRef.authWithPassword({
      email: email,
      password: password
    }, function authHandler(error, authData){
      console.debug(self.firebaseRef.getAuth());
      callback(authData, error);
    });
  }

})(window);
