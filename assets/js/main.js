let offset = 0;
const limit = 10;
const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

// DOM
const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMoreBtn");


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon  ${pokemon.type}" data-id="${pokemon.order}">
            <span class="number">#${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type  ${pokemon.type}">${type}</li>`).join('')}    
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}" />
            </div>
        </li>
    `
}

function redirectToDetails(ID) {
    window.location.href = `pokeDetails.html?id=${ID}`
}

function loadPokemonsItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML =  pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHTML
        const pokemonLi = document.querySelectorAll(".pokemon");
        pokemonLi.forEach((element) => {
            const pokeID = element.getAttribute("data-id")
            element.addEventListener("click", () => redirectToDetails(pokeID))
        })
    })
}

loadPokemonsItems(offset, limit)

loadMoreBtn.addEventListener('click', () => {
    offset += limit
    loadPokemonsItems(offset, limit)
})