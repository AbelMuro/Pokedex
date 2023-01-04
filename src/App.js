import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  getPokemonList,
  getPokemonDescription,
  getPokemonSpriteUrl
} from "./components/ApiCalls";



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

  
  const nextPokemon = async () => {
    let currentIndex = currentPokemon.index - 1;                              //we subtract 1 because the indices of <select> start at 0
    if(currentIndex < 149){
      let selectPokemon = document.querySelector(".selectBox");
      selectPokemon.selectedIndex = currentIndex + 1;                             //we get the next index
      let nextPokemon = JSON.parse(selectPokemon.value);
      setCurrentPokemon({name: nextPokemon.name, index: currentIndex + 2});  //we add 2 to remove the 1 that we subtracted before because the API we use starts at 1 
      let desc = await getPokemonDescription(currentIndex + 2)
      setCurrentDesc(desc);
    }
    else 
      return;
  
  }

  const previousPokemon = async () => {
    let currentIndex = currentPokemon.index - 1;
    if(currentIndex > 0){
      let selectPokemon = document.querySelector(".selectBox");
      selectPokemon.selectedIndex = currentIndex - 1;                        //we get the previous index
      let nextPokemon = JSON.parse(selectPokemon.value);
      setCurrentPokemon({name: nextPokemon.name, index: currentIndex});    //we add 2 to remove the 1 that we subtracted before because the API we use starts at 1 
      let desc = await getPokemonDescription(currentIndex)
      setCurrentDesc(desc);    
    }
    else 
      return;
  }


  useEffect(() => {
    async function getPokemon() {
      const list = await getPokemonList();
      setAllPokemon(list);
      setCurrentPokemon({name: "bulbasaur", index: 1});
      const desc = await getPokemonDescription(1);
      setCurrentDesc(desc);
    }
    getPokemon();
  }, []);


  return (
    <main className="background">
      <section className="pokemonCard">
            <select onChange={handleChange} className="selectBox">
              {allPokemon.map((pokemon, i) => {
                return (
                  <option
                    value={JSON.stringify({
                      name: pokemon.name,
                      index: i + 1
                    })}
                    key={pokemon.name}>
                    {pokemon.name}
                  </option>
                );
              })}
            </select>
            {currentPokemon ? (
              <div className="pokemonContainer">
                <img
                  src={getPokemonSpriteUrl(currentPokemon.index)}
                  className="pokemonImage"
                  alt={currentPokemon.name}
                />
                <h1> {currentPokemon.name}</h1>
                <p>{currentDesc}</p>
              </div>
            ) : (
              ""
            )}

            <h1 className="title">
              Pokedex
            </h1>

            <div className="buttonContainer">
                <button className="button" onClick={previousPokemon}>
                    Previous
                </button>      
                <button className="button" onClick={nextPokemon}>
                    Next
                </button>
            </div>
          </section>

    </main>
    
  );
}
