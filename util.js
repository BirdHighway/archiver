const fs = require('fs');
const path = require('path');

const ERROR_LOG = path.join(process.cwd(), 'error.log');

const logger = fs.createWriteStream(ERROR_LOG, {flags: 'a'});

const prettyJSON = (json) => {
  return JSON.stringify(json, null, 2);
};

const saveToFile = (fileName, data) => {
  const filePath = path.join(process.cwd(), 'files', fileName);
  const fileText = prettyJSON(data);
  return fs.promises.writeFile(filePath, fileText);
};

const logError = (error) => {
  const dateString = (new Date()).toISOString();
  const { message, name } = error;
  logger.write(`${dateString}; ${name}: ${message}`);
};

const uniqueFileName = (counter) => {
  const paddedCounter = counter.toString().padStart(5, '0');
  const dateString = (new Date()).toISOString().split('.')[0].replace('T', '_').replace(/:/g, '-');
  return `${paddedCounter}_${dateString}.json`;
}

module.exports = {
  prettyJSON,
  saveToFile,
  logError,
  uniqueFileName
}