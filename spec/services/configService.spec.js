/**
 * Created by inspiron on 1/17/2016.
 */
describe('configService', function(){
  var $localStorage;
  var piHomeConsts;
  var configService;

  beforeEach(module('piHomeServices'))
  beforeEach(module('ngStorage'))

  beforeEach(inject(function(_$localStorage_, _piHomeConsts_, _configService_){
    $localStorage = _$localStorage_;
    piHomeConsts = _piHomeConsts_;
    configService = _configService_;
  }));

  it('should return server address', function(){
    $localStorage[piHomeConsts.localStorageKeys.serverIp] = 'localhost'

    var current = configService.getBaseAddress();
    expect(current).toBe('http://localhost:8081');
  })
})
