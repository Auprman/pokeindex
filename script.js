
let displayAmount = 40;

const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit="+ displayAmount +"&offset=0";
const URL_START = "https://pokeapi.co/api/v2/";
const URL_COLOR = "https://pokeapi.co/api/v2/pokemon/"
const URL_PICTURE = "https://img.pokemondb.net/artwork/vector/large/";

let modal = document.getElementById('modal');





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


function htmlContent(element, index) {
    let name = element['name'].toString();
    return `
         <div onclick="showModal('${name}')" id="${name}" class = "pokemon-container">
                 <div class="pokemon-card">
                <h2>${name}</h2>
                <img src="${URL_PICTURE + name + ".png"}">
            </div>
         </div>
         `
        }


function showModal(name) { 
    const typeName = document.getElementById(name).classList[1]
    const modalContent = document.getElementById('modal-content') 
    document.getElementById('modal-content').addEventListener("click",(e) => {e.stopPropagation() })
   modal.classList.remove('hidden')
   modal.classList.add('visible')
   modalContent.classList.add(typeName)
   
   updateContent(name);
}


function hideModal(event) {
    document.getElementById('modal-content').className =''
    modal.classList.remove('visible');
    modal.classList.add('hidden');
}


async function updateContent(name) {
    
    let color = await getData(URL_COLOR + name)
    document.getElementById(name).classList.add(color['types'][0]['type']['name'])
    document.getElementById('modalPokemonName').innerText = name;
    document.getElementById('modalPokemonImg').src = URL_PICTURE + name + ".png";
    document.getElementById('type').innerText = "Type: " + color['types'][0]['type']['name']

}


// Hiermit den LoadScreen basteln

function init(){
    addPokemon()
   
}
