const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokeId = urlParams.get('id');

// DOM
const mainContent = document.getElementById("details-card")

function convertPokemonInfoToHTML(pokemon) {
    return `
    <section class="main-content ${pokemon.type}">
        <header class="header-content">
            <div>
                <h1 class="capitalize">${pokemon.name}</h1>
                <ol class="types">
                        ${pokemon.types.map((type) => `<li class="capitalize">${type}</li>`).join('')}
                </ol>
            </div>
            <h2>#0${pokemon.order}</h2>
        </header>
        <img src="${pokemon.image}" alt="${pokemon.name}" width="150px"/>
        <section class="stats-content">
            <h2 class="stats-title">Base Stats</h2>
            <ol> 
                <li class="stats-info">HP <span>${pokemon.hp}</span></li>
                <li class="stats-info">Attack <span>${pokemon.attack}</span></li>
                <li class="stats-info">Defense <span>${pokemon.defense}</span></li>
                <li class="stats-info">Sp. Atk <span>${pokemon.special_attack}</span></li>
                <li class="stats-info">Sp. Def <span>${pokemon.special_defense}</span></li>
                <li class="stats-info">Speed <span>${pokemon.speed}</span></li>
                <li class="stats-info">Total <span>${pokemon.total}</span></li>
            </ol>
        </section>
    </section>
`
}

function loadPokemonInfo(pokeId) {
    pokeApi.getOnePokemon(pokeId).then((pokemon) => {
        const newHTML = convertPokemonInfoToHTML(pokemon);
        mainContent.innerHTML += newHTML;
    })
}

loadPokemonInfo(pokeId)
