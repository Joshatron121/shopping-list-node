var express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var Storage = {
  add: function(name, user) {
    var item = {name: name, owner: user, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  },
  delete: function(requestId){
    var status = 0;
    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].id == requestId){
        this.items.splice(i, 1);
        status = 200;
      }
    }
    if(status == 0){
      status = 404;
    }
    return status
  },
  put: function(requestId, requestName){
    var status = 0
    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].id == requestId) {
        this.items[i].name = requestName;
        status = 200;
      } 
    }
    if(status == 0) {
      this.items.push({name: requestName, id: requestId})
      status = 200;
    }
    return status
  },
  user: function(requestedUser){
    var usersItems = []
    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].owner == requestedUser) {
        usersItems.push(this.items[i])
      }
    }
    console.log(usersItems)
    return usersItems;
  }
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans', 'Joe');
storage.add('Tomatoes', 'Frank');
storage.add('Peppers', 'Sarah');
storage.add('Bananas', 'Joe');
storage.add('Tacos', 'John');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
  response.json(storage.items);
});

app.get('/users/:username', function(request, response){
  requestedUser = request.params.username
  console.log(requestedUser)
  var items = storage.user(requestedUser)
  console.log(items)
  if(items == []) {
    response.sendStatus(400);
  } else {
    response.json(items);
  }
})

app.post('/items', jsonParser, function(request, response){
  if (!('name' in request.body)){
    return response.sendStatus(400)
  }

  var item = storage.add(request.body.name);
  response.status(201).json(item);
});

app.delete('/items/:id', function(request, response){
  var requestId = request.params.id;
  var status = storage.delete(requestId);
  response.sendStatus(status)
});

app.put('/items/:id', jsonParser, function(request, response){
  var requestId = request.params.id;
  var requestName = request.body.name
  if(('id' in request.body) == requestId) {
    storage.put(requestId, requestName);
    return response.sendStatus(200)
  } else {
    return response.sendStatus(400)
  }
})

app.listen(8000);