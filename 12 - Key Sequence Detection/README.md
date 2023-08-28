# Key Sequence Detection

![Background Image](assets/image/background.png)

In this coding exercise, I've implemented a JavaScript program that detects specific sequences of keystrokes, allowing for unique interactions and experiences. By comparing entered sequences against a predefined secret code, this project demonstrates a practical application of keyboard input detection.

## Table of Contents

- [Key Sequence Detection](#key-sequence-detection)
  - [Table of Contents](#table-of-contents)
  - [How I Made This Happen](#how-i-made-this-happen)
    - [1. Listening for Key Presses](#1-listening-for-key-presses)
    - [2. Matching Secret Code](#2-matching-secret-code)

## How I Made This Happen

### 1. Listening for Key Presses

To begin, the program listens for `keyup` events on the window, which occur whenever a key is released after being pressed. This event-driven approach enables the program to react in real-time to the user's keyboard input.

```javascript
    window.addEventListener("keyup", (event) => {
      // Key press handling goes here
    });
```

### 2. Matching Secret Code

The core functionality of this program revolves around matching a secret code entered by the user. To achieve this, the program maintains an array named `pressed`, which is used to track the sequence of keys pressed by the user. Additionally, a predefined secret code is established that serves as the target pattern to be matched.

As the user presses and releases keys on their keyboard, the program listens for `keyup` events. Upon detecting a key press, the following steps take place:

1. **Recording Key Presses**: The pressed key is logged in the console to provide real-time feedback to the developer.

```javascript
    // Log the key pressed in the console
    console.log(e.key);
```

2. **Storing Key Sequence**: The pressed key is added to the `pressed` array. This array accumulates the sequence of keys entered by the user.

```javascript
    // Add the pressed key to the 'pressed' array
    pressed.push(e.key);
```

3. **Matching Secret Code**: To check if the user's entered sequence matches the secret code, the program performs a series of comparisons. It ensures that the length of the `pressed` array does not exceed the length of the secret code. If it does, the earliest entries are removed from the array.

```javascript
  // Ensure the 'pressed' array length matches the length of the secret code
  // Remove the earliest entries if the array length exceeds the secret code length
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
```

4. **Validation and Reward**: The program verifies if the current content of the `pressed` array matches the secret code. If there's a match, it triggers a success action. In this case, a success message is displayed to the user, indicating the successful unlocking of the secret code. Additionally, a playful visual effect (virtual confetti) is added for a delightful user experience.

```javascript
    const userKeys = document.querySelector(".user-keys");
    const message = document.querySelector(".message");
    // Check if the current 'pressed' array contains the complete secret code
    if (pressed.join("").includes(secretCode)) {
        // Display a success message
        console.log("DING DING!");
        message.innerHTML = `Congratulations, you've unlocked the secret 🏆! ...`;
        cornify_add(); // Add virtual confetti effect
    }
```

5. **User Feedback**: To provide further feedback to the user, the program displays the current sequence of keys entered by the user both in the console and on the webpage.

```javascript
// Display the contents of the 'pressed' array in the console
console.log(pressed);
// Update the HTML to show the entered sequence
userKeys.innerHTML = pressed.join("");
```

In essence, this section of the code orchestrates the process of capturing user input, comparing it to a secret code, and rewarding the user with a celebratory message when the code is successfully matched. The interplay of these steps creates an engaging and interactive experience for users.

```javascript
    const pressed = [];
    const secretCode = "python";

    window.addEventListener("keyup", (e) => {
        // print the key in consol
        console.log(e.key);
        // add the key pressed to the array
        pressed.push(e.key);
        // Ensure the 'pressed' array length matches the length of the secret code.
        // If the array length exceeds the secret code length, remove the earliest entries.
        pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
        // Check if the current 'pressed' array contains the complete secret code.
        if (pressed.join("").includes(secretCode)) {
         // Display a success message
         console.log("DING DING!");
         message.innerHTML = `Congratulations, you've unlocked the secret 🏆! ...`;
         cornify_add();
        }
        // Display the contents of the 'pressed' array
        console.log(pressed);
        userKeys.innerHTML = pressed.join("");
       });
```
