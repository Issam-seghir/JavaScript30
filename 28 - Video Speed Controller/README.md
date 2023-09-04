# Custom Video Speed Controller

<div class="video-container">
  <video controls autoplay>
    <source src="./assets/video/showcase.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

This code example demonstrates a video playback speed controller that allows users to adjust the playback speed of a video by interacting with a speed bar. The code combines event handling and CSS transitions to create a smooth and interactive user experience.

Let's explore how I **achieved** this and what I **added/fixed** to enhance the functionality.


## Table of Contents

- [Custom Video Speed Controller](#custom-video-speed-controller)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How It Works](#how-it-works)
    - [1. Event Listeners Setup](#1-event-listeners-setup)
    - [2. Handling Speed Adjustment](#2-handling-speed-adjustment)
    - [3. Handling Transition Effect](#3-handling-transition-effect)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

- **Interactive Speed Control**: Users can click and drag on the vertical bar to adjust the playback speed of the video.

- **Visual Feedback**: The vertical bar displays the selected playback speed as a numerical value (e.g., "1.50x") and visually highlights the selected speed when hovered over.

## How It Works

### 1. Event Listeners Setup

- The code starts by selecting the video element and various speed-related elements such as `speedBar` (the container for adjusting speed) and `speedText` (the displayed speed percentage).
- Two event handler functions, `increaseSpeed` and `transitioned`, are defined to handle user interactions and **transition** effects.
- Event listeners are set up for `mousemove`, `mousedown`, and `mouseenter` events on the `speedBar` element.

```js
    const video = document.querySelector("video");
    const speedBar = document.querySelector(".speed");
    const speedText = document.querySelector(".speed-bar");

    function increaseSpeed(e) {...}
    function transitioned(e) {...}

    speedBar.addEventListener("mousemove", increaseSpeed);
    speedBar.addEventListener("mousedown", increaseSpeed);
    speedBar.addEventListener("mouseenter", transitioned);
```

### 2. Handling Speed Adjustment

- The `increaseSpeed` function calculates the new **playback** **speed** based on the vertical position of the mouse within the `speedBar`. It also calculates the percentage of the mouse position relative to the height of the `speedBar`.
- The video's `playbackRate` property is updated with the calculated speed, and the displayed speed text is updated accordingly.
- The `speedText` element's height is adjusted to reflect the percentage.
- This function prevents the default behavior of the `mousedown` event to prevent text selection.

```js
    function increaseSpeed(e) {
      e.preventDefault();
      // Calculate the new playback speed based on the vertical position of the mouse
      const speed = ((e.offsetY / speedBar.offsetHeight) *4).toFixed(2);
      // Calculate the percentage of the mouse position relative to the speed bar height
      const parentage = ((e.offsetY* 100) / speedBar.offsetHeight).toFixed(2);

      // Set the video's playback speed to the calculated value
      video.playbackRate = speed;

      // Update the displayed speed text and adjust its height
      speedText.textContent = `${speed}⚡`;
      speedText.style.height = `${parentage}%`;
    }

    speedBar.addEventListener("mousemove", increaseSpeed);
    speedBar.addEventListener("mousedown", increaseSpeed);
```

### 3. Handling Transition Effect

- The `transitioned` function adds a CSS class, `transition`, to the `speedText` element to create a transition effect.
- A timeout is set to remove the `transition` class after a delay, creating a smooth visual effect when the speed text appears and disappears.
- The timeout is cleared and reset each time the `transitioned` function is called, ensuring that it only removes the class after the specified delay.

```js
    // Function to handle the transition effect when the speed bar is hovered over
    function transitioned(e) {
      speedText.classList.add("transition");

      // Clear any previous timeout and set a new one to remove the class after a delay
      clearTimeout(speedText.timeoutId);

      transitioned.timeoutId = setTimeout(() => {
       speedText.classList.remove("transition");
      }, 150);
      console.log(speedText.style);
    }
    // Initialize a timeout ID for the transitioned function
    transitioned.timeoutId = null;

    speedBar.addEventListener("mouseenter", transitioned);
```

## What I Added/Fixed

- **My own style**

## What I Learned

- **Create Custom Video Speed Controller**
- **CSS Transitions**: Utilized CSS transitions to create smooth visual effects when displaying and hiding the speed text.
- **Timeout Usage**: Cleared and reset timeouts to control the duration of the transition effect.
