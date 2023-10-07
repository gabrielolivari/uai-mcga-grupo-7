var express = require('express');
var server = express();
var port = 3000;
const fs = require('fs');

server.use(express.json());

var client = require('./models/client.json');
var product = require('./models/product.json');

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
 
//CRUD for Client
server.get('/client', function(req, res) {
  res.json(client);
});

server.get('/client/:id', function(req, res) {
  var entity = client.list.find(
    function(item) {
    if (item.id === parseInt(req.params.id)){
      return true
    }
  });
  if (entity) res.json(entity);
  else res.sendStatus(404);
});

server.delete('/client/:id', (req, res) => {
  const clientId = parseInt(req.params.id);
  const entity = client.list.find(function(item) {
    if(item.id === clientId){
      return true
    }
  });

  if (!entity) {
    res.sendStatus(404);
  } else {
    client.list = client.list.filter(function(item) {
      if(item.id !== clientId) {
        return true
      }
    });

    fs.writeFileSync('./models/client.json', JSON.stringify(client, null, 2), 'utf-8');

    res.status(204).send();
  }
});

server.post('/client', (req, res) => {
  const newClient = req.body;
  newClient.id = client.list[client.list.length - 1].id + 1;
  client.list.push(newClient);

  fs.writeFileSync('./models/client.json', JSON.stringify(client, null, 2), 'utf-8');

  res.status(201).json(newClient);

});

server.put('/client/:id', (req, res) => {
  const clientId = parseInt(req.params.id);
  const updatedClient = req.body;
  const index = client.list.findIndex(function(item) {
    if(item.id === clientId){
      return true
    }
  });

  if (index === -1) {
    res.status(404).json({ error: 'Cliente no encontrado' });
  } else {
    client.list[index] = { ...client.list[index], ...updatedClient };

    fs.writeFileSync('./models/client.json', JSON.stringify(client, null, 2), 'utf-8');

    res.json(client.list[index]);
  }
});

//CRUD for Product
server.get('/product', function(req, res) {
  res.json(product);
});

server.get('/product/:id', function(req, res) {
  var entity = product.list.find(
    function(item) {
    if (item.id === parseInt(req.params.id)){
      return true
    }
  });
  if (entity) res.json(entity);
  else res.sendStatus(404);
});

server.delete('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const entity = product.list.find(function(item) {
    if(item.id === productId){
      return true
    }
  });

  if (!entity) {
    res.sendStatus(404);
  } else {
    product.list = product.list.filter(function(item) {
      if(item.id !== productId) {
        return true
      }
    });

    fs.writeFileSync('./models/product.json', JSON.stringify(product, null, 2), 'utf-8');

    res.status(204).send();
  }
});

server.post('/product', (req, res) => {
  const newProduct = req.body;
  newProduct.id = product.list[product.list.length - 1].id + 1;
  product.list.push(newProduct);

  fs.writeFileSync('./models/product.json', JSON.stringify(product, null, 2), 'utf-8');

  res.status(201).json(newProduct);

});

server.put('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = product.list.findIndex(function(item) {
    if(item.id === productId){
      return true
    }
  });

  if (index === -1) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    product.list[index] = { ...product.list[index], ...updatedProduct };

    fs.writeFileSync('./models/product.json', JSON.stringify(product, null, 2), 'utf-8');

    res.json(product.list[index]);
  }
});