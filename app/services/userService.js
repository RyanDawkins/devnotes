(function userServiceJsIife(global){

  angular.module('app').service('userService', userService);

  function userService() {
  }

  userService.prototype.getName = function getName() {
    return Parse.User.current().get("name");
  }

  userService.prototype.getEmail = function getEmail() {
    return Parse.User.current().get("email");
  }

})(window);
