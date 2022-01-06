const express = require('express');
const morgan = require('morgan');
const app = express();
const { saveToFile, logError, uniqueFileName } = require('./util');

let counter = 0;

app.use(morgan('dev'));

app.use(express.json());
app.use((err, req, res, next) => {
  if (err) {
    logError(err);
  }
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

app.post('/webhooks', async (req, res) => {
  const body = req.body;
  const fileName = uniqueFileName(counter++);
  try {
    await saveToFile(fileName, body);
    return res.json({
      status: 'success',
      fileName: fileName
    });
  } catch (error) {
    logError(error);
    res.json(error);
  }
});

module.exports = app;