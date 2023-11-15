const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors({
  origin: 'http://localhost:19006'
}))

function getData(name) {
  let dataPath = path.join(__dirname, 'data', `${name}.json`);
  return fs.readFileSync(dataPath)
}

function getResource(name) {
  let resourcePath = path.join(__dirname, 'data', 'resources', name);
  return fs.readFileSync(resourcePath)
}

app.get('/api/search', (_, res) => {
  res.status(200).send(getData('search'))
})

app.get('/api/photos/:reference', (req, res) => {
  res.status(200).send(getResource(req.params.reference))
})

app.use('/*', (_, res) => {
  res.status(404).send('Not found')
});

app.listen(8080)
