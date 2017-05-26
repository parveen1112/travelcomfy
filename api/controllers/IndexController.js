var model = require('../models/flight');

module.exports = {
    get : function(req, res){
        var places = model.getData('PLACE'),
            range = model.getData('RANGE'),
            passengers = model.getData('PASSEN'),
            flights = model.get();

        res.render('index.ejs', {
            places : places,
            range : range,
            passengers : passengers,
            flights : flights
        });
    }
};