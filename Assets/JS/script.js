// intializing home and searchbar links
let home = document.getElementById('home')
let searchForm = document.getElementById('form') //changed the id to the search bar id
let heroHead = document.getElementById('heroHead')
let searchInput = document.getElementById('navSearch')

let searchIcon = document.getElementById('searchIcon')

// initializing the containers respective to the above links
let homeContainer = document.getElementById('gridContainer')
let searchResult = document.getElementById('searchResult') // container id

home.addEventListener('click', () => {
    homeContainer.style.display = 'grid';
    searchResult.style.display = 'none';
    heroHead.innerText = 'Home';
})


searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    homeContainer.style.display = 'none';
    searchResult.style.display = 'flex';
    heroHead.innerText = `search results for '${searchInput.value}'`
})

searchIcon.addEventListener('click', (e) => {
    e.preventDefault()
    homeContainer.style.display = 'none';
    searchResult.style.display = 'flex';
    heroHead.innerText = `search results for '${searchInput.value}'`
})
