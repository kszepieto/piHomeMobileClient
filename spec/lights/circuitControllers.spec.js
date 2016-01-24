/**
 * Created by inspiron on 1/17/2016.
 */
describe('circuitController', function(){
  var $controller,
    $rootScope,
    $localStorage,
    $ionicPopup,
    piHomeConsts,
    circuitsService;

  beforeEach(module('piHome'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$localStorage_, _$ionicPopup_, _circuitsService_){
    $controller = _$controller_;
    $rootScope =_$rootScope_;
    $localStorage = _$localStorage_;
    $ionicPopup = _$ionicPopup_;
    circuitsService = _circuitsService_;
  }));

  //it('should populate CircuitStates', function(){
  //  spyOn(circuitsService, 'getCircuitsRequest').and
  //})
})
