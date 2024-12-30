const all = require('./all.json');
const fs = require('fs');
const path = require('path');

const downloadDir = './downloads/pokemon-official-artwork';
const concurrency = 6;

// Ensure the download directory exists
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

const pokemonJsons = []

const downloadImage = async pokemon => {
  const res = await fetch(pokemon.url);
  const json = await res.json();
  const imageUrl = json.sprites.other['official-artwork'].front_default;
  const id = json.id;

  if (imageUrl) {
    const imageRes = await fetch(imageUrl);
    const arrayBuffer = await imageRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = path.join(downloadDir, `${id}.png`);
    fs.writeFileSync(fileName, buffer);
    console.log(`Downloaded ${pokemon.name} to ${fileName}`);
  }

  pokemonJsons.push(json);
};

const worker = async queue => {
  while (queue.length > 0) {
    const pokemon = queue.pop();
    if (pokemon) {
      await downloadImage(pokemon);
    }
  }
};

const main = async () => {
  const queue = [...all.results];
  const workers = Array(concurrency)
    .fill(null)
    .map(() => worker(queue));
  await Promise.all(workers);

  const jsonFilePath = path.join(downloadDir, 'rip.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(pokemonJsons, null, 2));
  console.log(`Saved JSON to ${jsonFilePath}`);
};

main();
