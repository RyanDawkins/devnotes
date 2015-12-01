(function signupFactoryJsIife(global){

  angular.module('app').factory('signupFactory', signupFactory);

  signupFactory.$inject = ['firebaseRef', 'userService', 'loginService'];

  function signupFactory(firebaseRef, userService, loginService) {

    var factory = {
      signup: signup
    };

    return factory;

    function signup(name, email, password, callback) {

      userService.setName(name);

      firebaseRef.createUser({
        email: email,
        password: password
      }, function signupUserCallback(error, userData){

        if(error) {
          console.error(error);
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
