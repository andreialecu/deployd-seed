"use strict";
require("dotenv").load();

// require deployd
var deployd = require('deployd');

var port = (process.env.PORT || 9000);

// configure database etc.
var server = deployd({
  port: port,
  env: process.env.ENV || 'development',
  db: {
    connectionString: process.env.MONGO_URI || 'mongodb://localhost:27017/mydeploydapp'
  }
});

// start the server
server.listen();

// debug
server.on('listening', function () {
  console.log("Server is listening on port: " + port);
  if (process.send) {
    process.send({
      listening: {
        port: port
      }
    });
  }

});

// Deployd requires this
server.on('error', function (err) {
  console.error(err);
  process.nextTick(function () { // Give the server a chance to return an error
    process.exit();
  });
});