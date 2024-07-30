const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/"
const URL_PICTURE = "https://img.pokemondb.net/artwork/vector/large/"

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
         <div class = "pokemon-container">
            <div class = "pokemon-card">
                <h2>${element['name']}</h2>
                <img src="${URL_PICTURE + element['name'] + ".png"}">
            </div>
         </div>
         `
}

addPokemon()


// Hiermit den LoadScreeb basteln
// document.addEventListener('DOMContentLoaded' ,() =>{
//     console.log("Fertig geladen!!!")
// })