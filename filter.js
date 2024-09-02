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

