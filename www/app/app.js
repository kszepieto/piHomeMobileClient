// Ionic Starter App

(function () {
  "use strict";

  angular.module('piHomeServices', ['ngStorage'])
    .constant('piHomeConsts', {
      localStorageKeys: {
        serverIp: 'serverIp',
        favouriteTab: 'favouriteTab'
      }
    });

  angular.module('piHome', ['ngStorage', 'piHomeServices', 'ionic'])

  angular.module('piHomeMain', ['ngStorage', 'piHome'])
    .config(function ($ionicConfigProvider, $localStorageProvider, piHomeConsts) {
      $ionicConfigProvider.scrolling.jsScrolling(true);

      $localStorageProvider.setKeyPrefix('piHome');

      if (!$localStorageProvider.get(piHomeConsts.localStorageKeys.serverIp)) {
        $localStorageProvider.set(piHomeConsts.localStorageKeys.serverIp, 'localhost');
      }

      if (!$localStorageProvider.get(piHomeConsts.localStorageKeys.favouriteTab)) {
        $localStorageProvider.set(piHomeConsts.localStorageKeys.favouriteTab, 'circuits');
      }
    })

    .config(function ($stateProvider, $urlRouterProvider, $localStorageProvider, piHomeConsts) {
      $stateProvider
        .state('lights', {
          url: '/lights',
          abstract: true,
          templateUrl: 'app/lights/tabsView.html'
        })
        .state('lights.circuits', {
          url: '/circuits',
          views: {
            'circuits-tab': {
              templateUrl: 'app/lights/circuitsView.html',
              controller: 'CircuitsController',
            }
          }
        })
        .state('lights.predefinedSets', {
          url: '/predefinedSets',
          views: {
            'predefinedSets-tab': {
              templateUrl: 'app/lights/predefinedSetsView.html',
              controller: 'PredefinedSetsController',
            }
          }
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'app/settings/settingsView.html',
          controller: 'SettingsController',
        });

      var otherwiseState = '/lights/' + $localStorageProvider.get(piHomeConsts.localStorageKeys.favouriteTab);
      $urlRouterProvider.otherwise(otherwiseState);
    })

    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    });
}());
