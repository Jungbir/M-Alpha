// intializing home and playlist links
let home = document.getElementById('home')
let playlist = document.getElementById('playlist')
let heroHead = document.getElementById('heroHead')

// initializing the containers respective to the above links
let homeContainer = document.getElementById('gridContainer')
let playlistContainer = document.getElementById('tableContainer')

home.addEventListener('click', () => {
    homeContainer.style.display = 'grid';
    playlistContainer.style.display = 'none';
    heroHead.innerText = 'Home'
})

playlist.addEventListener('click', () => {
    playlistContainer.style.display = 'block';
    homeContainer.style.display = 'none';
    heroHead.innerText = 'Your Playlist'
})