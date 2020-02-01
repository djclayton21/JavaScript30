//get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function changeButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}
function skip() {
  const interval = Number(this.dataset.skip);
  video.currentTime += interval;
}
function handleRangeChange() {
  video[this.name] = this.value;
}
function handleProgress() {
  const progress = (this.currentTime / this.duration) * 100;
  progressBar.style.flexBasis = `${progress}%`;
}
function handleSeek(event) {
  const seekTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = seekTime;
}

//event listeners
video.addEventListener('play', changeButton);
video.addEventListener('pause', changeButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('click', togglePlay);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});

ranges.forEach(slider => {
  slider.addEventListener('change', handleRangeChange);
});

let mousedown = false;
progress.addEventListener('click', handleSeek);
progress.addEventListener('mousemove', event => mousedown && handleSeek(event));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
