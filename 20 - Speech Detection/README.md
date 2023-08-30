
# Speech Recognition Fun: Replacing Words with Emojis

![gif](assets/images/showcase.gif)

In this project, I created a fun web application that utilizes the browser's Speech Recognition API to convert spoken words into text and replace specific words with emoji representations. Users can speak into their device's microphone, and the application will transcribe the speech, replacing certain words with corresponding emojis.

Let's explore how I **achieved** this and what I **added/fixed** to enhance the functionality.

## Table of Contents

- [Speech Recognition Fun: Replacing Words with Emojis](#speech-recognition-fun-replacing-words-with-emojis)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How It Works](#how-it-works)
    - [1. Speech Recognition Setup](#1-speech-recognition-setup)
    - [2. Handling Speech Recognition Events](#2-handling-speech-recognition-events)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

- **Real-Time Speech-to-Text Conversion**: Converts spoken words into text in real time using the browser's Speech Recognition API.
- **Word Replacement with Emojis**: Replaces specific words with  emojis.

## How It Works

### 1. Speech Recognition Setup

The code starts by checking if the browser supports the Speech Recognition API and initializes a new `SpeechRecognition` instance. The instance's `interimResults` property is set to `true` to display interim results (partial transcriptions), and the desired language is set to "en-US."

```js
    // Check for SpeechRecognition support in the browser
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

    // Create a new SpeechRecognition instance
    const recognition = new SpeechRecognition();
    // Log the recognition object for debugging purposes
    console.log(recognition);

    // Configure SpeechRecognition settings
    recognition.interimResults = true; // Enable interim results while speaking
    recognition.lang = "en-US"; // Set the language to English (United States)
```

### 2. Handling Speech Recognition Events

The `recognition` instance listens for the `result` event, which is triggered when the API recognizes speech. The transcribed speech is extracted from the event's results and concatenated to form a continuous transcript. Certain words are replaced with the 💩 emoji using the `replaceAll` method.

A new paragraph element is created to display the transcribed text. If the current recognized speech is considered final (based on the `isFinal` property of the event results), a new paragraph element is added to the document to start a new line of transcribed text.

The `recognition` instance also listens for the `end` event, which is triggered when speech recognition stops. In response to this event, the `recognition` process is restarted using the `start` method, allowing continuous speech recognition.

```js
    // Create a paragraph element to display recognized speech
    let p = document.createElement("p");
    const words = document.querySelector(".words");
    words.append(p);

    // Event listener for the "result" event fired when speech is recognized
    recognition.addEventListener("result", (e) => {
     // Extract recognized speech from result objects and join them into a transcript
     const transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

     // Replace certain words with an emoji
     const poopScript = transcript.replaceAll(/poop|poo|shit|dump/gi, "💩");
     p.textContent = poopScript;

     // If the recognized speech is final, create a new paragraph for the next speech
     if (e.results[0].isFinal) {
      p = document.createElement("p");
      words.append(p);
     }
    });

    // Event listener for the "end" event fired when speech recognition ends
    recognition.addEventListener("end", recognition.start); // Restart speech recognition

    // Start the speech recognition process
    recognition.start();
```

## What I Added/Fixed

- **My Own Style**.

## What I Learned

- **Speech Recognition API**: Explored the browser's Speech Recognition API to convert spoken language into text.
- **Event Handling**: Learned to handle events such as `result` and `end` to perform actions based on speech recognition outcomes.
