function filterPokemon() {
    let input = document.getElementById('search');
    let inputSmall = document.getElementById('small-search');
    document.querySelectorAll('.pokemon-container').forEach((element) =>{
     if(input.value.length >= 3){
         element.style.display ="none";
         element.id.match(input.value.toLowerCase()) ? element.style.display ='flex' : null;
     }
     else if (inputSmall.value.length >= 3){
        element.style.display ="none";
        element.id.match(inputSmall.value.toLowerCase()) ? element.style.display ='flex' : null;
     }
     else{
         element.style.display ="flex";
     }
    });  
 }
 

function filterByType() {
    const content = document.querySelectorAll("#content>div");
    let filterSelection = document.getElementById('type-selection')
    content.forEach( pokemonCard =>{
        pokemonCard.classList.add('hidden');
        let headerPics = pokemonCard.querySelectorAll('[id^=type-picture] > img');
        headerPics.forEach( picture  =>{
            let lastIndexOf = picture.src.lastIndexOf('/'); 
            let pictureName = picture.src.slice(lastIndexOf + 1 , -4);
            if(pictureName == filterSelection.value || filterSelection.value =='none'){
                pokemonCard.classList.remove('hidden');
            }
        })
    })
}

