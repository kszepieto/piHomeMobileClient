/**
 * Created by inspiron on 02.01.2016.
 */
(function () {
  "use strict";

  angular.module("piHomeServices")
    .factory("circuitsService", [ "$http", "configService", circuitsService])

  function circuitsService($http, configService) {
    console.log('circuitsService service created');

    var getCircuitsRequest = function () {
      var baseAddress = configService.getBaseAddress();
      return $http.get(baseAddress + '/piHost/ControlCircuits/GetCircuitStates')
    };

    var setCircuitRequest = function (data) {
      var baseAddress = configService.getBaseAddress();

      $http.post(baseAddress + '/piHost/ControlCircuits/Switch', data);
    }

    var startListeningNotification = function (onCircuitStateChangedCallback) {
      var connection = $.hubConnection();

      var baseAddress = configService.getBaseAddress();
      connection.url = baseAddress + "/signalr";

      var piHomeHubProxy = connection.createHubProxy('PiHomeHub');
      piHomeHubProxy.on('CircuitStateChanged', function (changeData) {
        onCircuitStateChangedCallback(changeData);
      });

      return connection.start();
    }

    var stopListeningNotifications = function () {
      var connection = $.hubConnection();

      if (connection) {
        connection.stop();
      }
    }

    return {
      getCircuitsRequest: getCircuitsRequest,
      setCircuitRequest: setCircuitRequest,
      startListeningNotification: startListeningNotification,
      stopListeningNotifications: stopListeningNotifications
    };
  };
}());
