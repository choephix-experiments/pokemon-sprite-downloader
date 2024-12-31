const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'downloads', 'rip.json');
const outputFilePath = path.join(__dirname, 'downloads', 'simple.json');

const simplifyData = data => {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    sprite: item.sprites.front_default,
    art: item.sprites.other['official-artwork'].front_default,
  }));
};

const loadData = filePath => {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

const saveData = (filePath, data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData);
};

const main = () => {
  const data = loadData(inputFilePath);
  const simplifiedData = simplifyData(data);
  saveData(outputFilePath, simplifiedData);
};

main();
