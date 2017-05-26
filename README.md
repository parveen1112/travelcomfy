# Travel Comfy

Application to search flights.

# Custom Framework

I have created a custom framework over #express for this application. This framework is somewhat similar to sails.

api folder contains middlewares, controllers, models, helpers.

## Middlwares contains :
    Not-found - Returining 404
    Router - Initialises the routes
    session - Session middleware
    5xx - Error handler
  
## assets folder contains the Client side and static files.
    images - All the images
    js  - Contains the JS and JS libs
    styles - Contains all the less files
    
    bower is used to install the library
    RequireJS is used for Module Loading

logs folder will contain the generated log files. I am using winston for logging <lib/logger>.

configs contains the configuration files.

configs/env contains the environment configurations.

## Grunt jobs to be define in Gruntfile.js
   dev - Normal Dev without watch task
   default - dev with watch task
   live - for production
   
"@TODO Webpack config"

# Travel Comfy System

api folder contains the routes.js which contains the routes and their controllers and middlewares. using this file, we initialize our custom router <lib/router>.

We are using ejs templating. All the views exists in views folder.

configs/bootstrap.js initializes our router.

  ## Client Side - assets folder
      js/app contains all the client side javascript files.
      client libraries are installed using bower and bundled using requirejs (AMD)
      styles contains all the less files
      resources contains the data.json (Our Data file)
  
  ## Server Side - api folder
     
     models contains our model flight.js which interacts with data.json
     Controller folder contains the controller. (IndexController and SearchController)
     routes are defined in routes.js
     helpers are defined which can be used at server side.
     middlewares are defined in this folder.


# Steps to start the application
1. `npm install`
2. `bower install`
2. `npm run servedev` - DEVELOPMENT
3. `npm run servelive` - PRODUCTION
3. `node server.js`


If you are still not able to run it or wish to contribute. Then mail me
    Parveen Arora - <a href="mailto:parveen1112@gmail.com">parveen1112@gmail.com</a>
