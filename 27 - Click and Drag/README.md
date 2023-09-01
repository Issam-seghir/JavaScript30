
# Horizontal Slider Click & Drag

![Alt text](assets/image/showcase.gif)
This code example demonstrates how to create a horizontal slider that allows users to **click**, **drag**, and **scroll** through a list of items. The implementation relies on JavaScript event listeners to capture and respond to mouse events.

Let's explore how I **achieved** this and what I **added/fixed** to enhance the functionality.

## Table of Contents

- [Horizontal Slider Click \& Drag](#horizontal-slider-click--drag)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How It Works](#how-it-works)
    - [1. Tracking Mouse State](#1-tracking-mouse-state)
    - [2. Handling Mouse Movements](#2-handling-mouse-movements)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

- **Click and Drag Interaction**: Users can click and drag the slider to scroll through the list of items smoothly.
- **Smooth Scrolling Effect**: The code creates a smooth scrolling effect, enhancing the user experience when navigating through items.

## How It Works

### 1. Tracking Mouse State

- Two boolean variables, `isDown` and `startX`, are used to track the state of mouse events.
  - `isDown` indicates whether the mouse button is currently pressed (initially set to `false`).
  - `startX` stores the initial horizontal mouse position when the mouse button is clicked.
  - `scrollLeft` Stores the initial horizontal scroll position of the slider.

```js
    const slider = document.querySelector(".items");
    // Initialize boolean variables to track the state of mouse events.
    let isDown = false; // Indicates if the mouse button is currently pressed.
    let startX; // Stores the initial horizontal mouse position on mouse click.
    let scrollLeft; // Stores the initial horizontal scroll position of the slider.

    slider.addEventListener("mousedown", (e) => {...});
    slider.addEventListener("mouseleave", (e) => {...});
    slider.addEventListener("mouseup", (e) => {...});
    slider.addEventListener("mousemove", (e) => {...});
```

### 2. Handling Mouse Movements

- When the mouse button is pressed (`mousedown` event), the `isDown` variable is set to `true`, indicating that the mouse button is currently held.
- The `active` class is added to the `.items` element to provide a visual indication that the slider is active.
- The initial horizontal mouse position relative to the `.items` element and the initial horizontal scroll position of the slider are stored.
- When the mouse leaves the slider (`mouseleave` event) or the mouse button is released (`mouseup` event), the `isDown` variable is set to `false`, and the `active` class is removed.
- During mouse movement (`mousemove` event), the code checks if the mouse button is pressed (`isDown` is `true`).
  - If the button is not pressed, the function exits early.
  - If the button is pressed, the default behavior of the `mousemove` event (e.g., text selection) is prevented.
  - The new horizontal mouse position relative to the `.items` element is calculated (`x`).
  - The distance to scroll is calculated by subtracting the initial position (`startX`) from the new position (`x`) and multiplying it by a factor (`3` in this example) to control the scrolling speed.
  - The new horizontal scroll position of the `.items` element is updated based on the calculated value, creating a smooth scrolling effect.

```js
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");

      // Store the initial horizontal mouse position relative to the 'slider' element.
      startX = e.pageX - slider.offsetLeft;
      // Store the initial horizontal scroll position of the 'slider'.
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      // Check if the mouse button is not pressed; if true, exit the function.
      if (!isDown) return;

      // Prevent the default behavior of mousemove (e.g., text selection).
      e.preventDefault();
      // Calculate the new horizontal mouse position relative to the 'slider' element.
      const x = e.pageX - slider.offsetLeft;
      // Calculate the distance to scroll by subtracting the initial position from the new position.
      const walk = (x - startX) * 3;
      // Set the new horizontal scroll position of the 'slider' based on the calculated value.
      slider.scrollLeft = scrollLeft - walk;
    });
```

## What I Added/Fixed

- **My own style**

## What I Learned

- **Mouse Event Handling**: Understanding how to capture and respond to mouse events is crucial for creating interactive web elements like sliders.
- **Mouse State Tracking**: The use of boolean variables to track the state of mouse events simplifies logic for interactive elements.
- **Horizontal Scrolling**: Implementing horizontal scrolling by updating the scroll position of an element.
