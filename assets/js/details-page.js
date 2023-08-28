const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokeId = urlParams.get('id');

console.log(pokeId)


function loadPokemonInfo(pokeId) {
    pokeApi.getOnePokemon(pokeId).then((pokemon) => {
        console.log(pokemon)
    })
}

loadPokemonInfo(pokeId)
