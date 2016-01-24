/**
 * Created by inspiron on 1/17/2016.
 */
describe('settingsController', function(){

  var $controller,
    $rootScope,
    $localStorage,
    $ionicPopup,
    piHomeConsts,
    $q,
    $scope;

  beforeEach(module('piHome'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$localStorage_, _$ionicPopup_, _$q_, _piHomeConsts_){
    $controller = _$controller_;
    $rootScope =_$rootScope_;
    $localStorage = _$localStorage_;
    $ionicPopup = _$ionicPopup_;
    piHomeConsts = _piHomeConsts_;
    $q = _$q_;
  }));

  beforeEach(function(){
    $localStorage[piHomeConsts.localStorageKeys.serverIp] = '';
    $localStorage[piHomeConsts.localStorageKeys.favouriteTab] = '';
  })

  it('should load settings from configService', function(){
    var server = 'asdvf';
    var favoriteTab = 'efwrtyu';

    $localStorage[piHomeConsts.localStorageKeys.serverIp] = server;
    $localStorage[piHomeConsts.localStorageKeys.favouriteTab] = favoriteTab;

    $scope = $rootScope.$new();
    $controller('SettingsController', { $scope: $scope });

    expect($scope.settings.serverAddress).toBe(server);
    expect($scope.settings.favoriteTab).toBe(favoriteTab);
  });

 it('should ask for confirmation when save', function(){
    var deffered = $q.defer();

    spyOn($ionicPopup, 'confirm').and.returnValue(deffered.promise);

    $scope = $rootScope.$new();
    $controller('SettingsController', { $scope: $scope });
    $scope.save();

    expect($ionicPopup.confirm).toHaveBeenCalled();
  });

  it('should save data when save confirmed', function(){
    var deffered = $q.defer();
    var server = 'serveraddressss';
    var favoriteTab = 'tabsssss';

    spyOn($ionicPopup, 'confirm').and.returnValue(deffered.promise);

    $scope = $rootScope.$new();

    $controller('SettingsController', { $scope: $scope });
    $scope.settings = {};
    $scope.settings.serverAddress = server;
    $scope.settings.favoriteTab = favoriteTab;

    $scope.save();

    deffered.resolve(true);
    $rootScope.$apply();

    expect($localStorage[piHomeConsts.localStorageKeys.serverIp]).toBe(server);
    expect($localStorage[piHomeConsts.localStorageKeys.favouriteTab]).toBe(favoriteTab);
  });

  it('should NOT save data when save NOT confirmed', function(){
    var deffered = $q.defer();
    var server = 'serveraddressss';
    var favoriteTab = 'tabsssss';

    spyOn($ionicPopup, 'confirm').and.returnValue(deffered.promise);

    $scope = {};

    $controller('SettingsController', { $scope: $scope });
    $scope.settings = {};
    $scope.settings.serverAddress = server;
    $scope.settings.favoriteTab = favoriteTab;

    $scope.save();

    deffered.resolve(false);
    $rootScope.$apply();

    expect($localStorage[piHomeConsts.localStorageKeys.serverIp]).not.toBe(server);
    expect($localStorage[piHomeConsts.localStorageKeys.favouriteTab]).not.toBe(favoriteTab);
  });
})
