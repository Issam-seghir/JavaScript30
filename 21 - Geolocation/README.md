# Real-Time Speed and Heading Tracker

![gif](assets/images/showcase.png)

This project demonstrates how to create a real-time speed and heading tracker using the browser's **Geolocation API.** By accessing the device's location data, this application displays the current speed and heading (direction) of the device on the screen.

Let's explore how I **achieved** this and what I **added/fixed** to enhance the functionality.

> if you already setup **https** , you can use the same link generated from `http-server` in your mobile phone , if not , use [browser-sync](https://browsersync.io/) instead  to setup a **local server** and use the external link in mobile .

## Table of Contents

- [Real-Time Speed and Heading Tracker](#real-time-speed-and-heading-tracker)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How I Made This Happen](#how-i-made-this-happen)
    - [Geolocation API Usage](#geolocation-api-usage)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

- **Real-Time Speed Display**: Displays the current speed of the device as it moves.
- **Dynamic Heading Indicator**: Rotates an arrow icon to indicate the current heading (direction) of the device.

## How I Made This Happen

### Geolocation API Usage

The code utilizes the `navigator.geolocation.watchPosition()` method to continuously track the device's position. This method takes two callback functions: one for successful position tracking and another for handling errors.

- **Successful Position Tracking**: When the API successfully tracks the device's position, the provided `data` object contains information about the device's coordinates, including `speed` and `heading` (direction). The code updates the content of the `.speed-value` element with the current speed and rotates the `.arrow` element to match the heading angle using the `rotate` CSS transformation.

- **Error Handling**: If the geolocation tracking encounters an error, the provided `error` object contains details about the error. The code logs the error to the console using `console.error()`.

```js
   const arrow = document.querySelector(".arrow");
   const speed = document.querySelector(".speed-value");

   navigator.geolocation.watchPosition(
    (data) => {
     if (data) {
      speed.textContent = data.coords.speed;
      arrow.style.transform = `rotate(${data.coords.heading}deg)`;
     }
    },
    (error) => {
     console.error(error);
    }
   );
```

## What I Added/Fixed

- **My Own Style**.

## What I Learned

- **Geolocation API**: Explored the Geolocation API to access the device's location data.
- **Error Handling**: Implemented error handling to gracefully handle potential geolocation tracking issues.
