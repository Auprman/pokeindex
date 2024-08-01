
let displayAmount = 20;
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit="+ displayAmount +"&offset=0";
const URL_START = "https://pokeapi.co/api/v2/";
const URL_COLOR = "https://pokeapi.co/api/v2/pokemon-color/"
const URL_PICTURE = "https://img.pokemondb.net/artwork/vector/large/";

let modal = document.getElementById('modal');


addPokemon()

function rotatePokeball() {
    document.querySelector("#logoPic").style.rotate = "360deg"
}


async function getData(path) {
    let response = await fetch(path)
    let data = await response.json();
    return data;
}


function addDataToContainer(data) {
    let container = document.getElementById('content');
    
    data.results.forEach((element, index) => {
        
         container.innerHTML += htmlContent(element, index);
    });
   
}


async function addPokemon() {
    try {
        pokemon = await getData(URL_POKEMON);
        addDataToContainer(pokemon)
    } catch (error) {
        console.error(error)
    }
}


function htmlContent(element, index) {
    return `
         <div id="${element['name']}" class = "pokemon-container">
            <div onclick="showModal(${element["name"].toString()})" class = "pokemon-card">
                <h2>${element['name']}</h2>
                <img src="${URL_PICTURE + element['name'] + ".png"}">
            </div>
         </div>
         `
        }

function showModal(name) {
   modal.classList.remove('hidden')
   modal.classList.add('visible')
   updateContent(name.id);
}


function hideModal() {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
}


async function updateContent(name) {
    
    let color = await getData(URL_COLOR)
    
    document.getElementById('modalPokemonName').innerText = name;
    document.getElementById('modalPokemonImg').src = URL_PICTURE + name + ".png";
    document.getElementById('type').innerText = color

}


// Hiermit den LoadScreeb basteln
document.addEventListener('DOMContentLoaded' ,() =>{
    modal.addEventListener('click',(e) => {
        e.stopPropagation();
    })
})


async function logoutPokemon(link) {
    let response = await fetch(link)
    let data = await response.json();

    console.log(data['types'][0]['type']['name'])
}
logoutPokemon("https://pokeapi.co/api/v2/pokemon/pikachu/");