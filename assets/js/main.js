const offset = 0;
const limit = 10;
const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

// DOM
const pokemonList = document.getElementById("pokemonList")

function convertPokemonsTypesToLi(pokemonTypes) {
    return pokemonTypes.map(({type}) => `<li class="type">${type.name}</li>`)
}

function convertPokemonToLi (pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonsTypesToLi(pokemon.types).join('')}
                </ol>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" />
            </div>
        </li>
    `
}

pokeApi.getPokemons().then((pokemons = []) => {
    const newHTML =  pokemons.map(convertPokemonToLi).join('')
    // poderia ter feito de forma direta também
    pokemonList.innerHTML = newHTML
})
