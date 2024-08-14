
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

async function setPokemonStats(name) {
    const pokemon = await getData(URL_SINGLE + name);
    const hp = pokemon['stats'][0]['base_stat'];
    const atk = pokemon['stats'][1]['base_stat'];
    const def = pokemon['stats'][2]['base_stat']
    setHp(hp);
    setAtk(atk);
    setDef(def);
     
}

function setHp(hp) {
    document.getElementById('hp').innerText = "HP: " + hp;   
    const hpBar = document.querySelector('.progress-bar-inner-hp');
    const hpInPercent = hp / 255 * 140;
    hpBar.style.width = hpInPercent +"px";
}


function setAtk(atk) {
    document.getElementById('atk').innerText = "Attack: " + atk;  
    const atkBar = document.querySelector('.progress-bar-inner-atk');
    const atkInPercent = atk / 475 * 140;
    atkBar.style.width = atkInPercent +"px";
}


function setDef(def) {
    document.getElementById('def').innerText = "Defense: " + def;  
    const defBar = document.querySelector('.progress-bar-inner-def');
    const defInPercent = def / 340 * 140;
    defBar.style.width = defInPercent +"px";
}


// function setHp(hp) {
//     const hpBar = document.querySelector('.progress-bar-inner-hp');
//     const hpInPercent = hp / 340 * 140;
//     hpBar.style.width = hpInPercent +"px";
// }


// function setHp(hp) {
//     const hpBar = document.querySelector('.progress-bar-inner-hp');
//     const hpInPercent = hp / 340 * 140;
//     hpBar.style.width = hpInPercent +"px";
// }