/**
 * Created by inspiron on 13.01.2016.
 */
(function () {
  "use strict";

  angular.module("piHomeServices")
    .factory("configService", configService);

  function configService($localStorage, piHomeConsts){
    function getBaseAddress(){
      var serverIp = $localStorage[piHomeConsts.localStorageKeys.serverIp];
      var baseAddress = 'http://' + serverIp + ':8081';

      return baseAddress;
    }

    return {
      getBaseAddress: getBaseAddress
    }
  }
})();
