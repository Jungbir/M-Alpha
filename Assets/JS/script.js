// intializing home and playlist links
let home = document.getElementById('home')
let playlist = document.getElementById('playlist')

// initializing the containers rispective to the above links
let homeContainer = document.getElementById('heroGrid')
let playlistContainer = document.getElementById('tableContainer')

home.addEventListener('click',()=>{
    homeContainer.style.display = 'block';
    playlistContainer.style.display = 'none';
})

playlist.addEventListener('click',()=>{
    playlistContainer.style.display = 'block';
    homeContainer.style.display = 'none';
})