/**
 * Created by inspiron on 01.01.2016.
 */
(function () {
  "use strict";

  angular.module('piHome')
    .controller('SettingsController', function ($scope, $localStorage, $ionicPopup, piHomeConsts) {
      $scope.settings = {};

      $scope.save = function () {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Do you want to save',
          template: 'Do you want to save'
        });

        confirmPopup.then(function (res) {
          if (res) {
            $localStorage[piHomeConsts.localStorageKeys.serverIp] = $scope.settings.serverAddress;
            $localStorage[piHomeConsts.localStorageKeys.favouriteTab] = $scope.settings.favoriteTab;
          }
        });
      };

      $scope.cancel = function () {
        var confirmPopup = $ionicPopup.confirm({
          //title: 'Do you want to cancel',
          template: 'Do you want to save'
        });

        confirmPopup.then(function (res) {
          if (res) {
            loadCurrentSettings();
          }
        });
      }

      function loadCurrentSettings() {
        $scope.settings.serverAddress = $localStorage[piHomeConsts.localStorageKeys.serverIp];
        $scope.settings.favoriteTab = $localStorage[piHomeConsts.localStorageKeys.favouriteTab];
      }

      loadCurrentSettings();
    });
}());
