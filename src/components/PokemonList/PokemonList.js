export async function getPokemonList() {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150"
  ).then((res) => res.json());

  return data.results;
}

export async function getPokemonDescription(currentPokemon) {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${currentPokemon}`
  ).then((res) => res.json());
  return pokemon.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ");
}

export function getPokemonSpriteUrl(currentSprite) {
  return `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/back/${currentSprite}.png`;
}
