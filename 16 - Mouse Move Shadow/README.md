# Dynamic Text Shadow Effect

<div class="video-container">
  <video controls >
    <source src="./assets/video/showcase.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

In this project I Add an engaging and interactive text shadow animation . As the user moves their mouse over the designated element, the text shadow of the header adjusts dynamically, creating an eye-catching visual effect.

Let's delve into the code and understand how I **achieved** this and what I **added/fixed** from the original solution.

## Table of Contents

- [Dynamic Text Shadow Effect](#dynamic-text-shadow-effect)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How It Works](#how-it-works)
    - [1. Mousemove Event](#1-mousemove-event)
    - [2. Calculating Shadow Values](#2-calculating-shadow-values)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

- **Interactive Animation**: Enhance user experience by creating a captivating animation that responds to mouse movement.

## How It Works

### 1. Mousemove Event

The heart of this project  lies in the `mousemove` event listener attached to the `hero` element. Whenever the user moves their mouse within the `hero` area, the `shadowAnimation` function is triggered. This function calculates the shadow offsets based on the mouse position and applies the resulting values to the text's `textShadow` CSS property.

```javascript
    function shadowAnimation(e) {
      ...
    }

    hero.addEventListener("mousemove", shadowAnimation);
```

### 2. Calculating Shadow Values

The `shadowAnimation` function calculates the `xWalk` and `yWalk` values, which determine the **horizontal** and **vertical** shadow **offsets**, respectively. These values are proportional to the mouse's position within the `hero` element. The calculated **offsets** are then used to create the dynamic and visually appealing text shadow effect.

```js
    const hero = document.querySelector(".hero");
    const text = document.querySelector(".hero h1");
    const walk = 500; // 500px

    function shadowAnimation(e) {
      // Calculate mouse position within the hero element
      let [x, y] = [e.offsetX, e.offsetY];

      // Adjust mouse position based on target offset if necessary
      if (this !== e.target) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
      }

      // Calculate shadow offsets based on mouse position
      const xWalk = Math.round((x / this.offsetWidth *walk) - (walk / 2));
      const yWalk = Math.round((y / this.offsetHeight* walk) - (walk / 2));

      // Apply calculated shadow values to text
      text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgb(255, 127, 217),
        ${xWalk * -1}px ${yWalk}px 0 rgb(255, 246, 167),
        ${yWalk}px ${xWalk * -1}px 0 rgb(131, 255, 162),
        ${yWalk * -1}px ${xWalk}px 0 rgb(136, 231, 255)
      `;
    }
```

## What I Added/Fixed

- **MyOwn Style (Custom Colors)**: I added a customized array of shadow colors, creating a unique and visually striking effect.

## What I Learned

- **Position Calculation**: I discovered techniques for calculating proportional values based on element dimensions and mouse position.
