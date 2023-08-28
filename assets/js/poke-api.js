const pokeApi = {}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    fetch(URL)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => {
            for (let i = 0; i < pokemons.length; i += 1) {
                const pokemon = pokemons[i];
                pokemonList.innerHTML += convertPokemonToLi(pokemon)
            }
        })
        .catch((error) => console.error(error))
}