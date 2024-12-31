const fs = require('fs');
const path = require('path');

const limit = 10000;
const offset = 0;

const downloadDirBase = './downloads';
const downloadDir = downloadDirBase + '/pokemon-official-artwork';
const concurrency = 12;

const shouldSaveAllResultsInOneBigJSON = false;

// Ensure the download directory exists
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

const pokemonJsons = [];

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

  if (shouldSaveAllResultsInOneBigJSON) {
    pokemonJsons.push(json);
  }
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
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const all = await res.json();
  const queue = [...all.results];
  const workers = Array(concurrency)
    .fill(null)
    .map(() => worker(queue));
  await Promise.all(workers);

  if (shouldSaveAllResultsInOneBigJSON) {
    const jsonFilePath = path.join(downloadDirBase, 'rip.json');
    fs.writeFileSync(jsonFilePath, JSON.stringify(pokemonJsons, null, 2));
    console.log(`Saved JSON to ${jsonFilePath}`);
  }
};

main();
