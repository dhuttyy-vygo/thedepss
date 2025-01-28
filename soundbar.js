let musicPlayer = document.querySelector(".music-player-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackNav = document.querySelector(".track-nav");
let avatarImage = document.querySelector(".avatar-thumb");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let currentTimeElement = document.querySelector(".current-time");
let totalDurationElement = document.querySelector(".total-duration");
let progressBarContainer = document.querySelector(".track-progress");
let progressBar = document.querySelector(".progress-bar");

let trackIndex = 0;
let currentActiveTrackItem = null;
let isPlaying = false;
let isDragging = false;
let isHidden = true;

let currentTrack = document.createElement("audio");

let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function () {
  isHidden = !isHidden;
  if (isHidden) {
    musicPlayer.classList.remove("hide");
    togglePlayer.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0.4s";
    trackNav.style.transitionDelay = "0.4s";
  } else {
    musicPlayer.classList.add("hide");
    togglePlayer.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0s";
    trackNav.style.transitionDelay = "0s";
  }
});

let soundBarsLottie = bodymovin.loadAnimation({
  container: soundBars,
  renderer: "svg",
  loop: true,
  autoplay: false,
  path: "https://assets5.lottiefiles.com/packages/lf20_jJJl6i.json"
});

let trackList = [
  {
    name: "Prada",
    artist: "Cassö x Raye x D Block Europe",
    thumb: "https://d2jg36g42afwo9.cloudfront.net/Prada.jpeg",
    path:
      "https://d2jg36g42afwo9.cloudfront.net/CassöxRayexDBlockEurope-Prada.mp3"
  },
  {
    name: "So much in love",
    artist: "D.O.D",
    thumb: "https://d2jg36g42afwo9.cloudfront.net/somuch.jpeg",
    path: "https://d2jg36g42afwo9.cloudfront.net/D.O.D-SoMuchInLove.mp3"
  },
  {
    name: "adore you",
    artist: "Fredagain",
    thumb: "https://d2jg36g42afwo9.cloudfront.net/adoreyou.jpeg",
    path: "https://d2jg36g42afwo9.cloudfront.net/Fredagain..-adoreu.mp3"
  },
  {
    name: "Asking",
    artist: "onny Fodera & MK",
    thumb: "https://d2jg36g42afwo9.cloudfront.net/asking.jpeg",
    path:
      "https://d2jg36g42afwo9.cloudfront.net/SonnyFodera&MK-Asking(feat.ClementineDouglas).mp3"
  },
  {
    name: "Used To",
    artist: "Nbhd Nick",
    thumb: "https://d2jg36g42afwo9.cloudfront.net/usedto.jpeg",
    path:
      "https://d2jg36g42afwo9.cloudfront.net/TheKidLAROI,JungKook,CentralCee-TOOMUCH.mp3"
  },
  {
    name: "Used To",
    artist: "Nbhd Nick",
    thumb: "https://d2jg36g42afwo9.cloudfront.net/usedto.jpeg",
    path:
      "https://d2jg36g42afwo9.cloudfront.net/TheKidLAROI,JungKook,CentralCee-TOOMUCH.mp3"
  },
  {
    name: "Used To",
    artist: "Nbhd Nick",
    thumb: "https://d2jg36g42afwo9.cloudfront.net/usedto.jpeg",
    path:
      "https://d2jg36g42afwo9.cloudfront.net/TheKidLAROI,JungKook,CentralCee-TOOMUCH.mp3"
  }
];

function createTrackList() {
  const trackListContainer = document.querySelector(".track-list");

  trackList.forEach((track, index) => {
    const trackItem = document.createElement("div");
    trackItem.classList.add("track-item");
    trackItem.innerHTML = `
      <img src="${track.thumb}" alt="Track Thumbnail">
      <div class="track-info">
        <div class="track-name">${track.name}</div>
        <div class="track-artist">${track.artist}</div>
      </div>
    `;

    trackItem.addEventListener("click", () => {
      const allTrackItems = document.querySelectorAll(".track-item");
      allTrackItems.forEach((item) => item.classList.remove("active-track"));

      trackItem.classList.add("active-track");
      loadTrack(index);
      playTrack();
    });

    trackListContainer.appendChild(trackItem);

    if (index === 0) {
      trackItem.classList.add("active-track");
      currentActiveTrackItem = trackItem;
    }
  });
}

