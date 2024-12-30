const all = require('./all.json');

async function main() {
  for (const pokemon of all.results) {
    // console.log(pokemon.url);
    const res = await fetch(pokemon.url);
    const json = await res.json();
    console.log(json.sprites.other['official-artwork'].front_default);
  }
}

main();
