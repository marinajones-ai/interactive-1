let currentSlide = 0;
let currentAudio = null;

/* SOUND PER SLIDE */
const slideSounds = {
  0: { file: "sound-0.mp3", volume: 1 },
  1: { file: "sound-0.mp3", volume: 1 },
  2: { file: "sound-1.wav", volume: 0.1 },
  3: { file: "sound-1.wav", volume: 0.1 },
  4: { file: "sound-2.mp3", volume: 0.5 },
  5: { file: "sound-3.mp3", volume: 0.3 },
  6: { file: "sound-3.mp3", volume: 0.3 },
  7: { file: "sound-3.mp3", volume: 0.3 },
  8: { file: "sound-0.mp3", volume: 0.3 },
  9: { file: "sound-3.mp3", volume: 0.3 },
  10: { file: "sound-2.mp3", volume: 0.5 },
  11: { file: "sound-1.wav", volume: 1 },
  12: { file: "sound-0.mp3", volume: 0.3 },
  13: { file: "sound-0.mp3", volume: 1 },
};

/* MAP POSITIONS */
const mapPositions = {
  0: { x: 17.5, y: 89 },
  1: { x: 14, y: 65.5 },
  2: { x: 28, y: 52 },
  3: { x: 52, y: 49 },
  4: { x: 52, y: 49 },
  5: { x: 69, y: 38 },
  6: { x: 64, y: 65 },
  7: { x: 64, y: 65 },
  8: { x: 17.5, y: 89 },
  9: { x: 12, y: 89 },
  10: { x: 52, y: 49 },
  11: { x: 69, y: 38 },
  12: { x: 17.5, y: 89 },
  13: { x: 17.5, y: 89 },
};

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const backBtn = document.querySelector(".back-btn");

  if (index < 0 || index >= slides.length) return;

  slides.forEach((s) => s.classList.remove("active"));
  slides[index].classList.add("active");

  currentSlide = index;

  backBtn.style.display = index >= 1 ? "block" : "none";

  updateMapMarker();
  playSlideSound();
}

function goToSlide(index) {
  showSlide(index);
}

function goBack() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
  updateMapMarker();
});

/* MAP TOGGLE */
function toggleMap() {
  const map = document.getElementById("mapOverlay");
  const backBtn = document.querySelector(".back-btn");

  map.classList.toggle("active");

  if (map.classList.contains("active")) {
    backBtn.style.display = "none";
  } else {
    backBtn.style.display = currentSlide >= 1 ? "block" : "none";
  }
}

/* MAP MARKER UPDATE */
function updateMapMarker() {
  const marker = document.getElementById("mapMarker");
  if (!marker) return;

  const pos = mapPositions[currentSlide];

  if (!pos) {
    marker.style.left = "50%";
    marker.style.top = "50%";
    return;
  }

  marker.style.left = pos.x + "%";
  marker.style.top = pos.y + "%";
}

/* KEYBOARD MAP TOGGLE */
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "m") {
    toggleMap();
  }
});

/* AUDIO */
function playSlideSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const data = slideSounds[currentSlide];
  if (!data) return;

  const audio = new Audio(`assets/${data.file}`);
  audio.loop = true;
  audio.volume = data.volume ?? 0.5;

  audio.play().catch(() => {});

  currentAudio = audio;
}

/* UNLOCK AUDIO */
document.addEventListener(
  "click",
  () => {
    playSlideSound();
  },
  { once: true },
);
