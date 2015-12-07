(function signupFactoryJsIife(global){

  angular.module('app').factory('signupFactory', signupFactory);

  signupFactory.$inject = ['firebaseRef', 'userService', 'loginService'];

  function signupFactory(firebaseRef, userService, loginService) {

    var factory = {
      signup: signup
    };

    return factory;

    function signup(name, email, password, callback) {

      // This signs up using the built in firebase auth, and then stores data
      // about a user in the global object
      // It expects a method that has a callback as the final param

      userService.setName(name);

      firebaseRef.createUser({
        email: email,
        password: password
      }, function signupUserCallback(error, userData){

        if(error) {
          callback(null, error);
          return;
        }

        loginService.login(email, password, function loggedUserIn(authData, error){
            firebaseRef.child('users').child(userData.uid).set({
              provider: authData.provider,
              name: name,
              email: email
            })
            callback(authData, error);
        });
      });
    }
  }

})(window);
