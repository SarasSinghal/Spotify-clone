
let currentSong = new Audio();
let play = document.querySelector(".songbtn img:nth-child(2)");
let next = document.querySelector(".songbtn img:nth-child(3)");
let previous = document.querySelector(".songbtn img:nth-child(1)");
let currentPlaylist = [];
let currentIndex = 0;

const albums = [
    {
        title: "NCS Playlist",
        description: "Best of NCS music",
        cover: "songs/ncs/cover.jpg",
        folder: "songs/ncs",
        songs: ["song1.mp3", "song2.mp3"]
    },
    {
        title: "Karan Aujla",
        description: "Top Punjabi Hits",
        cover: "songs/karan aujla/cover.jpg",
        folder: "songs/karan aujla",
        songs: ["gangsta.mp3", "52bars.mp3"]
    },
    {
        title: "Angry Mood",
        description: "Channelise your anger",
        cover: "songs/Angry_(mood)/cover.jpg",
        folder: "songs/Angry_(mood)",
        songs: ["night-changes.mp3"]
    },
    {
        title: "Bright Mood",
        description: "Energize your anger",
        cover: "songs/Bright_(mood)/cover.jpg",
        folder: "songs/Bright_(mood)",
        songs: ["Alone_-_Color_Out.mp3"] 
    },
    {
        title: "Chill Mood",
        description: "Energize your anger",
        cover: "songs/Chill_(mood)/cover.jpg",
        folder: "songs/Chill_(mood)",
        songs: ["dusk-till-dawn-official-video-ft-sia.mp3"] 
    },
    {
        title: "Dark Mood",
        description: "Energize your anger",
        cover: "songs/Dark_(mood)/cover.jpg",
        folder: "songs/Dark_(mood)",
        songs: ["night-changes.mp3","steal-my-girl.mp3"] 
    },
    {
        title: "Diljit Dosanjh",
        description: "Punjabi Aagye Oyee",
        cover: "songs/Diljit/cover.jpg",
        folder: "songs/Diljit",
        songs: ["night-changes.mp3"] 
    },
    {
        title: "Funky Mood",
        description: "Energize your anger",
        cover: "songs/Funky_(mood)/cover.jpg",
        folder: "songs/Funky_(mood)",
        songs: ["night-changes.mp3","steal-my-girl.mp3"] 
    }
];

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${m}:${s}`;
}

function displayAlbums() {
    const cardContainer = document.querySelector(".cardcontainer");
    albums.forEach(album => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="img-container">
                <img src="${album.cover}" alt="${album.title}">
                <div class="play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50" fill="#1DB954" />
                        <polygon points="40,30 70,50 40,70" fill="black" />
                    </svg>
                </div>
            </div>
            <h2>${album.title}</h2>
            <p>${album.description}</p>
        `;
        card.addEventListener("click", () => {
            loadSongs(album);
        });
        cardContainer.appendChild(card);
    });
}

function loadSongs(album) {
    currentPlaylist = album.songs.map(song => `${album.folder}/${song}`);
    currentIndex = 0;

    const songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    album.songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img class="invert" width="34" src="img/music.svg" alt="">
            <div class="info">
                <div>${song}</div>
                <div>${album.title}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div>
        `;
        li.addEventListener("click", () => {
            currentIndex = index;
            playMusic(currentPlaylist[currentIndex]);
        });
        songUL.appendChild(li);
    });

    playMusic(currentPlaylist[currentIndex], true);
}

function playMusic(src, pause = false) {
    currentSong.src = src;
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerText = decodeURI(src.split("/").pop());
    document.querySelector(".songtime").innerText = "00:00 / 00:00";
}

play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        play.src = "img/pause.svg";
    } else {
        currentSong.pause();
        play.src = "img/play.svg";
    }
});

next.addEventListener("click", () => {
    if (currentIndex + 1 < currentPlaylist.length) {
        currentIndex++;
        playMusic(currentPlaylist[currentIndex]);
    }
});

previous.addEventListener("click", () => {
    if (currentIndex - 1 >= 0) {
        currentIndex--;
        playMusic(currentPlaylist[currentIndex]);
    }
});

currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerText =
        `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
});

window.onload = () => {
    displayAlbums();
};

 document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
//Add an eventlistener Hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0"
    })
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-110%"
    })
    //Add an event to volume
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");

// Volume slider input
volumeSlider.addEventListener("input", (e) => {
    currentSong.volume = e.target.value / 100;
    currentSong.muted = false;
    volumeSlider.style.display = "block"; // always visible if user slides
    volumeIcon.src = e.target.value == 0 ? "img/mute.svg" : "img/volume.svg";
});

// Mute toggle with slider hide/show
volumeIcon.addEventListener("click", () => {
    if (currentSong.muted || currentSong.volume === 0) {
        // Unmute
        currentSong.muted = false;
        currentSong.volume = volumeSlider.value / 100;
        volumeSlider.style.display = "block";  // show slider back
        volumeIcon.src = "img/volume.svg";
    } else {
        // Mute
        currentSong.muted = true;
        volumeSlider.style.display = "none";   // hide slider
        volumeIcon.src = "img/mute.svg";
    }
});

