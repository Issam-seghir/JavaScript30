
# Sticky Navigation Effect

<div class="video-container">
  <video controls autoplay>
    <source src="./assets/video/showcase.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

This project demonstrates how to implement a sticky navigation effect using JavaScript and CSS. The navigation bar sticks to the top of the page when the user scrolls down, providing easy access to navigation options even as the content scrolls.

Let's explore how I **achieved** this and what I **added/fixed** to enhance the functionality.

## Table of Contents

- [Sticky Navigation Effect](#sticky-navigation-effect)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How It Works](#how-it-works)
    - [1. Detecting Scroll Position](#1-detecting-scroll-position)
    - [2. Adding and Removing the Sticky Class](#2-adding-and-removing-the-sticky-class)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

- **Sticky Navigation**: The navigation bar sticks to the top of the page as the user scrolls down.
- **Smooth User Experience**: Provides easy access to navigation options at all times without excessive scrolling.

## How It Works

### 1. Detecting Scroll Position

- The initial top offset of the navigation element is stored in the variable `originalTopOffset`.
- The `stickyNav()` function is responsible for determining whether the navigation should become sticky based on the user's scroll position.

const nav = document.querySelector("nav");

```js
    const nav = document.querySelector("nav");
    // Store the initial top offset of the navigation element
    let originalTopOffset = nav.offsetTop;
    function stickyNav() {
    // Check if the vertical scroll position has passed the original top offset
    if (window.scrollY >= originalTopOffset) {
      ...
    }
    }
```

### 2. Adding and Removing the Sticky Class

- When the user scrolls down, the `stickyNav()` function checks if the vertical scroll position (`window.scrollY`) is greater than or equal to the original **top** **offset**. If true, the `"sticky"` class is added to the navigation (`nav`) element using `nav.classList.add("sticky")`. This class contains CSS rules to make the navigation sticky.

- When the navigation becomes sticky, the body's padding is adjusted using `document.body.style.paddingTop`. This ensures that the body's content doesn't jump up when the navigation becomes sticky.

```js
    const nav = document.querySelector("nav");

    // Store the initial top offset of the navigation element
    let originalTopOffset = nav.offsetTop;

    function stickyNav() {
     // Check if the vertical scroll position has passed the original top offset
     if (window.scrollY >= originalTopOffset) {
      nav.classList.add("sticky");
      // Adjust the body's padding to accommodate the sticky navigation
      document.body.style.paddingTop = `${nav.offsetHeight}px`;
     } else {
      nav.classList.remove("sticky");
      // Reset the body's padding
      document.body.style.paddingTop = 0;
     }
    }

    window.addEventListener("scroll", stickyNav);
```

## What I Added/Fixed

- **My own style**

## What I Learned

- **Sticky Positioning**: Explored how to create a sticky navigation effect using CSS and JavaScript.
- **Scroll Position Tracking**: Used the `window.scrollY` property to track the vertical scroll position.
- **User Experience Enhancement**: Improved the user experience by ensuring that navigation options remain accessible while scrolling through content.
