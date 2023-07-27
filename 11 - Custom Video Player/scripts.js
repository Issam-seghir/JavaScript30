const playButton = document.querySelector("button.player__button.primary");
// const forwardButton = document.querySelector("button.player__button.primary");
// const backwardButton = document.querySelector("button.player__button.primary");
const skipButtons = document.querySelectorAll("button.player__button:not(.primary)");
const video = document.querySelector("video.player__video");
const progressFilled = document.querySelector(".progress__filled");


function handleVideoPlayButton(e){

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
	const progress = `${((video.currentTime * 100) / video.duration).toFixed(2)}%`;
	console.log(progress);
	progressFilled.style.flexBasis = `${progress}`;
}

function handleVideoSkipButton(){
    console.log(this.dataset.skip);
    video.currentTime += (+this.dataset.skip);

}

playButton.addEventListener("click", handleVideoPlayButton);
skipButtons.forEach((skipBtn) => skipBtn.addEventListener("click", handleVideoSkipButton));
video.addEventListener("click", handleVideoPlayButton);
video.addEventListener("timeupdate", handleVideoProgressBar);
