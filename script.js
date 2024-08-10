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
        container.innerHTML += htmlContent(element, index);
        const card = document.getElementById(pokename);
        card.classList.add(pokemonData['types'][0]['type']['name'])
    });
}


async function addPokemon() {
    try {
        pokemons = await getData(URL_POKEMONS);
        console.log(pokemons);
        addDataToContainer(pokemons)
    } catch (error) {
        console.error(error)
    }
}

function htmlContent(element, index) {    
    let name = element['name'].toString();
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
    let color = await getData(URL_SINGLE + name);
    let type = color['types'][0]['type']['name'];
    document.getElementById(name).classList.add(type);
    document.getElementById('modalPokemonName').innerText = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('modalPokemonImg').src = URL_PICTURE + name + ".png";
    document.getElementById('type').innerText = "Type: " + type.charAt(0).toUpperCase() + type.slice(1);
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


function showNextPokemon() {
    let currentPokemon = document.getElementById('modalPokemonName').innerText.toLocaleLowerCase();
   
    loadedPokemon.forEach((parameter, index) =>{
        if(parameter == currentPokemon && index < loadedPokemon.length - 1){
            className = document.getElementById(currentPokemon).classList[1];
            updateContent(loadedPokemon[index + 1])
        }
    }) 
}


function showPreviousPokemon() {
    let currentPokemon = document.getElementById('modalPokemonName').innerText.toLocaleLowerCase();
    loadedPokemon.forEach((parameter, index) =>{
        if(parameter == currentPokemon && index > 0){
            updateContent(loadedPokemon[index - 1])
        }
    })
}


async function loadMorePokemon() {
    console.log(document.body.scrollHeight);
    
    displayAmount += 10 ;
    const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit=" + displayAmount + "&offset=0";
    document.getElementById('content').innerHTML = '';
    pokemons = await getData(URL_POKEMONS);
    addDataToContainer(pokemons);
    
    document.addEventListener('loadeddata')
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
     

}



function setBackgroundColor(type) {
    document.getElementById('modal-content').classList =''
    document.getElementById('modal-content').classList = 'modal-content ' +  type;
}

document.addEventListener('DOMContentLoaded', () =>{
    stopRotation()
    console.log('geladen!!');
})



