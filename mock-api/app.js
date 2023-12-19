const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors({
  origin: '*'
}))

function getData(name) {
  let dataPath = path.join(__dirname, 'data', `${name}.json`);
  return fs.readFileSync(dataPath)
}

function getResource(name) {
  let resourcePath = path.join(__dirname, 'data', 'resources', name);
  return fs.readFileSync(resourcePath)
}

app.post('/api/search', (_, res) => {
  console.log("received POST to /api/search")
  res.status(200).send(getData('search'))
})

app.get('/api/place', (req, res) => {
  console.log("received GET to /api/place")
  res.status(200).send(getData(`places/${req.query.id}`))
})

app.get('/api/place/photo', (req, res) => {
  console.log("received GET to /api/place/photo")
  res.status(200).send(getResource(req.query.reference))
})

app.use('/*', (_, res) => {
  res.status(404).send('Not found')
});

app.listen(8080)
