import "./styles.css";
import {
  getPokemonList,
  getPokemonDescription,
  getPokemonSpriteUrl
} from "./components/PokemonList";
import { useEffect, useState } from "react";

export default function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentDesc, setCurrentDesc] = useState(null);

  const handleChange = async (e) => {
    const pokemonInfo = JSON.parse(e.target.value);
    setCurrentPokemon(pokemonInfo);
    const desc = await getPokemonDescription(pokemonInfo.index);
    setCurrentDesc(desc);
  };

  useEffect(() => {
    async function getPokemon() {
      let list = await getPokemonList();
      setAllPokemon(list);
    }
    getPokemon();
  }, []);

  return (
    <section className="pokemonCard">
      <select onChange={handleChange} className="selectBox">
        {allPokemon.map((pokemon, i) => {
          return (
            <option
              value={JSON.stringify({
                name: pokemon.name,
                url: pokemon.url,
                index: i + 1
              })}
              key={pokemon.name}
            >
              {pokemon.name}
            </option>
          );
        })}
      </select>
      {currentPokemon ? (
        <div>
          <img
            src={getPokemonSpriteUrl(currentPokemon.index)}
            className="pokemonImage"
            alt=""
          />
          <h1> {currentPokemon.name}</h1>
          <p>{currentDesc}</p>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
