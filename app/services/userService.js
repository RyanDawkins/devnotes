(function userServiceJsIife(global){

  angular.module('app').service('userService', userService);

  userService.$inject = ['firebaseRef'];

  function userService(firebaseRef) {
    this.firebaseRef = firebaseRef;
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

})(window);
