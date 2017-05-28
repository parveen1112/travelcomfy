var flightModel = require('../../../api/models/flight');

describe('Flight Model Testing', function () {
    it('should check the Flight  Model Existence', function(){
        expect(flightModel).to.exist;
    });

    it('should check Flight function existence', function(){
        expect(flightModel.get).to.exist;
        expect(flightModel.getData).to.exist;
    });


    it('should check FLight methods for wrong values', function(){
        expect(flightModel.getData({})).to.be.empty;
        expect(flightModel.getData(123123123)).to.be.empty;
        expect(flightModel.getData("")).to.be.empty;

        expect(flightModel.get({})).to.be.an('array');
        expect(flightModel.get(123123123)).to.be.an('array');
        expect(flightModel.get("")).to.be.an('array');
        expect(flightModel.get('ONE', '')).to.be.an('array');
        expect(flightModel.get('ROUND', {})).to.be.an('array');
    });

    it('should check Flight methods for right values', function(){
        expect(flightModel.getData('PLACE')).to.be.an('array');
        expect(flightModel.getData('RANGE')).to.have.all.keys('min', 'max');
        expect(flightModel.getData('PASSEN')).to.be.an('array');
        expect(flightModel.get('ONE', {src:'DEL', dest: 'PUN', departDate: '20160628'})).to.be.an('array');
        expect(flightModel.get('ROUND',  {src:'DEL', dest: 'PUN', departDate: '20160628', arrivalDate: '20160630'})).to.be.an('array');
    });

});