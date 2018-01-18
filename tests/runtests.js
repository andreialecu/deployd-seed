'use strict';

process.chdir(__dirname);

var fork = require('child_process').fork;
var karma = require('node-karma-wrapper');
var aKarmaTestServer = karma({ configFile : './karma.conf.js' });

function startKarma() {
  aKarmaTestServer.start();
}
function runKarma() {
  aKarmaTestServer.run();
}

function run() {
  var app = fork("app.js", [], { cwd: "../", env: { MONGO_URI: 'mongodb://localhost:27017/mydeploydappTests', PORT: 9011 }});

  app.on('message', function(m){
    if (m && m.listening) {
      console.log("Starting karma");
      startKarma();
      runKarma();
    }
  });
}

run();