createTrackList();

// Add an event listener to the progress bar container for click events
progressBarContainer.addEventListener("click", function (e) {
  // Calculate the click position relative to the container width
  const clickX = e.clientX - progressBarContainer.getBoundingClientRect().left;
  const containerWidth = progressBarContainer.offsetWidth;

  // Calculate the new time based on the click position
  const newTime = (clickX / containerWidth) * currentTrack.duration;

  // Update the audio's currentTime
  currentTrack.currentTime = newTime;
});

// Add an event listener to the progress bar for mousedown events
progressBarContainer.addEventListener("mousedown", function (e) {
  isDragging = true; // Set the flag to indicate dragging is in progress
  handleProgressBarDrag(e);
});

// Add an event listener to the document for mousemove events
document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    handleProgressBarDrag(e); // Update progress bar while dragging
  }
});

// Add an event listener to the document for mouseup events
document.addEventListener("mouseup", function () {
  if (isDragging) {
    isDragging = false; // Reset the flag to indicate dragging has finished
    // Update the audio's currentTime here
    const dragX = e.clientX - progressBarContainer.getBoundingClientRect().left;
    const containerWidth = progressBarContainer.offsetWidth;
    const newTime = (dragX / containerWidth) * currentTrack.duration;
    currentTrack.currentTime = newTime;
  }
});

// Function to handle progress bar drag
function handleProgressBarDrag(e) {
  if (isDragging) {
    // Calculate the drag position relative to the container width
    const dragX = e.clientX - progressBarContainer.getBoundingClientRect().left;
    const containerWidth = progressBarContainer.offsetWidth;

    // Calculate and update the progress bar
    const newTime = (dragX / containerWidth) * currentTrack.duration;
    const progress = (newTime / currentTrack.duration) * 100;
    progressBar.style.width = `${progress}%`;
  }
}
// load audio into the track //
function loadTrack(trackIndex) {
  currentTrack.src = trackList[trackIndex].path;
  currentTrack.load();
  trackName.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  avatarImage.src = trackList[trackIndex].thumb;
  currentTrack.addEventListener("loadedmetadata", function () {
    totalDurationElement.textContent = formatTime(currentTrack.duration);
  });
  currentTrack.addEventListener("ended", nextTrack);
  progressBar.style.width = "0%";
}

loadTrack(trackIndex);

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsPart = Math.floor(seconds % 60);
  return `${minutes}:${String(secondsPart).padStart(2, "0")}`;
}

currentTrack.addEventListener("timeupdate", function () {
  // Calculate the current time and total duration
  const currentTime = currentTrack.currentTime;
  const totalDuration = currentTrack.duration;

  // Update the time elements
  currentTimeElement.textContent = formatTime(currentTime);
  totalDurationElement.textContent = formatTime(totalDuration);

  // Calculate and update the progress bar
  const progress = (currentTime / totalDuration) * 100;
  progressBar.style.width = `${progress}%`;
});

function playPauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
  soundBarsLottie.playSegments([0, 120], true);
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
  soundBarsLottie.stop();
}

function nextTrack() {
  if (trackIndex < trackList.length - 1) trackIndex += 1;
  else trackIndex = 0;
  if (currentActiveTrackItem) {
    currentActiveTrackItem.classList.remove("active-track");
  }
  currentActiveTrackItem = document.querySelectorAll(".track-item")[trackIndex];
  currentActiveTrackItem.classList.add("active-track");
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  if (trackIndex > 0) trackIndex -= 1;
  else trackIndex = trackList.length - 1;
  if (currentActiveTrackItem) {
    currentActiveTrackItem.classList.remove("active-track");
  }
  currentActiveTrackItem = document.querySelectorAll(".track-item")[trackIndex];
  currentActiveTrackItem.classList.add("active-track");
  loadTrack(trackIndex);
  playTrack();
}
