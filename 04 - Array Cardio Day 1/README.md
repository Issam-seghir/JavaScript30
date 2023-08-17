# Exploring Array Methods

![1692297085317](image/README/1692297085317.png)

In this coding exercise, I delved into various **array methods** to manipulate and analyze arrays of data.
I applied **filtering**, **mapping**, **sorting**, and **reducing** techniques to perform specific tasks on arrays.
Let's delve into the code and understand how I **achieved** this and what i **add/fix** from the original solution.

## Table of Contents

- [Exploring Array Methods](#exploring-array-methods)
  - [Table of Contents](#table-of-contents)
  - [How I Made It Happen](#how-i-made-it-happen)
    - [1. Filtering Inventors](#1-filtering-inventors)
    - [2. Mapping Inventors' Names](#2-mapping-inventors-names)
    - [3. Sorting Inventors by Birthdate](#3-sorting-inventors-by-birthdate)
    - [4. Calculating Total Lifespan](#4-calculating-total-lifespan)
    - [5. Sorting Inventors by Years Lived](#5-sorting-inventors-by-years-lived)
    - [6. Manipulating Boulevard Data (Not Included)](#6-manipulating-boulevard-data-not-included)
    - [7. Sorting People Alphabetically](#7-sorting-people-alphabetically)
    - [8. Reducing Data Instances](#8-reducing-data-instances)

## How I Made It Happen

### 1. Filtering Inventors

```js
const bornIn1500s = inventors.filter(inventor => inventor.year >= 1500 && inventor.year <= 1600);
console.table(bornIn1500s);
```

### 2. Mapping Inventors' Names

```js
const inventorsNames = inventors.map(inventor => ({ first: inventor.first, last: inventor.last }));
console.table(inventorsNames);
```

### 3. Sorting Inventors by Birthdate

```js
const sortedByBirthdate = inventors.sort((a, b) => a.year - b.year);
console.table(sortedByBirthdate);
```

### 4. Calculating Total Lifespan

```js
const totalLifespan = inventors.reduce((total, inventor) => total + (inventor.passed - inventor.year), 0);
console.log(totalLifespan);
```

### 5. Sorting Inventors by Years Lived

```js
const sortedByYearsLived = inventors.sort((a, b) => (a.passed - a.year) - (b.passed - b.year));
console.table(sortedByYearsLived);
```

### 6. Manipulating Boulevard Data (Not Included)

### 7. Sorting People Alphabetically

```js
const people = ['Mary, Green', 'John, Smith', 'Jane, Doe', 'George, Washington'];
const sortedPeople = people.sort((a, b) => {
  const lastNameA = a.replace(/(\w+)(,\s*)(\w+)/, '$3$2$1');
  const lastNameB = b.replace(/(\w+)(,\s*)(\w+)/, '$3$2$1');
  return lastNameA.localeCompare(lastNameB);
});
console.table(sortedPeople);
```

- An array `people` is defined, containing strings representing people's names in the format "First, Last".

```javascript
const people = ['Mary, Green', 'John, Smith', 'Jane, Doe', 'George, Washington'];
```

- The `sort()` method is applied to the `people` array, which takes a comparison function as an argument. This function defines the sorting behavior.

```javascript
const sortedPeople = people.sort((a, b) => {
```

- Inside the comparison function, two variables `lastNameA` and `lastNameB` are created using the `replace()` method and a regular expression. This regex captures the last name and switches the order of the last name and first name, effectively extracting the last name.

```javascript
  const lastNameA = a.replace(/(\w+)(,\s*)(\w+)/, '$3$2$1');
  const lastNameB = b.replace(/(\w+)(,\s*)(\w+)/, '$3$2$1');
```

- The `localeCompare()` method is used to compare the modified last names (`lastNameA` and `lastNameB`) in a case-insensitive manner, ensuring correct alphabetical sorting.

```javascript
  return lastNameA.localeCompare(lastNameB);
});
```

- Finally, the sorted array `sortedPeople` is displayed in a tabular format using `console.table()`.

```javascript
console.table(sortedPeople);
```

This code snippet effectively sorts the `people` array based on last names in alphabetical order and presents the result in a formatted tabular display for easy readability.

### 8. Reducing Data Instances

```js
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];
const instances = data.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
console.log(instances);
```

- An array named `data` is defined, containing various strings representing types of vehicles and modes of transportation.

```javascript
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];
```

- The `reduce()` method is applied to the `data` array. The `reduce()` method takes a callback function and an initial value (an empty object `{}` in this case) as arguments.

```javascript
const instances = data.reduce((acc, item) => {
```

- Inside the callback function, two things happen:
  - The `acc` (accumulator) object is used to keep track of the count of each unique item.
  - For each `item` in the `data` array, the code checks if the `item` is already a key in the `acc` object. If it's not, a new key is created with the `item`, and its value is initialized to `0`. Then, `1` is added to the value, effectively counting the occurrence of the `item`.

```javascript
  acc[item] = (acc[item] || 0) + 1;
```

- The callback function returns the updated `acc` object after each iteration.

```javascript
  return acc;
```

- The initial value for the accumulator is an empty object `{}`.

- The `reduce()` method returns the `instances` object, which contains key-value pairs representing the count of each unique item in the `data` array.

```javascript
}, {});
```

- Finally, the `instances` object is logged to the console, showing the count of each unique item.

```javascript
console.log(instances);
```

This code efficiently uses the `reduce()` method to generate a summary of the count of different items in the `data` array, providing a clear representation of the frequency of each item's occurrence.
