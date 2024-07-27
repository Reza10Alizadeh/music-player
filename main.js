const musicList = [
    {
        img: "images/360_F_680358031_rZ3bhwlPeEe081utZAkERT1Q7iUgqiml.jpg",
        name: "Iller Sonra",
        artist: "Orkhan Zeynalli",
        music: "music/01. Blonker - Street Cafe.mp3",
    },
    {
        img: "images/Cool-Minimalist-Wallpaper-4K-HD.jpg",
        name: "Neyim Var Ki",
        artist: "CEZA",
        music: "music/02. D. Marinello - Guilty Game.mp3",
    },
    {
        img: "images/fairytale-valley-at-night-glowing-flowers-nature-wallpaper-sr10012422-1706504489805-cover.webp",
        name: "Unutulacak Dunler",
        artist: "Gazapizm",
        music: "music/03. Shadows  - Swimming.mp3",
    },
];

const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const coverImage = document.getElementById('cover');
const trackName = document.getElementById('track-name');
const artistName = document.getElementById('artist-name');

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffling = false;
let isRepeating = false;
let remainingTracks = [];

function loadTrack(index) {
    const track = musicList[index];
    audio.src = track.music;
    coverImage.src = track.img;
    trackName.textContent = track.name;
    artistName.textContent = track.artist;
}

function playTrack() {
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
}

function pauseTrack() {
    audio.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
}

function nextTrack() {
    if (isShuffling) {
        if (remainingTracks.length === 0) {
            remainingTracks = musicList.map((_, index) => index).filter(index => index !== currentTrackIndex);
        }
        currentTrackIndex = remainingTracks[Math.floor(Math.random() * remainingTracks.length)];
        remainingTracks = remainingTracks.filter(index => index !== currentTrackIndex);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % musicList.length;
    }
    loadTrack(currentTrackIndex);
    playTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + musicList.length) % musicList.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

shuffleButton.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleButton.classList.toggle('active', isShuffling);
    if (isShuffling) {
        remainingTracks = musicList.map((_, index) => index).filter(index => index !== currentTrackIndex);
    } else {
        remainingTracks = [];
    }
});

repeatButton.addEventListener('click', () => {
    isRepeating = !isRepeating;
    repeatButton.classList.toggle('active', isRepeating);
    audio.loop = isRepeating;
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

audio.addEventListener('ended', () => {
    if (isRepeating) {
        audio.currentTime = 0;
        playTrack();
    } else {
        nextTrack();
    }
});

prevButton.addEventListener('click', prevTrack);
nextButton.addEventListener('click', nextTrack);
loadTrack(currentTrackIndex);
