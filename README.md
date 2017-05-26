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
    js Contains the JS and JS libs
    bower is used to install the library
    RequireJS is used for Module Loading

logs folder will contain the generated log files. I am using winston for logging <lib/logger>.

configs contains the configuration files.

configs/env contains the environment configurations.

Grunt jobs to be define in Gruntfile.js

"@TODO Webpack config"

# Travel Comfy System

api folder contains the routes.js which contains the routes and their controllers and middlewares. using this file, we initialize our custom router <lib/router>.

We are using ejs templating. All the views exists in views folder.

configs/bootstrap.js initializes our router.

Mantaining Sessions in Memory Store


# Steps to start the application
1. npm install
2. grunt
3. node server.js

# How to use


If you are still not able to run it or wish to contribute. Then mail me
    Parveen Arora - <a href="mailto:parveen1112@gmail.com">parveen1112@gmail.com</a>