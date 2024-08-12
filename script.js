let modal = document.getElementById('modal');
let loadedPokemon = [];
let displayAmount = 20;

const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit="+ displayAmount +"&offset=0";
const URL_SINGLE = "https://pokeapi.co/api/v2/pokemon/";
const URL_PICTURE = "https://img.pokemondb.net/artwork/vector/large/";



function init(){
    addPokemon()
    rotatePokeball();
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
    name.results.forEach(async (element, index) => {
        loadedPokemon.push(element['name']);    
        const pokename = element['name']
        const pokemonData = await getData(URL_SINGLE + pokename); 
        container.innerHTML += htmlContent(element, pokemonData.id);
        const card = document.getElementById(pokename);
        card.classList.add(pokemonData['types'][0]['type']['name'])
    });
}


async function addPokemon() {
    try {
        pokemons = await getData(URL_POKEMONS);
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
                 <h4>${'# ' + id}</h4>
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
    const hp = pokemon['stats'][0]['base_stat']
   
    document.getElementById(name).classList.add(type);
    document.getElementById('modalPokemonName').innerText = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('modalPokemonImg').src = URL_PICTURE + name + ".png";
    setType(pokemon);
    document.getElementById('weight').innerText ="Weight: " + weight.toFixed(0) + " kg" 
    document.getElementById('hp').innerText = "HP: " + hp;
    setBackgroundColor(type);
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
    document.addEventListener('DOMContentLoaded', () =>{
    window.scrollTo(0,0);
    })
}



