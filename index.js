var express = require('express');
var server = express();
var port = 3000;

// var client = require('./client.json');
// var product = require('./product.json');

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
  