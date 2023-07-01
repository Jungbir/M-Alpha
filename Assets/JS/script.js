// intializing home and searchbar links
let home = document.getElementById('home')
let searchForm = document.getElementById('form') //changed the id to the search bar id
let heroHead = document.getElementById('heroHead')
let searchInput = document.getElementById('navSearch')
let musicPlayer = document.getElementById('musicPlayer')

let searchIcon = document.getElementById('searchIcon')

// initializing the containers respective to the above links
let homeContainer = document.getElementById('gridContainer')
let searchResult = document.getElementById('searchResult') // container id

// to display home page when clicked on home element
home.addEventListener('click', () => {
    homeContainer.style.display = 'grid';
    searchResult.style.display = 'none';
    heroHead.innerText = 'Home';
})


// random song generating function
function randomSongsGen() {
    const clientId = '380da68aac7a4f53b983f707f7158ddc';
    const clientSecret = '2cfab4de8fd7469ea9e09cc051dc10f1';

    // function to get token from my(vikhyat's) client ID and Client Secret
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


    // geting random songs and displying on load in the home page
    async function _random(token) {

        // random alphabet will be chosen from this variable
        const characters = 'abcdefghijklmnopqrstuvwxyz';

        // random alphabet chooser function
        function generateString(length) {
            let result = ' ';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result;
        }

        // random offset
        let offset = Math.floor(Math.random() * 90);

        // endpoint for random song generator
        const result = await fetch(`https://api.spotify.com/v1/search?q=${generateString(1)}%28%29&type=track&offset=${offset}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        console.log('random songs:', data.tracks.items)

        data.tracks.items.forEach((songs) => {
            // creating the element in which the images, title,etc will be displayed
            const div = document.createElement("div")
            div.classList.add('gridItem')
            homeContainer.appendChild(div)

            // DOM manipulating the random songs tracks fetched by the endpoint
            div.innerHTML = `
            <div class="gridItem">
                <div class="gridImg"><img src="${songs.album.images[1].url}" alt=""></div>
                <div class="gridInfo">
                    <div id="gridName">${songs.name}</div>
                    <div id="gridArtist">${songs.artists[0].name}</div>
                </div>
            </div>
            `

            div.addEventListener('click', () => {

                musicPlayer.innerHTML = `
                <iframe style="border-radius:12px"
                    src="https://open.spotify.com/embed/track/${songs.id}?utm_source=generator&theme=0"
                    width="100%" height="100" frameBorder="0" allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>
                `
            })

        })
    }


    // function for search functionality
    async function _search(token, query) {

        searchResult.innerText = 'loading....'

        // endpoint for getting atmost 20 tracks on one search
        const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        console.log('song data:', data.tracks.items)

        searchResult.innerText = ''

        data.tracks.items.forEach((songs) => {
            // creating the element in which the images, title,etc will be displayed
            const div = document.createElement("div")
            div.classList.add('srInfoContainer')
            searchResult.appendChild(div)

            // to get the exact duration of the song in MM:SS format 
            let durationMilli = songs.duration_ms
            let durationAllSeconds = durationMilli / 1000
            let durationMin = durationAllSeconds / 60
            let minutes = Math.trunc(durationMin) // minutes variable for the song
            let seconds = Math.trunc((durationMin - minutes) * 60) // seconds variable for the song

            // DOM manipulating the search based songs tracks fetched by the endpoint
            div.innerHTML = `
                <div class="sr1">
                    <img src="${songs.album.images[1].url}" alt="">
                    <div class="srSide">
                        <h4 class="srTitle">${songs.name}</h4>
                        <div class="srLower">
                            <h4 class="srName">${songs.artists[0].name}</h4>
                            <hr>
                            <h4 class="srTime">${minutes}:${seconds}</h4>
                        </div>
                    </div>
                </div>
                <button class="srPlay">
                    <i class="fas fa-play"></i> Play
                </button>
            `

            div.addEventListener('click', () => {

                musicPlayer.innerHTML = `
                <iframe style="border-radius:12px"
                    src="https://open.spotify.com/embed/track/${songs.id}?utm_source=generator&theme=0"
                    width="100%" height="100" frameBorder="0" allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>
                `
            })

        })
    }



    // loading genres on load
    async function loadGeneres() {
        const token = await _getToken(); // getting the token
        const random = await _random(token); //getting random songs
    }
    loadGeneres()


    // loading and displaying search results when the form is submitted
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        homeContainer.style.display = 'none';
        searchResult.style.display = 'flex';
        let query = searchInput.value

        if (query == '') {
            searchResult.innerText = 'please Insert a query in the input box'
        }
        else {

            heroHead.innerText = `search results for '${query}'`

            async function loadSearchResults() {
                const token = await _getToken(); //getting the token
                const search = await _search(token, query); // getting search results based on the query
            }
            loadSearchResults()
        }

    })

    // loading and displaying search results but when the search icon is clicked (specifically for mobile devices)
    searchIcon.addEventListener('click', (e) => {
        e.preventDefault()
        homeContainer.style.display = 'none';
        searchResult.style.display = 'flex';

        let query = searchInput.value;

        heroHead.innerText = `search results for '${query}'`


        async function loadSearchResults() {
            const token = await _getToken(); //getting the token
            const search = await _search(token, query); // getting search results based on the query
        }
        loadSearchResults()

    })


}