# Interactive To-Do List (Local storage)

![gif]("./../assets/image/showcase.gif)
In this project, I developed an interactive to-do list application that allows users to add items, mark them as done, and store their status in local storage.

## Table of Contents

- [Interactive To-Do List (Local storage)](#interactive-to-do-list-local-storage)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How I Made This Happens](#how-i-made-this-happens)
    - [1. Adding Items](#1-adding-items)
    - [2. Filling the List](#2-filling-the-list)
    - [3. Toggling Item Status](#3-toggling-item-status)
    - [4. Initializing the Local Storage](#4-initializing-the-local-storage)
  - [What I Added/Fixed](#what-i-addedfixed)
  - [What I Learned](#what-i-learned)

## Features

  1. **Add Items**: Users can input new tasks and add them to the to-do list.
  2. **Check and Uncheck**: Items can be marked as done or undone with a simple click.
  3. **Persistent Data**: The application stores the to-do list's status in local storage, preserving the data between sessions.

## How I Made This Happens

### 1. Adding Items

To allow users to add items, I implemented the `addItemsToList` function. When the user submits the form, this function extracts the input text, creates a new item object, and appends it to the list of items. The list of items is then saved to local storage as a JSON string.

```js
   const addItems = document.querySelector(".add-items");
   const itemsList = document.querySelector(".plates");

   // parse : convert  json to array of objects
   const items = JSON.parse(localStorage.getItem("items")) || [];


    function addItemsToList(e) {
        // Prevent the default form submission behavior
       e.preventDefault();

       // Get the value of the input field
       const text = e.target[0].value;
       const item = {
        text: text,
        checkState: false,
       };
       items.push(item);

      // stringify : add "items" to local storage as  a JSON string
      localStorage.setItem("items", JSON.stringify(items));
      // Update the list of items displayed on the page
      fillList(items, itemsList);

      // Reset the form, clearing the input field
      this.reset();
    }

   addItems.addEventListener("submit", addItemsToList);

```

### 2. Filling the List

The `fillList` function takes the list of items and updates the HTML to display them as a list of tasks. This function uses the `map` method to generate the HTML structure for each item and then joins the resulting array into a single string. The resulting HTML is injected into the `itemsList` element.

```js
    function addItemsToList(e) {
      ...
      // Update the list of items displayed on the page
      fillList(items, itemsList);
      ...
    }

    function fillList(items, itemsList) {
        itemsList.innerHTML = items
         .map((list, index) => {
          return `
          <li>
           <input type="checkbox" data-index=${index} id="item${index}" ${list.checkState ? "checked" : ""} />
           <label for="item${index}">${list.text}</label>
          </li>
          `;
         })
         .join("");
       }
```

### 3. Toggling Item Status

The `toggleDone` function handles the event when a user clicks on a checkbox. It determines the index of the clicked item, toggles its status, and updates the local storage and HTML representation of the list.

```js
    function toggleDone(e) {
        if (e.target.matches("input")) {
          // Get the index of the clicked checkbox
          const index = e.target.dataset.index;
          // Toggle the check state
          items[index].checkState = !items[index].checkState;
          // Update the 'items' array in local storage
          localStorage.setItem("items", JSON.stringify(items));
          // Update the list of items displayed on the page
          fillList(items, itemsList);
    }

    itemsList.addEventListener("click", toggleDone);
}
```

### 4. Initializing the Local Storage

- checks for any previously stored data in the browser's local storage (every time page load). The items array is created to store the items for the to-do list.
- if there is no stored data or if the data retrieval fails, an empty array is assigned as the default value for the items array.

```js
    // parse : convert JSON to an array of objects
    const items = JSON.parse(localStorage.getItem("items")) || [];
```

## What I Added/Fixed

- **My own style**

## What I Learned

- **Local Storage Usage**: I gained insights into how to utilize local storage to store and retrieve data .
