const playButton = document.querySelector("button.player__button.primary");
const playSvg = playButton.querySelector("svg:first-child");
const pauseSvg = playButton.querySelector("svg:last-child");
const skipButtons = document.querySelectorAll("button.player__button:not(.primary)");

const video = document.querySelector("video.player__video");
const playerControls = document.querySelector(".player__controls");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");

const volume = document.querySelector("[name=volume]");
const volumeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
volumeIcon.setAttribute("width", "40px");
volumeIcon.setAttribute("height", "100%");
volumeIcon.setAttribute("viewBox", "-0.5 0 25 25");
volumeIcon.setAttribute("fill", "none");
volumeIcon.innerHTML = `
    <path d="M12.5493 4.50005C11.3193 4.04005 8.70926 5.49996 6.54926 7.40996H4.94922C3.88835 7.40996 2.87093 7.83145 2.12079 8.58159C1.37064 9.33174 0.949219 10.3491 0.949219 11.41V13.41C0.949219 14.4708 1.37064 15.4883 2.12079 16.2385C2.87093 16.9886 3.88835 17.41 4.94922 17.41H6.54926C8.65926 19.35 11.2693 20.78 12.5493 20.33C14.6493 19.55 14.9992 15.33 14.9992 12.41C14.9992 9.48996 14.6493 5.28005 12.5493 4.50005Z" stroke="rgba(43, 4, 33, 0.747)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M20.6602 6.71997C22.1593 8.22011 23.0015 10.2542 23.0015 12.375C23.0015 14.4958 22.1593 16.5299 20.6602 18.03" stroke="rgba(43, 4, 33, 0.747)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M18.5391 15.95C19.4764 15.0123 20.003 13.7407 20.003 12.4149C20.003 11.0891 19.4764 9.81764 18.5391 8.88" stroke="rgba(43, 4, 33, 0.747)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
  `;
const speedIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
speedIcon.setAttribute("width", "60px");
speedIcon.setAttribute("height", "100%");
speedIcon.setAttribute("viewBox", "0 0 24 24");
speedIcon.setAttribute("fill", "none");
speedIcon.innerHTML = `
    <path d="M11.3122 11.1758C11.6014 11.4723 12.0763 11.4782 12.3727 11.1889C12.6692 10.8997 12.6751 10.4248 12.3858 10.1284L11.3122 11.1758ZM11.677 10.5051L11.2417 11.1158L11.2433 11.117L11.677 10.5051ZM7.157 7.28309L6.69687 7.87536C6.70501 7.88168 6.71327 7.88783 6.72166 7.89381L7.157 7.28309ZM5.83073 7.09652L6.10961 7.79275L5.83073 7.09652ZM5 8.14709L4.25824 8.03625C4.25275 8.07294 4.25 8.10999 4.25 8.14709H5ZM5 14.8931H4.25C4.25 14.9302 4.25275 14.9672 4.25824 15.0039L5 14.8931ZM5.83073 15.9437L6.10961 15.2474L6.10961 15.2474L5.83073 15.9437ZM7.157 15.7571L7.61713 16.3494L7.61808 16.3486L7.157 15.7571ZM11.678 12.2331L11.2442 11.6213C11.235 11.6278 11.2259 11.6346 11.2169 11.6416L11.678 12.2331ZM12.3868 12.6099C12.6761 12.3134 12.6702 11.8386 12.3738 11.5493C12.0773 11.26 11.6025 11.2658 11.3132 11.5623L12.3868 12.6099ZM11.1 10.6521C11.1 11.0663 11.4358 11.4021 11.85 11.4021C12.2642 11.4021 12.6 11.0663 12.6 10.6521H11.1ZM11.85 8.14709L11.1083 8.03586C11.1028 8.07268 11.1 8.10986 11.1 8.14709H11.85ZM12.6804 7.0973L12.9594 7.79348L12.6804 7.0973ZM14.006 7.28309L13.5464 7.87575C13.5544 7.88195 13.5625 7.88798 13.5707 7.89386L14.006 7.28309ZM18.527 10.5051L18.0917 11.1159C18.1018 11.123 18.1121 11.13 18.1225 11.1367L18.527 10.5051ZM18.527 12.2331L18.1225 11.6015C18.103 11.614 18.0842 11.6273 18.0659 11.6416L18.527 12.2331ZM14.006 15.7571L14.4661 16.3494L14.4671 16.3486L14.006 15.7571ZM12.6797 15.9437L12.9586 15.2474H12.9586L12.6797 15.9437ZM11.849 14.8931H11.099C11.099 14.9302 11.1018 14.9672 11.1072 15.0039L11.849 14.8931ZM12.599 12.0861C12.599 11.6719 12.2632 11.3361 11.849 11.3361C11.4348 11.3361 11.099 11.6719 11.099 12.0861H12.599ZM12.599 10.6521C12.599 10.2379 12.2632 9.90209 11.849 9.90209C11.4348 9.90209 11.099 10.2379 11.099 10.6521H12.599ZM11.099 12.0861C11.099 12.5003 11.4348 12.8361 11.849 12.8361C12.2632 12.8361 12.599 12.5003 12.599 12.0861H11.099ZM12.3858 10.1284C12.3014 10.0418 12.2093 9.96312 12.1107 9.89322L11.2433 11.117C11.268 11.1345 11.291 11.1542 11.3122 11.1758L12.3858 10.1284ZM12.1123 9.89437L7.59234 6.67237L6.72166 7.89381L11.2417 11.1158L12.1123 9.89437ZM7.61713 6.69082C7.02917 6.23404 6.24302 6.12345 5.55185 6.4003L6.10961 7.79275C6.30614 7.71402 6.52968 7.74547 6.69687 7.87536L7.61713 6.69082ZM5.55185 6.4003C4.86069 6.67715 4.36827 7.29988 4.25824 8.03625L5.74176 8.25793C5.77305 8.04854 5.91307 7.87147 6.10961 7.79275L5.55185 6.4003ZM4.25 8.14709V14.8931H5.75V8.14709H4.25ZM4.25824 15.0039C4.36827 15.7403 4.86069 16.363 5.55185 16.6399L6.10961 15.2474C5.91307 15.1687 5.77305 14.9916 5.74176 14.7823L4.25824 15.0039ZM5.55185 16.6399C6.24302 16.9167 7.02917 16.8061 7.61713 16.3494L6.69687 15.1648C6.52968 15.2947 6.30614 15.3262 6.10961 15.2474L5.55185 16.6399ZM7.61808 16.3486L12.1391 12.8246L11.2169 11.6416L6.69592 15.1656L7.61808 16.3486ZM12.1118 12.8449C12.2104 12.775 12.3024 12.6964 12.3868 12.6099L11.3132 11.5623C11.292 11.584 11.269 11.6037 11.2442 11.6213L12.1118 12.8449ZM12.6 10.6521V8.14709H11.1V10.6521H12.6ZM12.5917 8.25832C12.6231 8.04909 12.763 7.87218 12.9594 7.79348L12.4014 6.40112C11.7108 6.67789 11.2186 7.30005 11.1083 8.03586L12.5917 8.25832ZM12.9594 7.79348C13.1558 7.71478 13.3792 7.74609 13.5464 7.87575L14.4656 6.69044C13.8777 6.23446 13.0921 6.12435 12.4014 6.40112L12.9594 7.79348ZM13.5707 7.89386L18.0917 11.1159L18.9623 9.89433L14.4413 6.67233L13.5707 7.89386ZM18.1225 11.1367C18.2017 11.1874 18.2497 11.275 18.2497 11.3691H19.7497C19.7497 10.7637 19.4413 10.2 18.9315 9.87351L18.1225 11.1367ZM18.2497 11.3691C18.2497 11.4632 18.2017 11.5508 18.1225 11.6015L18.9315 12.8647C19.4413 12.5382 19.7497 11.9745 19.7497 11.3691H18.2497ZM18.0659 11.6416L13.5449 15.1656L14.4671 16.3486L18.9881 12.8246L18.0659 11.6416ZM13.5459 15.1648C13.3787 15.2947 13.1551 15.3262 12.9586 15.2474L12.4009 16.6399C13.092 16.9167 13.8782 16.8061 14.4661 16.3494L13.5459 15.1648ZM12.9586 15.2474C12.7621 15.1687 12.6221 14.9916 12.5908 14.7823L11.1072 15.0039C11.2173 15.7403 11.7097 16.363 12.4009 16.6399L12.9586 15.2474ZM12.599 14.8931V12.0861H11.099V14.8931H12.599ZM11.099 10.6521V12.0861H12.599V10.6521H11.099Z" fill="rgba(43, 4, 33, 0.747)"></path>
  `;

const playbackRate = document.querySelector("[name=playbackRate]");

const display = document.querySelector("span.display");

function handleVideoPlayButton(e) {
	if (video.paused) {
		video.play();
		playSvg.style.display = "none";
		pauseSvg.style.display = "block";
		playerControls.classList.remove("hover");
	} else {
		video.pause();
		playSvg.style.display = "block";
		pauseSvg.style.display = "none";
		playerControls.classList.add("hover");
	}
}

function handleVideoProgressBar(e) {
	const progress = `${((video.currentTime * 100) / video.duration).toFixed(2)}%`;
	progressFilled.style.flexBasis = `${progress}`;
}

function handleVideoSkipButton() {
	video.currentTime += +this.dataset.skip;
}

//* Caching the Timeout ID: Store the timeout ID in a static property handleVolume.timeoutId or (using closure)
//* to avoid potential issues with multiple timers running concurrently.
//*  This ensures that any previous timeout is cleared before setting a new one.
function handleVolume() {
	video.volume = this.value;

	const displayText = `%${(this.value * 100).toFixed(0)}`;
	display.innerHTML = displayText;
	display.append(volumeIcon);

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

	const displayText = `${video.playbackRate}`;
	display.innerHTML = displayText;
	display.append(speedIcon);

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
skipButtons.forEach((skipButton) => skipButton.addEventListener("click", handleVideoSkipButton));

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
