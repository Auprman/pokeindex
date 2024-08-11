
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


function setBackgroundColor(type) {
    document.getElementById('modal-content').classList =''
    document.getElementById('modal-content').classList = 'modal-content ' +  type;
}


function setType(pokemon) {
    const type = pokemon['types'][0]['type']['name'];
    let moreThanOneType = [];
    if(pokemon.types.length > 1){
        pokemon.types.forEach((key) =>{
            let types = key.type.name;
            moreThanOneType.push(" " + types.charAt(0).toUpperCase() + types.slice(1));
        })
        document.getElementById('type').innerText = 'Types: ' + moreThanOneType;
    }
    else{
        document.getElementById('type').innerText = "Type: " + type.charAt(0).toUpperCase() + type.slice(1);
    }
}