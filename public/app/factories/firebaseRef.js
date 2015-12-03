(function firebaseFactoryJsIife(){

  angular.module('app').factory('firebaseRef', firebaseRef);

  var ref = new Firebase("https://devnotesmd.firebaseio.com");

  function firebaseRef() {
    return ref;
  }

})();
