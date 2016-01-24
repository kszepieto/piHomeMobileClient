/**
 * Created by inspiron on 01.01.2016.
 */
(function () {
  "use strict";

  angular.module('piHome')
    .controller('CircuitsController',
      ["$scope", "circuitsService", CircuitsListViewCtrl]);

  function CircuitsListViewCtrl($scope, circuitsResourceService) {

    $scope.refresh = function(){
      circuitsResourceService.getCircuitsRequest()
        .then(function (response) {
          $scope.CircuitStates = response.data
        }, function(response){
          console.log('Error occured');
          console.log(JSON.stringify(response));
        })
        .finally(function(){
          $scope.$broadcast('scroll.refreshComplete');
        })
    }

    $scope.changeCircuitState = function (circuit) {
      var payload = {
        circuit: circuit.Circuit,
        state: !circuit.State
      };
      circuitsResourceService.setCircuitRequest(payload);
    }

    $scope.$on('$destroy', function () {
      circuitsResourceService.stopListeningNotifications()
    });

    $scope.refresh();

    circuitsResourceService.startListeningNotification(function (data) {
      if ($scope.CircuitStates) {
        var circuitObject = _.find($scope.CircuitStates, function (circuit) {
          return circuit.Circuit === data.Circuit;
        });

        if (circuitObject) {
          circuitObject.State = data.State;
          $scope.$digest();
        }
      }
    });
  }
}());
