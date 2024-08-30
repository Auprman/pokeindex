
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
        document.getElementById('type').innerHTML = ''
        document.getElementById('type').innerHTML = `<h3>Types:</h3>`
        pokemon.types.forEach((key) =>{
            let types = key.type.name;
            document.getElementById('type').innerHTML += `
            <h3>${types.charAt(0).toUpperCase() + types.slice(1)} <img src ="./img/types/${types}.png"></h3>`;
            moreThanOneType.push(" " + types.charAt(0).toUpperCase() + types.slice(1));
        })
    }
    else
    {
        document.getElementById('type').innerHTML = `<h3> Type: </h3> 
        <h3> ${type.charAt(0).toUpperCase() + type.slice(1)}<img src ="./img/types/${type}.png"> </h3>`;
    }
}


async function setPokemonStats(name) {
    const pokemon = await getData(URL_SINGLE + name);
    const hp = pokemon['stats'][0]['base_stat'];
    const atk = pokemon['stats'][1]['base_stat'];
    const def = pokemon['stats'][2]['base_stat'];
    const spAtk = pokemon['stats'][3]['base_stat'];
    const spDef = pokemon['stats'][4]['base_stat'];
    const speed = pokemon['stats'][5]['base_stat'];

    setHp(hp);
    setAtk(atk);
    setDef(def);
    setSpAtk(spAtk);
    setSpDef(spDef);
    setSpeed(speed)

}


function setHp(hp) {
    document.getElementById('hp').innerText = hp;   
    const hpBar = document.querySelector('.progress-bar-inner-hp');
    const hpInPercent = hp / 255 * 190;
    hpBar.style.width = hpInPercent +"px";
}


function setAtk(atk) {
    document.getElementById('atk').innerText = atk;  
    const atkBar = document.querySelector('.progress-bar-inner-atk');
    const atkInPercent = atk / 190 * 190;
    atkBar.style.width = atkInPercent +"px";
}


function setDef(def) {
    document.getElementById('def').innerText = def;  
    const defBar = document.querySelector('.progress-bar-inner-def');
    const defInPercent = def / 250 * 190;
    defBar.style.width = defInPercent +"px";
}


function setSpAtk(spAtk) {
    document.getElementById('spAtk').innerText = spAtk;  
    const spAtkBar = document.querySelector('.progress-bar-inner-special-atk');
    const spAtkInPercent = spAtk / 194 * 190;
    spAtkBar.style.width = spAtkInPercent +"px";
}


function setSpDef(spDef) {
    document.getElementById('spDef').innerText = spDef;  
    const spDefBar = document.querySelector('.progress-bar-inner-special-def');
    const spDefInPercent = spDef / 250 * 190;
    spDefBar.style.width = spDefInPercent +"px";
}


function setSpeed(speed) {
    document.getElementById('speed').innerText = speed;  
    const speedBar = document.querySelector('.progress-bar-inner-speed');
    const speedInPercent = speed / 200 * 190;
    speedBar.style.width = speedInPercent +"px";
}


async function rotateCard(pokemon, className) {
    const modal = document.getElementById('modal-content');
    modal.classList.add(className)
    setTimeout(() => {
        modal.classList.remove(className)
        document.getElementById('pokePicContainer').innerHTML = 
        `<img id="previous" onclick="showPreviousPokemon()" src="img/chevron-left.png" alt="arrow left">
         <img id="modalPokemonImg" src="" alt="Pokemon Picture" >
         <img id="next" onclick="showNextPokemon()" src="img/chevron-right.png" alt="arrow right"></img>
        `
        updateContent(pokemon)
    }, 150);
    
}


async function displayBackofCard(){
    let currentPokemon = document.getElementById('modalPokemonName').innerText.toLocaleLowerCase();    
    let skills = getData(currentPokemon)
    const modal = document.getElementById('modal-content');
    modal.innerHTML = modalHtmlContentBack(currentPokemon)
    rotateCard(currentPokemon, "rotateModalToBack");    
}


async function displayFrontOfCard(){
    let currentPokemon = document.getElementById('modalPokemonName').innerText.toLocaleLowerCase();
    const modal = document.getElementById('modal-content');
    modal.innerHTML = modalHtmlContentFront()
    rotateCard(currentPokemon, "rotateModalToFront");
}


function modalHtmlContentFront() {
    return `
            <div id="rotateBtnContainer">
                <button onclick="displayBackofCard()">Back</button>
            </div>
            <h4 id="idPokemon"></h4>
            <h2 id="modalPokemonName"></h2>
            <div id ="pokePicContainer">
                
            </div>
            <div id="attributes-pokemon">
                <br>
                <div id="type"></div>
                <br>
                <h3 id="weight"></h3>
                <br>
            </div>
            <h4>HP</h4>                    
            <div class="progress-bar">
                <h4 id="hp"></h4>
                <div class="progress-bar-inner-hp"><span id="span-hp"></span></div>
            </div>
            <h4>Attack</h4>
            <div class="progress-bar">
                <h4 id ="atk"></h4>
                <div class="progress-bar-inner-atk"><span id="span-atk"></span></div>
            </div>
            <h4>Defense</h4>            
            <div class="progress-bar">
                <h4 id="def"></h4>
                <div class="progress-bar-inner-def"><span id="span-def"></span></div>
            </div>
            <h4>Special- attack</h4>
            <div class="progress-bar">
                <h4 id="spAtk"></h4>
                <div class="progress-bar-inner-special-atk"><span id="span-special-atk"></span></div>
            </div>
            <h4>Special- defense</h4>
            <div class="progress-bar">
                <h4 id="spDef"></h4>
                <div class="progress-bar-inner-special-def"><span id="span-special-def"></span></div>
            </div>
            <h4>Speed</h4>
            <div class="progress-bar">
                <h4 id="speed"></h4>
                <div class="progress-bar-inner-speed"><span id="span-speed"></span></div>
            </div>
        `
}


function modalHtmlContentBack() {
    return `
            <div id="rotateBtnContainer">
                <button onclick="displayFrontOfCard()">Front</button>
            </div>
            <h4 id="idPokemon"></h4>
            <h2 id="modalPokemonName"></h2>
            <div id ="pokePicContainer">
    
            </div>
           
    `;
}
