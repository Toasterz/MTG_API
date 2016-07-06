var express = require("express");
var bodyParser = require ("body-parser");
var lowdb = require("lowdb");
var uuid = require ("uuid");

var server = express();
var port = process.env.PORT || 8080;
var db = lowdb("db.json");

//Initialize the database
db.defaults({cards: []})
  .value();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));


server.get('/cards', function(req, res)
{
  var result = db.get('cards')
                .value();
  res.send(result);
});

server.listen(port, function()
{
  console.log("Now listening on port " + port);
});
