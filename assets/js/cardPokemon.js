let containerCardPokemon = document.getElementById("containerCardPokemon")
let cardPokemon = document.getElementById("cardPokemon")
let containerPokedex = document.getElementById("containerPokedex")
let btnVoltarTopo = document.getElementById('voltarTopo')

function stats(statsPokemon){
    if(statsPokemon.base_stat <=100){
        if(statsPokemon.base_stat <=50){
            return `class="progressRed" style="width:${statsPokemon.base_stat}%"`
        } else {
            return `class="progressGreen" style="width:${statsPokemon.base_stat}%"`
        }
    } else {
        return `class="progressGreen" style="width:100%"`
    }
}

async function sobrePokemon (element){
    let nomePokemon = element.children[1].innerText.toLowerCase()
    
    containerCardPokemon.style.visibility = "visible"
    btnVoltarTopo.style.visibility = 'hidden'
    containerPokedex.style.filter = "blur(15px)"
    
    let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
        .then((response) => response.json())
        .then((dados) => dados)

    let pokemonTypes = pokemon.types.map((typeSlot) => typeSlot.type.name)
    let pokemonType = pokemonTypes[0]
    cardPokemon.className = pokemonType

    cardPokemon.innerHTML = `
    <div id="cardTop">
            <button id="btnCloseCard"><-</button>
            <h1 id="cardName">${pokemon.name}</h1>
            <span id="cardNumber">#${convertPokemonId(pokemon.id)}</span>
            <ol id="cardTypes">
                ${pokemonTypes.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
        </div>
        <div id="cardImagem">
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </div>
        <div id="cardInfos">
            <ul id="infoBar">
                <li>About</li>
                <li>Base Stats</li>
                <li>Evolution</li>
                <li>Moves</li>
            </ul>
            <div class="infos">
                <span>HP</span>
                <span>${pokemon.stats[0].base_stat}</span>
                <div class="progressBar">
                    <div ${stats(pokemon.stats[0])}></div>
                </div>
                <span>Attack</span>
                <span>${pokemon.stats[1].base_stat}</span>
                <div class="progressBar">
                    <div ${stats(pokemon.stats[1])}></div>
                </div>
                <span>Defense</span>
                <span>${pokemon.stats[2].base_stat}</span>
                <div class="progressBar">
                    <div ${stats(pokemon.stats[2])}></div>
                </div>
                <span>Sp. Atk</span>
                <span>${pokemon.stats[3].base_stat}</span>
                <div class="progressBar">
                    <div ${stats(pokemon.stats[3])}></div>
                </div>
                <span>Sp. Def</span>
                <span>${pokemon.stats[4].base_stat}</span>
                <div class="progressBar">
                    <div ${stats(pokemon.stats[4])}></div>
                </div>
                <span>Speed</span>
                <span>${pokemon.stats[5].base_stat}</span>
                <div class="progressBar">
                    <div ${stats(pokemon.stats[5])}></div>
                </div>
            </div>
        </div>
    `

    let btnCloseCard = document.getElementById("btnCloseCard")
    btnCloseCard.addEventListener("click", () => {
        containerCardPokemon.style.visibility = "hidden"
        btnVoltarTopo.style.visibility = 'visible'
        containerPokedex.style.filter = "blur(0px)"
    })

    window.addEventListener("keydown", (event) => {
        if (event.key = "Escape"){
            btnCloseCard.click()
        }
    })

    document.addEventListener('mousedown', (event) => {
        if (!cardPokemon.contains(event.target)){
            btnCloseCard.click()
        }
    })
}