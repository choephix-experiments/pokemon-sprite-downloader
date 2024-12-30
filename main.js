const all = require('./all.json');
const fs = require('fs');
const path = require('path');

const downloadDir = './downloads/pokemon-official-artwork';

// Ensure the download directory exists
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

async function main() {
  for (const pokemon of all.results) {
    const res = await fetch(pokemon.url);
    const json = await res.json();
    const imageUrl = json.sprites.other['official-artwork'].front_default;
    const id = json.id;

    if (imageUrl) {
      const imageRes = await fetch(imageUrl);
      const arrayBuffer = await imageRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // const fileName = path.join(downloadDir, `${pokemon.name}.png`);
      const fileName = path.join(downloadDir, `${id}.png`);
      fs.writeFileSync(fileName, buffer);
      console.log(`Downloaded ${pokemon.name} to ${fileName}`);
    }
  }
}

main();
