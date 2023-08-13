const playButton = document.querySelector("button.player__button.primary");
const skipButtons = document.querySelectorAll("button.player__button:not(.primary)");

const video = document.querySelector("video.player__video");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");

const volume = document.querySelector("[name=volume]");
const playbackRate = document.querySelector("[name=playbackRate]");

const display = document.querySelector("span.display");

function handleVideoPlayButton(e) {
	playButton.classList.toggle("toggle");
	// console.log(this.classList);
	if (!playButton.classList.contains("toggle")) {
		video.play();

		playButton.innerHTML = "⏸";
	} else {
		video.pause();
		playButton.innerHTML = "▶";
	}
}

function handleVideoProgressBar(e) {
	// console.log(e.target.value);
	const progress = `${((video.currentTime * 100) / video.duration).toFixed(2)}%`;
	// console.log(progress);
	progressFilled.style.flexBasis = `${progress}`;
}

function handleVideoSkipButton() {
	// console.log(this.dataset.skip);
	video.currentTime += +this.dataset.skip;
}

//* Caching the Timeout ID: Store the timeout ID in a static property handleVolume.timeoutId or (using closure)
//* to avoid potential issues with multiple timers running concurrently.
//*  This ensures that any previous timeout is cleared before setting a new one.
function handleVolume() {
	video.volume = this.value;

	const displayText = `%${(this.value * 100).toFixed(0)} 🔊`;
	display.innerHTML = displayText;

	display.classList.add("show");

	clearTimeout(handleVolume.timeoutId);
	handleVolume.timeoutId = setTimeout(() => {
		display.classList.remove("show");
	}, 2000);
}
handleVolume.timeoutId = null;


//* Caching the Timeout ID: Store the timeout ID in a static property handlePlaybackRate.timeoutId or (using closure)
//* to avoid potential issues with multiple timers running concurrently.
//*  This ensures that any previous timeout is cleared before setting a new one.
function handlePlaybackRate() {
	video.playbackRate = this.value;

	const displayText = `⚡${video.playbackRate}`;
	display.innerHTML = displayText;

	display.classList.add("show");

	clearTimeout(handlePlaybackRate.timeoutId);
	handlePlaybackRate.timeoutId = setTimeout(() => {
		display.classList.remove("show");
	}, 2000);
}
handlePlaybackRate.timeoutId = null;


function scrub(e) {
	const scrubTime = (1 / (progress.offsetWidth / e.offsetX)) * 100;
	video.currentTime = (video.duration * scrubTime) / 100;
	// console.log(e.offsetX);
	// console.log(progress.offsetWidth);
	// console.log(scrubTime);
	// console.log(video.currentTime);
}


video.addEventListener("click", handleVideoPlayButton);
video.addEventListener("timeupdate", handleVideoProgressBar);

playButton.addEventListener("click", handleVideoPlayButton);
skipButtons.forEach((skipBtn) => skipBtn.addEventListener("click", handleVideoSkipButton));

// ranges
playbackRate.addEventListener("change", handlePlaybackRate);
playbackRate.addEventListener("mousemove", handlePlaybackRate);
volume.addEventListener("change", handleVolume);
volume.addEventListener("mousemove", handleVolume);

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("dragstart", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
