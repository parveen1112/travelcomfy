var model = require('../models/flight');

/**
 * Response Format
 * @param success
 * @constructor
 */
function ResponseFormat(success, data) {
    this.success = success || true;
    this.data = data || [];
};

module.exports = {
    /**
     * This function is used to get Two Way Round Trips
     * @param req
     * @param res
     */
    getRoundTrip : function(req, res){
        var params = req.params,
            result = new ResponseFormat();

        if (params) {
            params.mn = parseInt(req.query.mn);
            params.mx = parseInt(req.query.mx);
            result.data = model.get('ROUND', params);
        } else {
            result.success = false;
        }
        return res.json(result);
    },
    /**
     * This function is used to get One Way Flights
     * @param req
     * @param res
     */
    getOneWay : function(req, res) {
        var params = req.params,
            result = new ResponseFormat();
        if (params) {
            params.mn = parseInt(req.query.mn);
            params.mx = parseInt(req.query.mx);
            params.seats = parseInt(req.query.seats);
            result.data = model.get('ONE', params);

        } else {
            result.success = false;
        }
        return res.json(result);
    }
};