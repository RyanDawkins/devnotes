(function userLookupServiceJsIife(global){

  angular.module('app').service('userLookupService', userLookupService);

  userLookupService.$inject = ['firebaseRef'];

  function userLookupService(firebaseRef) {
    this.firebaseRef = firebaseRef;
  }

  userLookupService.prototype.byEmail = function (email, callback) {
    var userRef = this.firebaseRef.child('users')
      .orderByChild('email')
      .startAt(email)
      .endAt(email)
      .once('value', function successCallback(snapshot){
        callback(snapshot.val());
      }, function errorCallback(error){
        console.error(error);
        callback(null, error);
      });
  };

})(window);
