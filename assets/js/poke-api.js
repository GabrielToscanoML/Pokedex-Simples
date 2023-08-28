const pokeApi = {}

function convertePokeApiDetailToPokemonModel (pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.order = pokeDetail.id
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertePokeApiDetailToPokemonModel)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(URL)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getOnePokemon = (ID) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${ID}`
    return fetch(URL)
            .then((response) => response.json())
            .then(convertePokeApiDetailToPokemonModel)
            .then((pokemonDetail) => pokemonDetail)
}