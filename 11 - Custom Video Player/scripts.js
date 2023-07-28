const playButton = document.querySelector("button.player__button.primary");
const skipButtons = document.querySelectorAll("button.player__button:not(.primary)");

const video = document.querySelector("video.player__video");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");

const volume = document.querySelector("[name=volume]");
const volumeText = document.querySelector("span.volume");

const playbackRate = document.querySelector("[name=playbackRate]");
const playbackRateText = document.querySelector("span.playbackRate");

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
	console.log(progress);
	progressFilled.style.flexBasis = `${progress}`;
}

function handleVideoSkipButton() {
	console.log(this.dataset.skip);
	video.currentTime += +this.dataset.skip;
}

function handleVolume() {
	console.log(this.value);
	// video.volume=this.value;
    	video.volume = this.value;

		volumeText.innerHTML = `%${video.volume * 100} 🔊`;
		volumeText.classList.add("show");

		setTimeout(() => volumeText.classList.remove("show"), 2000);
}

function handlePlaybackRate() {
	console.log(this.value);
	video.playbackRate = this.value;

	playbackRateText.innerHTML = `⚡${video.playbackRate}`;
	playbackRateText.classList.add("show");

	setTimeout(() => playbackRateText.classList.remove("show"), 2000);
}

function scrub(e) {
  const scrubTime = 1/(progress.offsetWidth/e.offsetX ) *100
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
volume.addEventListener("change", handleVolume);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", scrub);
