const fs = require('fs').promises;

const getJsonFromFile = (filePath) => fs
  .readFile(filePath, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .catch((err) => err);

module.exports = getJsonFromFile;
