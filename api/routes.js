/**
 * One needs to define all the routes here.
 * One can also define the policies here.
 * Example:
 *     {
 *        route : <route>,
 *        method : <Request Method>,
 *        controller : <Controller Method>
 *        policies: <[Array of policy]>
 *     } ,
 *
 */

var controllers = require('./controllers');

module.exports = [
    {
        method : 'get',
        route: '/',
        controller : controllers.IndexController.get
    },
    {
        method : 'get',
        route : '/search/:src/:dest/:departDate/',
        controller : controllers.SearchController.getOneWay
    },
    {
        method : 'get',
        route : '/search/:src/:dest/:departDate/:arrivalDate',
        controller : controllers.SearchController.getRoundTrip
    }
]