'use strict';
require('babel/register');
let mongoose = require('mongoose');
let config = require('./config');
let app = require('./app');

console.log('Connecting to database...');

mongoose.connect(config.mongo.connString, (err)  => {
  if (err) {
    console.log('ERROR: ' + err);
  }
  else {
    console.log('SUCCESS');
  }
});

mongoose.connection.once('open', () => {
  //start koa app
  app.start();
});



