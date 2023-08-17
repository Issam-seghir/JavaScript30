
# Clock with Ticking Sound Effects

In this exercise, I created a **dynamic** **clock** with rotating clock hands and an accompanying **ticking** **sound** **effect**.
The **clock** displays the current time and provides an immersive audio-visual experience.
Let's delve into the code and understand how I **achieved** this and what i **add/fix** from the original solution.

## Table of Contents

- [Clock with Ticking Sound Effects](#clock-with-ticking-sound-effects)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How I Made It Happen](#how-i-made-it-happen)
    - [1.Positioning Clock Numbers Dynamically](#1positioning-clock-numbers-dynamically)
    - [2.Dynamic Clock  and Display](#2dynamic-clock--and-display)
    - [3.Ticking Sound Effect](#3ticking-sound-effect)
  - [What I Added or Fixed Compared to the Original Solution](#what-i-added-or-fixed-compared-to-the-original-solution)
  - [The challenges I faced](#the-challenges-i-faced)
    - [Overcoming Audio Repetition Challenges](#overcoming-audio-repetition-challenges)
      - [Initial Approach: Using Intervals for Audio Repetition](#initial-approach-using-intervals-for-audio-repetition)
      - [Unveiling the Root Cause: `NaN` and Audio Duration Availability](#unveiling-the-root-cause-nan-and-audio-duration-availability)
        - [Solution 1: Utilizing the `loadedmetadata` Event](#solution-1-utilizing-the-loadedmetadata-event)
      - [Solution 2: Leveraging the `ended` Event](#solution-2-leveraging-the-ended-event)
  - [What I Learned](#what-i-learned)

## Features

Certainly! Here are the features of the code for the clock with ticking sound effects:

1. **Clock Display**: The code creates a digital clock display that shows the current time with hours, minutes, and seconds.

2. **Clock Hands Animation**: The clock includes animated clock hands (hour, minute, and second) that move in real-time to indicate the current time.

3. **Number Positioning**: Numeric hour markers are positioned around the clock face using trigonometry, enhancing the visual appeal of the clock.

4. **12-Hour Format**: The clock supports a 12-hour time format, with the hour hand adjusted accordingly.

5. **Realistic Ticking Sound**: The code plays a ticking sound effect that simulates the sound of a traditional clock ticking.

6. **Regular Updates**: The clock display and sound are updated every second, reflecting the real-time passage of time.

7. **Enhanced User Experience**: The combination of visual animations and audio effects enhances the user experience, making the clock feel dynamic and realistic.

## How I Made It Happen

### 1.Positioning Clock Numbers Dynamically

- I first select all the number elements from the **HTML** representing the numeric hour markers on the clock face.

    ```js
        // Get all number elements
        const numbers = document.querySelectorAll(".number");
    ```

- Then I create a function `calculateNumberPosition()` to position each number **dynamically** around the **clock** **face** using **trigonometry**.
- The function **calculates** the `X` and `Y` coordinates based on the number's **index** and total count of numbers.
- This ensures that the numbers form a circular shape on the **clock** **face**, adapting to changes in **clock** **width**.

    ```js
        // Function to calculate the position of numbers around the clock face
        function calculateNumberPosition(numberIndex, totalNumbers) {
          const angle = (360 / totalNumbers) * numberIndex;
          const radius = 15; // Adjust the radius to position the numbers closer or farther from the center
          const centerX = 16; // X-coordinate of the center of the clock
          const centerY = 16; // Y-coordinate of the center of the clock

          // Calculate the X and Y coordinates based on the angle and radius
          const x = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));

          return { x, y };
        }

    ```

- I iterate through each number element and apply the calculated **position** on the `style.left` and `style.top` properties.
- This arrangement results in a visually appealing **clock** **face** with positioned numbers.

    ```js
       // Position each number around the clock face using trigonometry
    numbers.forEach((number, index) => {
      const position = calculateNumberPosition(index + 1, numbers.length);
      number.style.left = position.x + "rem";
      number.style.top = position.y + "rem";
    });
    ```

### 2.Dynamic Clock  and Display

- I define the `updateClock()` function to dynamically update the clock's appearance and display.
  - Acquire the current time elements using the `new Date()` object. Employ `getMinutes()`, `getSeconds()`, and `getHours()` to obtain minutes, seconds, and hours, respectively.
  - Convert the present hour to a **12-hour** format via `(currentHour % 12) || 12`.
  - Revise the **clock hands' positions** (hourHand, minuteHand, and secondHand) through the `style.transform` property.
  - Update the clock elements' text content (hourSpan, minuteSpan, and secondSpan) with the current time details. Use `padStart(2, '0')` to guarantee **single-digit** values are formatted with leading zeros.

    ```js
        function updateClock() {
          // Select the clock hands and elements that display hours, minutes, and seconds
          const minuteHand = document.querySelector('.min-hand');
          const secondHand = document.querySelector('.second-hand');
          const hourHand = document.querySelector('.hour-hand');
          // Get the current time components: minutes, seconds, and hours
          let currentMinute = new Date().getMinutes();
          let currentSeconds = new Date().getSeconds();
          let currentHour = new Date().getHours();
          currentHour = (currentHour % 12) || 12; // Convert to 12-hour format


          // Update the position of the hours hand
          hourHand.style.transform = `rotate(${currentHour * (360 / 12) + currentMinute / 2 + 90}deg)`;

          // Update the position of the minute hand
          minuteHand.style.transform = `rotate(${currentMinute * (360 / 60) + 90}deg)`;

          // Update the position of the second hand
          secondHand.style.transform = `rotate(${currentSeconds * (360 / 60) + 90}deg)`;

          // Update the text content of display span
          const hourSpan = document.querySelector('.hour');
          const minuteSpan = document.querySelector('.minute');
          const secondSpan = document.querySelector('.second');

          const hours = currentHour.toString().padStart(2, '0');
          const minutes = currentMinute.toString().padStart(2, '0');
          const seconds = currentSeconds.toString().padStart(2, '0');

          hourSpan.textContent = hours;
          minuteSpan.textContent = minutes;
          secondSpan.textContent = seconds;

        }
    ```

- I set up an **event** **handler** to call `updateClock()` when the **window** **loads**.
- This initializes the **clock**'s **appearance** and **display**.
- Additionally, I call the `clockSound()` function to play the initial **tick** **sound** and ensure the sound **replays** when it ends.
- The `updateClock()` function is also scheduled to run every second (**1000** **milliseconds**) to maintain the real-time **display** of the clock.

    ```js
        // Call the clockSound function initially when the window loads
        window.onload = function () {
          updateClock();

          // Play sound initially
          clockSound();

          // Play sound again when the audio ends
          audio.addEventListener('ended', clockSound);

          // Update clock every second
          setInterval(updateClock, 1000);
        };
    ```

### 3.Ticking Sound Effect

```js
    const audio = document.querySelector("audio");

    // Function to play the clock sound
    function clockSound() {
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }

```


## What I Added or Fixed Compared to the Original Solution

1. **My Own style**


1. **Dynamic Number Positioning:**

   I introduced a dynamic approach to position the clock numbers around the clock face.
   By calculating the position of each number based on trigonometric calculations, the numbers are evenly distributed in a circular manner.
   This ensures that the clock numbers adapt to changes in clock size, providing a more realistic and visually appealing clock face.

2. **Enhanced Time Display:**

   Compared to the original solution, I improved the time display by incorporating zero-padding for single-digit hours, minutes, and seconds.
   This ensures a consistent and visually appealing format for displaying the time on the clock.

3. **Ticking Sound Effect:**

   I added a ticking sound effect to enhance the realism of the clock.
   The clock now produces a ticking sound every second, simulating the experience of a traditional analog clock.

4. **Window Load Event Handling:**

   I utilized the `window.onload` event to ensure that the clock display and ticking sound are initiated once the window and its contents are fully loaded.
   This prevents any potential issues that might arise from trying to manipulate elements before they are ready.


## The challenges I faced

### Overcoming Audio Repetition Challenges

- Throughout the solving of this exercice, I encountered challenges while attempting to seamlessly **repeat** **the** **audio** **sound** when it finishes playing.
- This section outlines the **issues** I faced and the **solutions** I explored to ensure a smooth and immersive user experience.

#### Initial Approach: Using Intervals for Audio Repetition

- My initial strategy was to employ the `setInterval` function to trigger the `clockSound` function at specific intervals, including every 30 seconds and based on the calculated audio duration.
- However, I encountered unexpected behavior where the audio became **glitchy** and **failed** to play correctly.
- Moreover, I observed that the `timer` variable, which I intended to use for interval timing, was yielding a `NaN` (Not a Number) value.

#### Unveiling the Root Cause: `NaN` and Audio Duration Availability

- The root cause of the `NaN` issue stemmed from the `audio` element's `duration` property, which didn't immediately provide the expected value.
- JavaScript's `duration` property returns the length of the audio in seconds, but it requires a moment to become available after loading the audio element.
- This delay caused the `timer` calculation to result in `NaN`, preventing the intended audio repetition intervals.

```javascript
    window.onload = function () {
      clockSound();
      updateClock();

      // Call the updateClock function every second (1000 milliseconds)
      setInterval(updateClock, 1000);

      // Call the clockSound function every 30 seconds
      setInterval(clockSound, 30000);

      // Calculate the duration of the audio and play it at intervals
      const audio = document.querySelector("audio");
      if (audio) {
        const audioDuration = Math.round(audio.duration) * 1000;
        // Warning 💢 : audioDuration is NaN
        setInterval(clockSound, audioDuration);
      }
    };
```


##### Solution 1: Utilizing the `loadedmetadata` Event

- One solution I explored was utilizing the `loadedmetadata` event of the `audio` element.
- By attaching an event listener to this event, I ensured that the `duration` property would be accurately populated before attempting to calculate the `timer` value.
-  Once the `timer` was calculated, I successfully set up an interval for the `clockSound` function, resulting in the desired audio repetition behavior.

Here's a snippet of how I implemented this solution:

```javascript
const audio = document.querySelector("audio");
let timer = 0;

if (audio) {
  audio.addEventListener("loadedmetadata", () => {
    timer = Math.round(audio.duration) * 1000;
    console.log(timer);

    // Set up the interval for clock sound
    setInterval(clockSound, timer);
  });

  // Start the clock sound initially
  clockSound();
}
```

#### Solution 2: Leveraging the `ended` Event

- Upon further exploration of the `audio` element's properties, I discovered the `ended` event.
- This event is triggered when the audio playback reaches its end.
- Leveraging this event, I was able to elegantly ensure that the clock sound would play again each time the audio concluded.
- This approach proved to be more streamlined and simplified, achieving the desired result without relying on complex interval calculations.

Ultimately, I opted for the **second** **solution**, as it provided a **more** **elegant** and **efficient** way to achieve the desired audio repetition behavior.
By attaching the `ended` event listener to the `audio` element, I ensured that the clock sound would play seamlessly and rhythmically, harmonizing with the overall clock experience.

```js
    // Call the clockSound function initially when the window loads
    window.onload = function () {
      updateClock();

      // Play sound initially
      clockSound();

      // Play sound again when the audio ends
      audio.addEventListener('ended', clockSound);

      // Update clock every second
      setInterval(updateClock, 1000);
    };
```


## What I Learned

- The exploration of events in JavaScript, such as the `loadedmetadata` and `ended` events of the `audio` element, was instrumental in overcoming challenges related to audio repetition.
- **Handling Asynchronous Operations** : Encountering the issue of the `NaN` value when calculating the audio duration exposed me to the concept of asynchronous operations in JavaScript. I learned that certain properties, like the `duration` of an `audio` element, may not be immediately available upon element creation. Employing techniques such as event listeners and callbacks enabled me to handle asynchronous scenarios effectively.
- Developing a clock that updates in real time required a deeper understanding of date and time manipulation.
