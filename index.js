var express = require("express");
var bodyParser = require ("body-parser");
var lowdb = require("lowdb");
var uuid = require ("uuid");
var server = express();
var port = process.env.PORT || 8080;
var db = lowdb("db.json");
var card = require ('./models/card.js');

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

server.get('/cards/name', function (req, res)
{
  var card = db.get('cards')
            .find({name: req.params.name})
            .value();
res.send(todo);
});
server.post('/cards', function(req, res)
{
  var card = new Card(req.body.name);
  var result = db.get('cards')
                  .push(card)
                  .last()
                  .value();
res.send(result);
});

server.put('/cards/name', function(req, res)
{
  var card = new Card (req.body.name, req.body.name);
  var updatedInfo = db.get('cards')
                      .find({name: req.params.name})
                      .assign(updatedCardInfo)
                      .value();
  res.send(updatedInfo);
});

server.delete('/cards/name', function(req, res)
{
  var card = db.get('cards')
              .remove({name: req.params.name})
              .value()
  res.send(card);
})

server.listen(port, function()
{
  console.log("Now listening on port " + port);
});
