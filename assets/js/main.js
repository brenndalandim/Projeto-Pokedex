let pokedex = document.getElementById("pokedex")
let proxPag = document.getElementById("proxPag")
let pagAnterior = document.getElementById("pagAnterior")
let maisPokemonsBtn = document.getElementById("maisPokemonsBtn")
let paginacao = document.getElementById("paginacao")



/* A primeira geração para no #151, isso é 12x a paginação com 12 pokemons e depois mais 7 pokemons*/
let maxPokemons = 151
let pokemonsPorPagina = 12
let calcLimite = Math.trunc(maxPokemons/pokemonsPorPagina)
let qntAindaCabe = maxPokemons - (pokemonsPorPagina*calcLimite)
let offset = 0
maisPokemonsBtn.addEventListener("click", async()=>{
    offset+=pokemonsPorPagina
    if(offset < pokemonsPorPagina*calcLimite){
        pokeApi.getPokemons(offset, pokemonsPorPagina).then((pokemons = []) => {
            pokedex.innerHTML += pokemons.map(convertPokemonToLi).join("")
        })
    } else {
        await pokeApi.getPokemons(offset, qntAindaCabe).then((pokemons = []) => {
            pokedex.innerHTML += pokemons.map(convertPokemonToLi).join("")
        })
        paginacao.innerHTML = "Final dos pokemons da 1ª Geração (até #151)"
    }
    
})

//Carregamento por navegação de página
/*let offset = 0
proxPag.addEventListener("click",()=>{
    offset+=12

    pokeApi.getPokemons(offset).then((pokemons = []) => {
        pokedex.innerHTML = pokemons.map(convertPokemonToLi).join("")
    })
})

pagAnterior.addEventListener("click",()=>{
    offset-=12
    if(offset > 0){
        pokeApi.getPokemons(offset).then((pokemons = []) => {
            pokedex.innerHTML = pokemons.map(convertPokemonToLi).join("")
        })
    } else {
        pokeApi.getPokemons().then((pokemons = []) => {
            pokedex.innerHTML = pokemons.map(convertPokemonToLi).join("")
        })
        offset = 0
    }
})*/

function convertPokemonId (pokemonId){
    if (pokemonId < 10){
        return "00" + pokemonId
    } else if (pokemonId < 99){
        return "0" + pokemonId
    } else {
        return pokemonId
    }
}

function convertPokemonToLi (pokemon){
    return `
    <li class="pokemon ${pokemon.type}" onclick="sobrePokemon(this)">
        <span class="number">#${convertPokemonId(pokemon.number)}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
            <div class="imagem">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    </li>
    `
}

pokeApi.getPokemons().then((pokemons = []) => {
    pokedex.innerHTML = pokemons.map(convertPokemonToLi).join("")
})