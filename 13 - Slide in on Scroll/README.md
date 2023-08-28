# Slide in on scroll

<div class="video-container">
  <video controls >
    <source src="./assets/video/showcase.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

In this project, I implemented an image viewer using the Intersection Observer API to detect when images are visible within the viewport. The image viewer applies a CSS class to images that are at least 50% visible, allowing for dynamic loading and visual effects when images become visible to the user.

Let's delve into the code and understand how I **achieved** this and what I **added/fixed** from the original solution.

## Table of Contents

- [Slide in on scroll](#slide-in-on-scroll)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How I Made This Happens](#how-i-made-this-happens)
    - [1. Observer Configuration](#1-observer-configuration)
    - [2. Creating the Intersection Observer](#2-creating-the-intersection-observer)
    - [3. Observing Images](#3-observing-images)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

- 1. **Dynamically Load Images**: Images load as users scroll, optimizing page loading times.
- 2. **Enhance Engagement**: Captivate users with visually appealing transitions as images slide into view.
- 3. **Instruction Observer API**: Utilize the powerful Intersection Observer API for scroll-based interactions.

## How I Made This Happens

### 1. Observer Configuration

- **Intersection Observer** is a JavaScript API that allows you to efficiently watch for changes in the intersection of a target element with its parent or the viewport. It's particularly useful for implementing lazy loading of images, infinite scrolling, and other scenarios where you need to track whether an element is visible in the viewport.

- The Intersection Observer API requires a configuration object that specifies how the observer should behave. The configuration includes:

- `root`: The root element to use as the viewport. If `null`, the entire viewport is used.
- `rootMargin`: Margin around the root element.
- `threshold`: The threshold at which the callback should be triggered. In this case, it triggers when at least **50%** of the element is visible

```js
    //  Observer configurations
    const options = {
     root: null, // Use the viewport as the root (defualt)
     rootMargin: "0px",// No margin applied to the root
     threshold: 0.5, // Trigger When at least 50% of the image is visible in the viewport
    };

    //  Creating the Intersection Observer
    const intersectionObserver = new IntersectionObserver(callback, options);
```

### 2. Creating the Intersection Observer

I created an instance of the Intersection Observer using the configuration object. This observer monitors the visibility of the images within the viewport.

```javascript
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Check if the observed element is intersecting with the viewport
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      console.log(`Image ${entry.target.src} is now active in the viewport.`);
    } else {
      entry.target.classList.remove("active");
    }
  });
}, options);
```

### 3. Observing Images

Finally, I used the Intersection Observer to observe each image element on the page. When an image becomes at least **50%** visible, the observer adds an `"active"` class to it, triggering the visual effect.

```javascript
const images = document.querySelectorAll("img");

images.forEach((image) => {
  intersectionObserver.observe(image);
});
```

## What I Added/Fixed

- **My own style**
- **Enhanced Performance**: By incorporating cutting-edge technology, specifically the **Intersection Observer API**, I optimized the project's performance. This modern approach offers advantages over traditional methods like `getBoundingClientRect`, and `scroll` events. The result is a more efficient and smoother experience for users interacting with the content.

## What I Learned

- **Leveraging the Intersection Observer API** for scroll-triggered interactions.
- **Enhancing the user experience** by deferring image loading until they are visible in the view port .
