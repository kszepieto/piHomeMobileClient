/**
 * Created by inspiron on 1/17/2016.
 */
describe('circuitService', function () {

  var circuitsService;
  var configService;
  var $httpBackend;

  beforeEach(module('piHomeServices'))

  beforeEach(inject(function (_circuitsService_, _configService_, _$httpBackend_) {
    circuitsService = _circuitsService_;
    configService = _configService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  beforeEach(function(){
    spyOn(configService, 'getBaseAddress').and.returnValue('');
  })

  it('getCircuitsRequest should return circuits information on success', function () {
    var circuitsData = JSON.parse('[{"Circuit":"C1","State":false,"Name":"Circuit 1"},{"Circuit":"C10","State":true,"Name":"Circuit 10"},{"Circuit":"C2","State":true,"Name":"Circuit 2"},{"Circuit":"C3","State":false,"Name":"Circuit 3"},{"Circuit":"C4","State":false,"Name":"Circuit 4"},{"Circuit":"C5","State":false,"Name":"Circuit 5"},{"Circuit":"C6","State":true,"Name":"Circuit 6"},{"Circuit":"C7","State":false,"Name":"Circuit 7"},{"Circuit":"C8","State":false,"Name":"Circuit 8"},{"Circuit":"C9","State":false,"Name":"Circuit 9"}]')

    $httpBackend.when('GET', '/piHost/ControlCircuits/GetCircuitStates')
      .respond(200, circuitsData);

    var currentCircuitsData;
    circuitsService.getCircuitsRequest()
      .then(function(response){
        currentCircuitsData = response.data;
      });

    $httpBackend.flush()
    expect(currentCircuitsData).toEqual(circuitsData);
  });

  it('getCircuitsRequest should return error reason when fail', function(){
    var failReason = 'failed !!!'

    $httpBackend.when('GET', '/piHost/ControlCircuits/GetCircuitStates')
      .respond(500, failReason);

    var currentCircuitsData;
    circuitsService.getCircuitsRequest()
      .then(function(response){
        currentCircuitsData = response.data;
      })
      .catch(function(response){
        currentCircuitsData = response.data;
      })

    $httpBackend.flush()
    expect(currentCircuitsData).toEqual(failReason);
  })

  it('setCircuitRequest should call ControlCircuits/Switch api', function(){
    var payload = '{"circuit":"C1","state":false}';

    $httpBackend.expect('POST', '/piHost/ControlCircuits/Switch', payload)
      .respond(200)

    circuitsService.setCircuitRequest(payload);

    expect($httpBackend.flush).not.toThrow();
  })
})
