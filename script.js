let modal = document.getElementById('modal');
let loadedPokemon = [];
let displayAmount = 20;
let evolutionChain = [] ;

const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit="+ displayAmount +"&offset=0";
const URL_SINGLE = "https://pokeapi.co/api/v2/pokemon/";
const URL_PICTURE = "https://img.pokemondb.net/artwork/vector/large/";


function init(){
    addPokemon();
}


function rotatePokeball() {
    document.querySelector("#logoPic").style.rotate = "360deg";
}


async function getData(path) {
    let response = await fetch(path);
    let data = await response.json();
    return data;
}


async function addDataToContainer(name,path) {
    let container = document.getElementById('content');
    loadedPokemon = [];
    showLoadingScreen();
    for (let i= 0 ; i < name.results.length ; i ++){
            loadedPokemon.push(name.results[i]['name']);
            const pokename = name.results[i]['name'];
            const pokemonData = await getData(URL_SINGLE + pokename);
            const typeName = pokemonData['types'][0]['type']['name'];      
            container.innerHTML += htmlContent(name.results[i], pokemonData.id);
            const card = document.getElementById(pokename);
            card.classList.add(typeName);
            addTypesToCard(pokemonData);
    }
    hideLoadingScreen();
}


function addTypesToCard(pokemon) {
    let pictureContainer = document.getElementById('type-pictures-' + pokemon['name']);
    if(pokemon.types.length > 1){
        pokemon.types.forEach((type, index) =>{
            pictureContainer.innerHTML += `<img src = "img/types/${type['type']['name']}.png">`;            
        })
    }
    else{
        pictureContainer.innerHTML = `<img src = "img/types/${pokemon['types'][0]['type']['name']}.png">`;
    }
}


async function addPokemon() {
    try {
        pokemons = await getData(URL_SINGLE);
        addDataToContainer(pokemons);
    } catch (error) {
        console.error(error);
    }
}


function htmlContent(element, id) {    
    let name = element['name'].toString();
    return `
         <div onclick="showModal('${name}')" id="${name}" class = "pokemon-container">
                 <div class="pokemon-card">
                 <div class ="card-header">
                 <div id = "type-pictures-${name}"></div>
                 <h4>${'# ' + id}</h4> 
                 </div>
                <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                <img onclick= "hideModal()" src="${URL_PICTURE + name + ".png"}">
            </div>
         </div>
        `  
}


async function updateContent(name) {
    const pokemon = await getData(URL_SINGLE + name);
    const type = pokemon['types'][0]['type']['name'];
    const weight  = pokemon['weight'] * 0.453592;
    setPokemonDetails (name, pokemon, type)
    setBackgroundColor(type);
    if(!document.getElementById('weight')){return}
    document.getElementById('weight').innerText ="Weight: " + weight.toFixed(0) + " kg" ;
    setType(pokemon);
    setPokemonStats(name);
}


function setPokemonDetails (name, pokemon, type) {
    document.getElementById('modalPokemonImg').src = URL_PICTURE + name + ".png";
    document.getElementById(name).classList.add(type);
    document.getElementById('modalPokemonName').innerText = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('idPokemon').innerText = '# ' + pokemon.id
}


async function loadMorePokemon() {
    displayAmount += 10 ;
    const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit=" + displayAmount + "&offset=0";
    document.getElementById('content').innerHTML = '';
    pokemons = await getData(URL_POKEMONS);
    addDataToContainer(pokemons);
}


function showLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('show');
    document.body.style.overflowY ='hidden';

}


function hideLoadingScreen() {
    document.getElementById('loadingScreen').classList.remove('show');
    document.body.style.overflowY = 'visible';
    window.scrollTo({
        top: document.body.scrollHeight
    });
}


function scrollToTop(){
    window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
    })
}


async function getEvolutionChain(pokemonName) {
    const pokemonData = await getData(URL_SINGLE + pokemonName);
    const pokemonId = pokemonData.id;
    const pokemonSpecies = await getSpecies(pokemonId);
    let response = await fetch(pokemonSpecies.evolution_chain.url);
    let data = await response.json()
    return data;
}


async function getSpecies(id) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+ id)
    let data = await response.json() 
    return data;
}


async function getAllEvolutions(pokemonName) {
    let evolutionChain = await getEvolutionChain(pokemonName);
    const evolutionChain1 = evolutionChain.chain;
    const evolutionChain2 = evolutionChain1.evolves_to[0]; 
    const evolutionChain3 = evolutionChain1.evolves_to[0];
    let evolutionArray = [evolutionChain1.species.name];
    if(evolutionChain2 !== undefined){
        evolutionArray.push(evolutionChain1.evolves_to[0].species.name)
            if(evolutionChain3.evolves_to[0] !== undefined){
                evolutionArray.push(evolutionChain1.evolves_to[0].evolves_to[0].species.name)
        }
    }
    
    
    return evolutionArray
}


async function addEvolutionChainToCard(pokemonName) {
    let evolutions = await getAllEvolutions(pokemonName);
    const evolutionContainer = document.getElementById('evlolution-container');
    if(evolutionContainer){
        evolutionContainer.innerHTML = `<h3> Evolution: </h3>`
            evolutions.forEach((element,index) =>{
                    evolutionContainer.innerHTML += 
                    `
                        <div>
                            <img src="${URL_PICTURE + element}.png" alt="pokemon picture">
                            <p>${index + 1}. ${element}</p>
                        </div>
                    ` 
            })
        }
}





