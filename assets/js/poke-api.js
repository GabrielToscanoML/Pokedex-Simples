const pokeApi = {}

function assignPokemonStats (pokemonObj, pokemonStats) {
    pokemonObj.hp = pokemonStats[0].base_stat;
    pokemonObj.attack = pokemonStats[1].base_stat;
    pokemonObj.defense = pokemonStats[2].base_stat;
    pokemonObj.special_attack = pokemonStats[3].base_stat;
    pokemonObj.special_defense = pokemonStats[4].base_stat;
    pokemonObj.speed = pokemonStats[5].base_stat;
    const attributes = [pokemonObj.hp, pokemonObj.attack, pokemonObj.defense,
    pokemonObj.special_attack, pokemonObj.special_defense, pokemonObj.speed];
    pokemonObj.total = attributes.reduce((total, values) => total + values, 0)
}

function convertePokeApiDetailToPokemonModel (pokeDetail) {
    const pokemon = new PokemonDetail();
    pokemon.order = pokeDetail.id
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;
    assignPokemonStats(pokemon, pokeDetail.stats);
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