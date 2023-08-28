# Custom Video Player

<div class="video-container">
  <video controls >
    <source src="./assets/video/showcase.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
In this project, I built a custom video player with additional features beyond the default browser controls. The custom player allows users to control video playback, adjust volume, change playback speed, and scrub through the video timeline. The player also provides a visual representation of volume and playback speed changes.

Let's delve into the code and understand how I **achieved** this and what I **added/fixed** from the original solution.

## Table of Contents

- [Custom Video Player](#custom-video-player)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How I Made This Happen](#how-i-made-this-happen)
    - [1. Play/Pause Button](#1-playpause-button)
    - [2. Skip Buttons](#2-skip-buttons)
    - [3. Progress Bar](#3-progress-bar)
    - [4. Volume Control](#4-volume-control)
    - [5. Playback Speed Control](#5-playback-speed-control)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

1. **Play/Pause Button**: Users can click the play/pause button or the video itself to toggle between playing and pausing the video.
2. **Skip Buttons**: Skip forward or backward in the video by a specified duration.
3. **Progress Bar**: Visualize video progress with a dynamic progress bar. Users can also click on the progress bar to seek to a specific point in the video.
4. **Volume Control**: Adjust the volume using a slider control. The volume level is displayed as a percentage.
5. **Playback Speed Control**: Change the playback speed of the video using a slider control.

## How I Made This Happen

### 1. Play/Pause Button

- The play button toggles between displaying a play icon and a pause icon based on the video's current state.
- Clicking the play button or the video element itself triggers the `handleVideoPlayButton` function. This function plays or pauses the video accordingly and updates the button's icon.

```js
//  declare variables
const video = document.querySelector("video.player__video");
const playerControls = document.querySelector(".player__controls");

const playButton = document.querySelector("button.player__button.primary");
const playSvg = playButton.querySelector("svg:first-child");
const pauseSvg = playButton.querySelector("svg:last-child");


    function handleVideoPlayButton() {
     if (video.paused) {
        video.play();
        // display play icon
        playSvg.style.display = "none";
        pauseSvg.style.display = "block";
        // remove hover state from the video
        playerControls.classList.remove("hover");
     } else {
        video.pause();
        // display pause icon
        playSvg.style.display = "block";
        pauseSvg.style.display = "none";
        // add hover state from the video
        playerControls.classList.add("hover");
     }
    }

video.addEventListener("click", handleVideoPlayButton);
playButton.addEventListener("click", handleVideoPlayButton);

```

### 2. Skip Buttons

- Skip buttons allow users to jump forward or backward in the video by a specific duration defined in the `data-skip` attribute.
- Clicking a skip button triggers the `handleVideoSkipButton` function. This function adjusts the video's `currentTime` property by the skip duration.

```js
    const skipButtons = document.querySelectorAll("button.player__button:not(.primary)");

    function handleVideoSkipButton() {
      // currentTime = currentTime + Number(skip)
     video.currentTime += +this.dataset.skip;
    }

    skipButtons.forEach((skipButton) => skipButton.addEventListener("click", handleVideoSkipButton));
```

### 3. Progress Bar

- The progress bar visually represents the current position in the video timeline.
- The `handleVideoProgressBar` function updates the progress bar's filled portion based on the video's current time and total duration.

```js
    const progress = document.querySelector(".progress");
    const progressFilled = document.querySelector(".progress__filled");

    function handleVideoProgressBar() {
      // We calculate the progress percentage of the video based on its current time and total duration.
     const progress = `${((video.currentTime * 100) / video.duration).toFixed(2)}%`;
     progressFilled.style.flexBasis = `${progress}`;
    }

    function scrub(e) {
     // Calculate the relative position (scrubTime) of the click within the progress bar.
    // This is achieved by dividing the offsetX (position of the click) by the total width of the progress bar.
    const scrubTime = (1 / (progress.offsetWidth / e.offsetX)) * 100;
    // Calculate the new current time of the video based on the scrubTime and video duration.
    // The scrubTime is converted to a fraction of the video duration (currentTime = duration * scrubTime / 100).
    video.currentTime = (video.duration * scrubTime) / 100;
  }


    let mousedown = false;
    // When the user clicks on the progress bar, we want to update the video's time to that point.
    progress.addEventListener("click", scrub);
    // When the user starts dragging (initiates a drag event), we also update the video's time.
    progress.addEventListener("dragstart", scrub);
    // While the mouse is moving over the progress bar, we update the video's time only if the mouse button is pressed.
    progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
    // When we press the mouse button on the progress bar, we set the 'mousedown' flag to true.
    progress.addEventListener("mousedown", () => (mousedown = true));
    // When we release the mouse button anywhere on the page, we set the 'mousedown' flag to false.
    progress.addEventListener("mouseup", () => (mousedown = false));
    // As the video plays and its time updates.
    video.addEventListener("timeupdate", handleVideoProgressBar);
```

### 4. Volume Control

- Users can adjust the video's volume using a slider control.
- The `handleVolume` function handles volume changes. It updates the video's `volume` property and displays the current volume level as a percentage.

```js
    const volume = document.querySelector("[name=volume]");
    // Creating an SVG icon for the volume control.
    const volumeIcon = document.createElementNS("<http://www.w3.org/2000/svg>", "svg");
    volumeIcon.setAttribute("width", "40px");
    volumeIcon.setAttribute("height", "100%");
    volumeIcon.setAttribute("viewBox", "-0.5 0 25 25");
    volumeIcon.setAttribute("fill", "none");
    volumeIcon.innerHTML = `
        <path d="M12.5493 .../>
      `;

    // We're selecting an HTML element where we'll display the current volume value.
    const display = document.querySelector("span.display");


    //* Caching the Timeout ID: Store the timeout ID in a static property handleVolume.timeoutId or (using closure)
    //* to avoid potential issues with multiple timers running concurrently.
    //*  This ensures that any previous timeout is cleared before setting a new one.
    function handleVolume() {
     video.volume = this.value;

    // Displaying the volume percentage with svg icon .
     const displayText = `%${(this.value * 100).toFixed(0)}`;
     display.innerHTML = displayText;
     display.append(volumeIcon);
     display.classList.add("show");

     // Clearing any previous timeout and setting a new one to hide the display after 2 seconds.
     clearTimeout(handleVolume.timeoutId);
     handleVolume.timeoutId = setTimeout(() => {
      display.classList.remove("show");
     }, 2000);
    }
    // Initializing the timeout ID to null to keep track of the timeout.
    handleVolume.timeoutId = null;


    volume.addEventListener("change", handleVolume);  // When the user interacts with the volume slider.
    volume.addEventListener("mousemove", handleVolume);  // When the user moves the mouse over the volume slider.
```

### 5. Playback Speed Control

- Users can modify the video's playback speed using a slider control.
- The `handlePlaybackRate` function updates the video's `playbackRate` property and displays the current playback speed as a numerical value.

```js
    const playbackRate = document.querySelector("[name=playbackRate]");

    // Creating an SVG icon for the volume control.
    const speedIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    speedIcon.setAttribute("width", "60px");
    speedIcon.setAttribute("height", "100%");
    speedIcon.setAttribute("viewBox", "0 0 24 24");
    speedIcon.setAttribute("fill", "none");
    speedIcon.innerHTML = `
       <path d="M11.3122 .../>
     `;


    //*Caching the Timeout ID: Store the timeout ID in a static property handlePlaybackRate.timeoutId or (using closure)
    //* to avoid potential issues with multiple timers running concurrently.
    //*  This ensures that any previous timeout is cleared before setting a new one.
    function handlePlaybackRate() {
      video.playbackRate = this.value;
      // Displaying the playback rate  with svg icon .
      const displayText = `${video.playbackRate}`;
      display.innerHTML = displayText;
      display.append(speedIcon);
      display.classList.add("show");

       // Clearing any previous timeout and setting a new one to hide the display after 2 seconds.
      clearTimeout(handlePlaybackRate.timeoutId);
      handlePlaybackRate.timeoutId = setTimeout(() => {
       display.classList.remove("show");
      }, 2000);
    }
    // Initializing the timeout ID to null to keep track of the timeout.
    handlePlaybackRate.timeoutId = null;

    playbackRate.addEventListener("change", handlePlaybackRate);
    playbackRate.addEventListener("mousemove", handlePlaybackRate);
```

## What I Added/Fixed

- **My own style**
- **Custom Volume Icon**: Created a custom volume icon using SVG to visualize the volume level more intuitively.
- **Custom Playback Speed Icon**: Designed a custom playback speed icon using SVG to provide a visual representation of the playback speed.

## What I Learned


- **Timeout Management**: I gained experience in managing timeouts to control the display duration of volume and playback speed information.
- **Video Object and Media Events**:  manipulating the video object and utilizing media events such as `timeupdate` to create dynamic progress bars .
