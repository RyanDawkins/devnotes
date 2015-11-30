(function signupFactoryJsIife(global){

  angular.module('app').factory('signupFactory', signupFactory);

  function signupFactory() {

    var factory = {
      signup: signup
    };

    return factory;
  }

  function signup(name, email, password, callback) {
    var user = new Parse.User();
    user.set("name", name);
    user.set("username", email);
    user.set("email", email);
    user.set("password", password);

    user.signUp(null, {
      success: function(user) {
        callback(user);
      },
      error: function(user, error) {
        callback(user, error);
      }
    });
  }

})(window);
