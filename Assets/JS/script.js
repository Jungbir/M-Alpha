// intializing home and searchbar links
let home = document.getElementById('home')
let navSearch = document.getElementById('navSearch') //changed the id to the search bar id
let heroHead = document.getElementById('heroHead')

// initializing the containers respective to the above links
let homeContainer = document.getElementById('gridContainer')
let searchResult = document.getElementById('searchResult') // container id

home.addEventListener('click', () => {
    homeContainer.style.display = 'grid';
    playlistContainer.style.display = 'none';
    heroHead.innerText = 'Home'
})

searchResult.addEventListener('click', () => {
    searchResult.style.display = ''; // not yet decided what type of display it is
    homeContainer.style.display = 'none';
    heroHead.innerText = ''//Add the title after search and also make sure that the search icon beside the search bar also works
})
