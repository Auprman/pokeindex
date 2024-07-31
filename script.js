const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/"
const URL_PICTURE = "https://img.pokemondb.net/artwork/vector/large/"

let modal = document.getElementById('modal');


addPokemon()

function rotatePokeball() {
    document.querySelector("#logoPic").style.rotate = "360deg"
}


async function getData(path="") {
    let response = await fetch(URL_POKEMON)
    return await response.json();
}


async function displayData() {
    data = await getData();
    return data
}


function addDataToContainer(data) {
    let container = document.getElementById('content');
    
    data.results.forEach((element, index) => {
        
         container.innerHTML += htmlContent(element, index);
    });
   
}


async function addPokemon() {
    try {
        pokemon = await getData();
        addDataToContainer(pokemon)
    } catch (error) {
        console.log(error)
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

function modalContent() {
    return `
    <div id="modal-content">
        <h2>Pikatchu</h2>
        <img src="https://img.pokemondb.net/artwork/vector/large/pikachu.png" alt="Pokemon Picture" >
        <div id="attributes-pokemon">

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


function updateContent(name) {
    document.getElementById('modalPokemonName').innerText = name;
    document.getElementById('modalPokemonImg').src = URL_PICTURE + name + ".png";
}

// Hiermit den LoadScreeb basteln
document.addEventListener('DOMContentLoaded' ,() =>{
    modal.addEventListener('click',(e) => {
        e.stopPropagation();
    })
})