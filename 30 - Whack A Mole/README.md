# Countdown Timer

<div class="video-container">
  <video controls  autoplay>
    <source src="assets/video/showcase.mp4" type="video/mp4" >
    Your browser does not support the video tag.
  </video>
</div>

This JavaScript code creates a countdown timer that allows users to set a custom time interval or choose predefined times to countdown from. It provides real-time updates on the remaining time and the expected end time.

Let's explore how I **achieved** this and what I **added/fixed** to enhance the functionality.

## Table of Contents

- [Countdown Timer](#countdown-timer)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How It Works](#how-it-works)
    - [1. Timer Function](#1-timer-function)
    - [2. Display Functions](#2-display-functions)
    - [3. Button Click Event](#3-button-click-event)
    - [4. Custom Form Submission Event](#4-custom-form-submission-event)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

1. Allows users to set a **custom countdown timer**.
2. Provides **predefined** **time intervals** for quick selection.
3. **Real-time updates** on remaining time and end time.
4. User-friendly interface with clear time displays.

## How It Works

### 1. Timer Function

- The `timer` function takes a `seconds` parameter, representing the countdown duration in seconds.
- Any existing countdown timer is cleared using `clearInterval(countdown)`.
- The target end time is calculated by adding the `seconds` to the current time.
- The initial time left and end time are displayed using the `displayTimeLeft` and `displayEndTime` functions.
- The countdown timer is started using `setInterval`. It updates the remaining time every second and stops when the countdown reaches zero.

```js

    // Initialize variables
    let countdown; // Stores the interval ID for the countdown timer
    const timerDisplay = document.querySelector(".display__time-left"); // Display element for remaining time
    const endTime = document.querySelector(".display__end-time"); // Display element for end time
    const buttons = document.querySelectorAll("[data-time]"); // Select all buttons with 'data-time' attribute

    // Function to start a countdown timer
    function timer(seconds) {
      // Clear any existing timers
      clearInterval(countdown);

      // Calculate the target end time
      const now = Date.now();
      const then = now + seconds * 1000;

      // Display initial time
      displayTimeLeft(seconds);
      displayEndTime(then);

      // Start the countdown timer
      countdown = setInterval(() => {
       const secondsLeft = Math.round((then - Date.now()) / 1000);

       // Check if we should stop the timer
       if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
       }

       // Display the remaining time
       displayTimeLeft(secondsLeft);
      }, 1000);
    }



```

### 2. Display Functions

- The `displayTimeLeft` function takes the remaining `seconds` and converts it into a readable format (e.g., "mm:ss").
- It updates the browser tab title and the displayed time.
- The `displayEndTime` function takes a `timestamp` and formats it as "Be Back At hh:mm AM/PM."
- It updates the displayed end time.

```js
    // Function to display the remaining time
    function displayTimeLeft(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
      document.title = display; // Update the browser tab title
      timerDisplay.textContent = display; // Update the displayed time
    }

    // Function to display the end time
    function displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const adjustedHour = hour > 12 ? hour - 12 : hour;
      const minutes = end.getMinutes();
      endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? "0" : ""}${minutes}`;
    }
```

### 3. Button Click Event

- Event listeners are added to all buttons with a `data-time` attribute. These buttons allow users to select predefined countdown times.
- When a button is clicked, the `startTimer` function is triggered.
- The `startTimer` function extracts the `data-time` attribute value (in seconds) from the clicked button and starts the countdown timer accordingly.

```js
    // Function to start a timer based on button click
    function startTimer() {
      const seconds = Number.parseInt(this.dataset.time);
      timer(seconds);
    }

    // Event listeners for button clicks
    buttons.forEach((button) => button.addEventListener("click", startTimer));
```

### 4. Custom Form Submission Event

- An event listener is added to a custom form named `customForm`.
- When the form is submitted, the event handler prevents the default form submission behavior.
- The form **input** value (representing minutes) is converted to seconds and used to start the **countdown** **timer**.
- The form is then `reset` to allow users to set another timer.

```js
    // Event listener for custom form submission
    document.customForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const mins = this.minutes.value;
      timer(mins * 60); // Convert minutes to seconds and start the timer
      this.reset(); // Reset the form
    });
```

## What I Added/Fixed

- **My own style**

## What I Learned

- **Interval Timers**: Utilized `setInterval` and `clearInterval` to create and manage countdown timers.
- **Date Manipulation**: Calculated target end times using the JavaScript `Date` object.
- **Event Handling**: Implemented event listeners for button clicks and form submissions.
