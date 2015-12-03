(function userServiceJsIife(global){

  angular.module('app').service('userService', userService);

  userService.$inject = ['firebaseRef'];

  function userService(firebaseRef) {
    this.firebaseRef = firebaseRef;
  }

  userService.prototype.setEmail = function setEmail(email) {
    this.email = email;
    localStorage.setItem("email", this.email);
  }

  userService.prototype.setName = function setName(name) {
    this.name = name;
    localStorage.setItem("name", this.name);
  }

  userService.prototype.getName = function getName() {
    if(this.name) {
    }
    else if(localStorage.getItem("name")) {
      this.name = localStorage.getItem("name");
    }
    else {
      this.name = undefined;
    }
    return this.name;
  }

  userService.prototype.removeUserVals = function() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }

  userService.prototype.loadUser = function loadUser(callback) {
    var user_uid = this.firebaseRef.getAuth().uid;
    var userRef = this.firebaseRef.child('users').child(user_uid);

    userRef.on('value', function onValueCallback(snapshot){

      // On success
      callback(snapshot.val());

    }, function errorCallback(error){

      // On success
      console.debug("read failed");
      console.error(error);
      callback(null, error);
    });

  }

})(window);
