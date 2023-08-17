# Customizable CSS Variables

![gif](https://i.imgur.com/HL01agb.gif)

In this exercise, I explored the use of **CSS variables** to create a dynamic and interactive styling experience for a web page.
By leveraging these variables, I enabled users to adjust visual aspects of the page in real-time.
Let's delve into the code and understand how I **achieved** this and what i **add/fix** from the original solution.

## Table of Contents

- [Customizable CSS Variables](#customizable-css-variables)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How I Made It Happen](#how-i-made-it-happen)
    - [1. Defining CSS Variables](#1-defining-css-variables)
    - [2. Handling User Input](#2-handling-user-input)
  - [What I Added or Fixed Compared to the Original Solution](#what-i-added-or-fixed-compared-to-the-original-solution)
  - [What I Learned](#what-i-learned)

## Features

Here are the key features of the customizable CSS variables code:

1. **Real-Time Styling**: The code utilizes CSS variables to allow users to adjust various styling properties in real-time, such as spacing, blur, and base color.

2. **Interactive Controls**: Users can interact with input controls to modify the values of the CSS variables and instantly see the changes applied to the page.

3. **Scrollbar Customization**: The scrollbar appearance is customized using CSS variables, enhancing the visual appeal of the scrolling experience.

4. **Box Shadow Effect**: An image on the page showcases a box shadow effect whose properties can be adjusted through CSS variables.

5. **Consistent Selected Text Styling**: Changing the color will change the color of the selected text too

## How I Made It Happen

### 1. Defining CSS Variables

- I started by defining CSS variables using the `:root` pseudo-class. These variables hold values for spacing, blur, and base color that can be customized.

```css
:root {
  --spacing: .2rem;
  --blur: .2rem;
  --base: yellow;
    overflow-y: scroll;
    scrollbar-color: var(--base) #0000009d;
    scrollbar-width: 5px;
}

/* change selected text color */
    ::selection {
      background-color: var(--base);
    }

    /* For Chrome and other browsers */
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #0000009d;
    }

    ::-webkit-scrollbar {
      width: 12px;
      background-color: #0000009d;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
      background-color: var(--base);
    }

```

### 2. Handling User Input

- I used JavaScript to handle user input and synchronize it with the CSS variables. I selected input elements and attached event listeners to track changes.

```js
    const inputs = document.querySelectorAll('input');
    const root = document.documentElement;

    function handleInput(event) {
      const { target } = event;
      const suffix = target.dataset.sizing || '';
      root.style.setProperty(`--${target.name}`, `${target.value}${suffix}`);
    }

    inputs.forEach(input => {
      input.addEventListener('input', handleInput);
    });
```

## What I Added or Fixed Compared to the Original Solution

1. **Enhanced Styling**: I introduced additional CSS variables to control **box shadow** effect and **selected text** / **accent** **color** / **colorful** **scrollbar**, allowing users to customize these aspects as well.

2. **Refined Interaction**: Compared to the original solution, I enhanced the interaction by synchronizing user input with the CSS variables in real-time, providing an immediate visual preview of the changes.

## What I Learned

- **CSS Variable Syntax**: I gained a deeper understanding of the syntax and usage of CSS variables, including their definition, application, and synchronization with JavaScript.
- **Real-Time Styling**: By synchronizing user input with CSS variables in real-time, I learned how to create an engaging and responsive user experience that fosters experimentation and creativity.
- **Event Handling**: Handling events such as `input` and `change` to update CSS variables underscored the importance of event-driven programming and its impact on user interaction.
- Benefit from data attribute ( `dataset`)
