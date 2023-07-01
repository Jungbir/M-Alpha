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







let gridContainer = document.getElementById('gridContainer')
// let btn = document.getElementById('btn')

// btn.addEventListener('click', () => {
function randomSongsGen() {
    const clientId = '380da68aac7a4f53b983f707f7158ddc';
    const clientSecret = '2cfab4de8fd7469ea9e09cc051dc10f1';

    async function _getToken() {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        console.log(data.access_token)
        let token = data.access_token
        return token;
    }


    async function _random(token) {

        let page = Math.floor(Math.random() * 90);

        const result = await fetch(`https://api.spotify.com/v1/search?q=getRandomSearch%28%29&type=track&offset=${page}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        console.log('random songs:', data.tracks.items)

        data.tracks.items.forEach((songs) => {
            const div = document.createElement("div")
            div.classList.add('gridItem')
            gridContainer.appendChild(div)

            div.innerHTML = `
            <div class="gridItem">
            <div class="gridImg"><img src="${songs.album.images[1].url}" alt=""></div>
            <div class="gridInfo">
            <div id="gridName">${songs.name}</div>
            <div id="gridArtist">${songs.artists[0].name}</div>
            </div>
            </div>
            `
        }
        )
    }

    async function loadGeneres() {
        const token = await _getToken();
        const random = await _random(token);
    }
    loadGeneres()

}