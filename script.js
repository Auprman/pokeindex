
let displayAmount = 60;

const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit="+ displayAmount +"&offset=0";
const URL_START = "https://pokeapi.co/api/v2/";
const URL_COLOR = "https://pokeapi.co/api/v2/pokemon/"
const URL_PICTURE = "https://img.pokemondb.net/artwork/vector/large/";

let modal = document.getElementById('modal');
let loadedPokemon = [];

function init(){
    addPokemon()
    rotatePokeball();
}


function rotatePokeball() {
    document.querySelector("#logoPic").style.rotate = "360deg"
}


async function getData(path) {
    let response = await fetch(path)
    let data = await response.json();
    return data;
}


async function addDataToContainer(name,path) {
    let container = document.getElementById('content');
    
    name.results.forEach(async (element, index) => {
        const pokename = element['name']
        const pokemonData = await getData(URL_COLOR + pokename); 
        container.innerHTML += htmlContent(element, index);
        const card = document.getElementById(pokename);
        card.classList.add(pokemonData['types'][0]['type']['name'])
        loadedPokemon.push(element['name']);
    });
}


async function addPokemon() {
    try {
        pokemon = await getData(URL_POKEMON);
        path = await getData(URL_COLOR);
        
        addDataToContainer(pokemon,path )
    } catch (error) {
        console.error(error)
    }
}

function htmlContent(element, index) {    let name = element['name'].toString();
    return `
         <div onclick="showModal('${name}')" id="${name}" class = "pokemon-container">
                 <div class="pokemon-card">
                <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                <img src="${URL_PICTURE + name + ".png"}">
            </div>
         </div>
        `        }


function showModal(name) { 
    const typeName = document.getElementById(name).classList[1]
    const modalContent = document.getElementById('modal-content') 
    document.getElementById('modal-content').addEventListener("click",(e) => {e.stopPropagation() })
    modal.classList.remove('hidden')
    modal.classList.add('visible')
    modalContent.classList.add(typeName)
    document.body.style.overflowY = "hidden"   
    updateContent(name);
}


function hideModal(event) {
    document.getElementById('modal-content').className =''
    modal.classList.remove('visible');
    modal.classList.add('hidden');
    document.body.style.overflowY = "scroll"
}


async function updateContent(name) {
    let color = await getData(URL_COLOR + name);
    let type = color['types'][0]['type']['name'];
    document.getElementById(name).classList.add(type);
    document.getElementById('modalPokemonName').innerText = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('modalPokemonImg').src = URL_PICTURE + name + ".png";
    document.getElementById('type').innerText = "Type: " + type.charAt(0).toUpperCase() + type.slice(1);
    document.getElementById('modal-content').classList =''
    document.getElementById('modal-content').classList = 'modal-content ' +  type;
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


function showNextPokemon() {
    let currentPokemon = document.getElementById('modalPokemonName').innerText.toLocaleLowerCase();
   
    loadedPokemon.forEach((parameter, index) =>{
        if(parameter == currentPokemon && index < loadedPokemon.length - 1){
            className = document.getElementById(currentPokemon).classList[1];
            updateContent(loadedPokemon[index + 1])
        }
    }) 
    // document .getElementById('modal-content').classList = '';
    // document .getElementById('modal-content').classList = className;
}


function showPreviousPokemon() {
    let currentPokemon = document.getElementById('modalPokemonName').innerText.toLocaleLowerCase();
    loadedPokemon.forEach((parameter, index) =>{
        if(parameter == currentPokemon && index > 0){
            updateContent(loadedPokemon[index - 1])
        }
    })
}


document.addEventListener('load', stopRotation())



