var data = require('../../assets/resources/data.json');

function groupFlights(tempArray, flight, towards) {

    var groupFlightArray = [], obj;

    tempArray.forEach((tempEntry) => {
       if (tempEntry.airline === flight.airline && tempEntry.towards != towards) {
           if (towards) {
               groupFlightArray.push({
                   towards : flight,
                   returns : tempEntry
               });
           } else {
               groupFlightArray.push({
                   towards : tempEntry,
                   returns : flight
               });
           }
       }
    });

    flight.towards = towards;
    tempArray.push(flight);

    return groupFlightArray;
}
/**
 * Function to get ROund Trip FLights
 * @param args
 * @returns {*}
 */
function getRoundTripFlights(args) {
    var temp = [], resultArray = [];
    if (data && data.flights){
        data.flights.forEach((flight) => {
            if (args.seats <= flight.seatsleft && args.mn <= flight.price && args.mx >= flight.price) {
                if ((args.src === flight.src && args.dest === flight.dest && args.departDate === flight.departDate)) {
                    resultArray = resultArray.concat(groupFlights(temp, flight, true));
                } else if ((args.src === flight.dest && args.dest === flight.src && args.arrivalDate === flight.departDate)) {
                    resultArray = resultArray.concat(groupFlights(temp, flight, false));

                }

            }
            return false;
        })
    }
    return resultArray;
}

/**
 * Function to get One Way FLights
 * @param args
 * @returns {*}
 */
function getOneWayTripFlights(args) {
    var resultArray = [];
    if (data && data.flights) {
        data.flights.forEach((flight) => {
            if (args.src === flight.src && args.dest === flight.dest && args.departDate === flight.departDate
                && args.seats <= flight.seatsleft && args.mn <= flight.price && args.mx >= flight.price) {
                resultArray.push({ towards : flight});
            }
        })
    }
    return resultArray;
}

module.exports = {
    /**
     * Get flights on the basis of arguments
     * @param type
     * @param args
     * @returns {*}
     */
    get : function(type, args){

        if (args) {
            args.mn = args.mn && args.mn === 0 ? args.mn : data.range.min;
            args.mx = args.mx && args.mn === 0 ? args.mx : data.range.max;
            args.seats = args.seats || 1;
        }

        switch(type) {
            case "ROUND" :
                            return getRoundTripFlights(args);
            case "ONE" :
                            return getOneWayTripFlights(args);
            default:
        }                   return data && data.flights ? data.flights : [];
    },
    /**
     * Get Data for Rendering
     * @param type
     * @returns {*}
     */
    getData: function(type){
        switch(type) {
            case "PLACE" :
                            return data && data.place ? data.place : [];
            case "RANGE" :
                            return data && data.range ? data.range : {};
            case "PASSEN" :
                            return data && data.passengers ? data.passengers : 10;
        }
        return data.place;
    }
}