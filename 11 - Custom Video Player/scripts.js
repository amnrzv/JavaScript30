/* Get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");

/* Functions and logic */
function togglePlay(e) {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateBtn() {
    toggle.textContent = this.paused ? "▶" : "❚❚";
}

function skip() {
    const skipValue = this.dataset.skip;
    video.currentTime += parseFloat(skipValue);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleProgressBar() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

/* Event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgressBar);

progress.addEventListener('click', scrub);

toggle.addEventListener('click', togglePlay);

skipBtns.forEach(btn => btn.addEventListener('click', skip));

sliders.forEach(slider => slider.addEventListener('change', handleRangeUpdate));