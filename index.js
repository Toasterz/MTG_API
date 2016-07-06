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

server.get('/cards/id', function (req, res)
{
  var todo = db.get('cards')
            .find({id: req.params.id})
            .value();
res.send(todo);
});

server.post('/cards', function(req, res)
{
  var card = {
    id: uuid.v4(),
    name: req.body.name,
    CMC: req.body.cmc,
    price: req.body.price,
  };
  var result = db.get('cards')
                  .push(card)
                  .last()
                  .value();
res.send(result);
});

server.put('/cards/id', function(req, res)
{
  var updatedCardInfo = {
    name: req.body.name,
    CMC: req.body.CMC,
    price: req.body.price,
  };
  var updatedInfo = db.get('cards')
                      .find({id: req.params.id})
                      .assign(updatedCardInfo)
                      .value();
  res.send(updatedInfo);
});

server.delete('/cards/id', function(req, res)
{
  var card = db.get('cards')
              .remove({id: req.params.id})
              .value()
  res.send(card);
})

server.listen(port, function()
{
  console.log("Now listening on port " + port);
});
