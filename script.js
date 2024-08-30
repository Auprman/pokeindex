let modal = document.getElementById('modal');
let loadedPokemon = [];
let displayAmount = 20;

const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit="+ displayAmount +"&offset=0";
const URL_SINGLE = "https://pokeapi.co/api/v2/pokemon/";
const URL_PICTURE = "https://img.pokemondb.net/artwork/vector/large/";


function init(){
    addPokemon();
}


function rotatePokeball() {
    document.querySelector("#logoPic").style.rotate = "360deg"
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
            const pokename = name.results[i]['name']
            const pokemonData = await getData(URL_SINGLE + pokename);
            const typeName = pokemonData['types'][0]['type']['name'];      
            container.innerHTML += htmlContent(name.results[i], pokemonData.id);
            const card = document.getElementById(pokename);
            card.classList.add(typeName)
            addTypesToCard(pokemonData)
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
        addDataToContainer(pokemons)
    } catch (error) {
        console.error(error)
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
                <img src="${URL_PICTURE + name + ".png"}">
            </div>
         </div>
        `  
}


async function updateContent(name) {
    const pokemon = await getData(URL_SINGLE + name);
    const type = pokemon['types'][0]['type']['name'];
    const weight  = pokemon['weight'] * 0.453592
   
    document.getElementById('modalPokemonImg').src = URL_PICTURE + name + ".png";
    document.getElementById(name).classList.add(type);
    document.getElementById('modalPokemonName').innerText = name.charAt(0).toUpperCase() + name.slice(1);
    setType(pokemon);
    document.getElementById('weight').innerText ="Weight: " + weight.toFixed(0) + " kg" 
    setBackgroundColor(type);
    setPokemonStats(name)
}


function stopRotation() {
    document.querySelector("#logoPic").removeAttribute('rotate')
}


function filterPokemon() {
   let input = document.getElementById('search');
   document.querySelectorAll('.pokemon-container').forEach((element) =>{
    if(input.value.length >= 3){
        element.style.display ="none"
        element.id.match(input.value.toLowerCase()) ? element.style.display ='flex' : null;
    }
    else{
        element.style.display ="flex"
    }
   });  
}


async function loadMorePokemon() {
    displayAmount += 10 ;
    const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit=" + displayAmount + "&offset=0";
    document.getElementById('content').innerHTML = '';
    pokemons = await getData(URL_POKEMONS);
    addDataToContainer(pokemons);
}


function showLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('show')
}


function hideLoadingScreen() {
    document.getElementById('loadingScreen').classList.remove('show');
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

