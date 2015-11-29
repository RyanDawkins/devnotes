(function appRunJsIife(global){

  angular.module('app').run(runInitializeParse);

  function runInitializeParse() {
    Parse.initialize("cwORfy98eqR2tK8J9witLeryH7EBsxrvBBWXqel5", "g9E1qbGEfsj58UpAIlFE8G9x0kUuBMpTzZzrNazQ");
  }

})(window);
