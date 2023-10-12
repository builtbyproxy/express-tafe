const express = require('express');
const bodyParser = require('body-parser');
const { development } = require('./knexfile');

const knex = require('knex')(development);

const app = express();
app.use(bodyParser.json());

// Create a new shopping list
app.post('/list', async (req, res) => {
  const { name } = req.body;
  const shoppingList = await knex('lists').insert({ name }).returning('*');
  console.log("Found: ", shoppingList)
  res.json(shoppingList[0]);
});

// Get all shopping lists
app.get('/list', async (req, res) => {
  const shoppingLists = await knex('lists').select('*');
  res.json(shoppingLists);
});

// Get a specific shopping list
app.get('/list/:id', async (req, res) => {
  const { id } = req.params;
  const shoppingList = await knex('lists').where({ id }).first();
  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }
  res.json(shoppingList);
});

// Update a shopping list
app.put('/list/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log("Found: ", id, name)
  const shoppingList = await knex('lists').where({ id }).update({ name }).returning('*');
  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }
  res.json(shoppingList[0]);
});

// Delete a shopping list
app.delete('/list/:id', async (req, res) => {
  const { id } = req.params;
  const shoppingList = await knex('lists').where({ id }).del().returning('*');
  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }
  res.json(shoppingList[0]);
});

// Add an item to a shopping list
app.post('/list/:id/item', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const item = await knex('items').insert({ name, quantity, listId: id }).returning('*');
  res.json(item[0]);
});

// Get all items in a shopping list
app.get('/list/:id/item', async (req, res) => {
  const { id } = req.params;
  const items = await knex('items').where({ listId: id }).select('*');
  res.json(items);
});

// Get a specific item in a shopping list
app.get('/list/:id/item/:itemId', async (req, res) => {
  const { id, itemId } = req.params;
  const item = await knex('items').where({ id: itemId, listId: id }).first();
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// Update an item in a shopping list
app.put('/list/:id/item/:itemId', async (req, res) => {
  const { id, itemId } = req.params;
  const { name, quantity } = req.body;
  const item = await knex('items').where({ id: itemId, listId: id }).update({ name, quantity }).returning('*');
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item[0]);
});

// Delete an item from a shopping list
app.delete('/list/:id/item/:itemId', async (req, res) => {
  const { id, itemId } = req.params;
  const item = await knex('items').where({ id: itemId, listId: id }).del().returning('*');
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item[0]);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
