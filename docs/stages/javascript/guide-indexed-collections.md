# Indexed collections

## `Array` object

An array is an ordered list of values that you refer to with a name and an index.

### Creating an array

```js
let arr = new Array(element0, element1, ..., elementN)
let arr = Array(element0, element1, ..., elementN)
let arr = [element0, element1, ..., elementN]

// This...
let arr = new Array(arrayLength)

// ...results in the same array as this
let arr = Array(arrayLength)

// This has exactly the same effect
let arr = []
arr.length = arrayLength
```

> **Note: **The `arrayLength` must be a `Number`.
>
> An array with a single element (the provided value) will be created. Calling `arr.length` will return `arrayLength`, but the array doesn't contain any elements. A `for...in` loop will not find any property on the array.

Arrays can also be assigned as a property of a new or an existing obejct.

```js
let obj = {}
// ...
obj.prop = [element0, element1, ..., elementN]

// OR
let obj = {prop: [element0, element1, ..., elementN]}
```

```js
let arr = [42]			// Creates an array with only oone element: the number 42.

let arr = Array(42)	// Creates an array with no elements and arr.length set to 42.

// The following is equivalent to the above
let arr = []
arr.length = 42
```

Calling `Array(N)` results in a `RangeError`, if `N` is a non-whole number whose fractional portion is non-zero.

```js
let arr = Array(9.3)	// RangeError: Invalid array length
```

In ES2015, we can use the `Array.of` static method to create arrays with single element.

```js
let wisenArray = Array.of(9.3)		// wisenArray contains only one element 9.3
```

### Referring to array elements

```js
let myArray = ['Wind', 'Rain', 'Fire']

// Referring
myArray[0]
myArray[1]
myArray[2]
```

> **Note: **We can also use property accessors to access other properties of the array, like with an object.
>
> ```js
> let arr = ['one', 'two', 'three']
> arr[2]				// 'three'
> arr['length']	// 3
> ```

### Populating(填充) an array

```js
let emp = []
emp[0] = 'Casey Jones'
emp[1] = 'Phil Lesh'
emp[2] = 'August West'
```



> **Note**: If you supply a non-integer value of the array operator in the code above, a property will be created in the obejct representing the array, instead of an array element.
>
> ```js
> let arr = []
> arr[3.4] = 'Oranges'
> console.log(arr.length)								// 0
> console.log(arr.hasOwnProperty(3.4))	// true
> ```

We can also populate an array when web create it:

```js
let myArray = new Array('Hello', myVar, 3.14159)
// OR
let myArray = ['Mango', 'Apple', 'Orange']
```

### Understanding length

The `length` property is special. It always returns the index oof the last element plus one.

Remember, JavaScript Array indexes are 0-based: they start at `0`, not `1`.

```js
let cats = []
cats[30] = ['Dusty']
console.log(cats.length)	// 31
```

Writing a value that is shorter than the number of stored tiems truncates the array. Writing `0` empties it entirely:

```js
let cats = ['Dusty', 'Misty', 'Twiggy']
console.log(cats.length)	// 3

cats.length = 2
cosole.log(cats)	// logs 'Dusty, Misty' - Tiwggy has been removed

cats.length = 0
console.log(cats)	// logs []: the cats array is empty

cats.length = 3
console.log(cats)	// logs [ <3 empty items> ]
```

### Iterating over arrays

```js
let colors = ['red', 'green', 'blue']
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i])
}

let divs = document.getElementsByTagname('div')
for (let i = 0, div; div = divs[i]; i++) {
  /* Process div in some way */
}
```

The `forEach()` method provides another way of iterating over an array:

```js
let colors = ['red', 'green', 'blue']
colors.forEach(function(color) {
  console.log(color)
})
// red
// green
// blue
```

Shorten the code for the forEach parameter with ES 2015 Arrow Functions:

```js
let codes = ['red', 'green', 'blue']
colors.forEach(color => console.log(color))
// red
// green
// blue
```

Unassigned values are not iterated in a `forEach` loop. But are listed when `undefined` has been manually assigned to the element:

```js
let array = ['first', 'second', , 'fourth']

array.forEach(function(element) {
  console.log(element)
})
// first
// second
// fourth

if (array[2] === undefined) {
  console.log('array[2] is undefined')	// true
}

array = ['first', 'second', undefined, 'fourth']

array.forEach(function(element) {
  console.log(element)
})
// first
// second
// undefined
// fourth
```

### Array methods

* `concat()` joins two or more arrays and **returns a new array**.

  ```js
  let myArray = new Array('1', '2', '3')
  myArray = myArray.concat('a', 'b', 'c')
  // myArray is now ["1", "2", "3", "a", "b", "c"]
  ```

* `join(delimiter = ',')`joins all elements of an array **into a string**.

  ```js
  let myArray = new Array('Wind', 'Rain', 'Fire')
  let list = myArray.join(' - ')	// list is "Wind - Rain - Fire"
  ```

* `push()` adds one or more elements to the **end** of an array and **returns the resulting `length` of the array**.

  ```js
  let myArray = new Array('1', '2')
  myArray.push('3')	// myArray is now ["1", "2", "3"]
  ```

* `pop()` **removes** the **last** element from an array and **returns that element**.

  ```js
  let myArray = new Array('1', '2', '3')
  let last = myArray.pop()
  // myArray is now ["1", "2"], last = "3"
  ```

* `shift()` **removes the first element** from an array and **returns that element**.

  ```js
  let myArray = new Array('1', '2', '3')
  let first = myArray.shift()
  // myArray is now ["2", "3"], first is "1"
  ```

* `unshift` **adds** one or more elements to **the front** of an array and r**eturns the new length of the array**.

  ```js
  let myArray = new Array('1', '2', '3')
  myArray.unshift('4', '5')
  // myArray becomes ["4", "5", "1", "2", "3"]
  ```

* `slice(start_index, upto_index)` extracts a section of an array and **returns a new array**.

  ```js
  let myArray = new Array('a', 'b', 'c', 'b', 'e')
  myArray = myArray.slice(1, 4)		// starts at index 1 and extracts all elements util index 3, returning ["b", "c", "d"]
  ```

* `splice(index, count_to_remove, addElement1, addElement2, ...)` removes elements from an array and (optionally) replaces them. It returns the items which were removed from the array.

  ```js
  let myArray = new Array('1', '2', '3', '4', '5')
  myArray.splice(1, 3, 'a', 'b', 'c', 'd')
  // myArray is now ["1", "a", "b", "c" ,"d", "5"]
  // This code started at index one (or where the "2" was),
  // removed 3 elements there, and then inserted all consecutive(连续的) elements in its place.
  ```

* `reverse()` transposes(使...调换顺序) the elements of an array, in place: the first array element becomes the last and the last becomes the first. It returns a reference to the array.

  ```js
  let myArray = new Array('1', '2', '3')
  myArray.reverse()
  // transposes the array so that myArray = ["3", "2", "1"]
  ```

* `sort()` sorts the elements of an array in place, and returns a reference to the array

  ```js
  let myArray = new Array('Wind', 'Rain', 'Fire')
  myArray.sort()
  // sorts the array so that myArray = ["Fire", "Rain", "Wind"]
  ```

* `sort()` can also take a callback function to determine(查明) how array elements are compared.

  For instance, the following will sort by **the last letter** of a string:

  ```js
  let sortFn = function(a, b) {
    if (a[a.length - 1] < b[b.length - 1]) return -1;
    if (a[a.length - 1] < b[b.length - 1]) return 1;
    if (a[a.length - 1] == b[b.length - 1]) return 0;
  }
  
  myArray.sort(sortFn)
  // sorts the arrays so that myArray = ["Wind", "Fire", "Rain"]
  ```

  * If `a` is less than `b` by the sorting system, return `-1` (or any negative number)
  * If `a` is greater than `b` by the sorting system, return `1` (or any positive number)
  * If `a` and `b` are considerd equivalent, return `0`.

* `indexOf(searchElement[, fromIndex])` searches the array for `searchElement` and **returns the index of the first match**.

  ```js
  let a = ['a', 'b', 'a', 'b', 'a']
  console.log(a.indexOf('b'))			// logs 1
  
  // Now try again, starting from after the last match
  console.log(a.indexOf('b', 2))	// logs 3
  console.log(a.indexOf('z'))			// logs -1, because 'z' was not found
  ```

* `lastIndexOf(searchElement[, fromIndex])` works like `indexOf`, but starts at the **end** and searches backwards.

  ```js
  let a = ['a', 'b', 'c', 'd', 'a', 'b']
  console.log(a.lastIndexOf('b'))			// logs 5
  
  // Now try again, starting from before the last match
  console.log(a.lastIndexOf('b', 4))	// logs 1
  console.log(a.lastIndexOf('z'))			// logs -1
  ```

* `forEach(callback[, thisObject])` executes `callback` on every array item and returns `undefined`.

  ```js
  let a = ['a', 'b', 'c']
  a.forEach(function(element) { console.log(element) })
  // logs each item in turn
  ```

* `map(callback[, thisObject])` returns a new array of the return value from executing `callback` on every array item.

  ```js
  let a1 = ['a', 'b', 'c']
  let a2 = a1.map(function(item) {return item.toUpperCase() })
  console.log(a2)	// logs['A', 'B', 'C']
  ```

* `filter(callback[, thisObject])` returns a new array containing the item items for which `callback` returned `true`

  ```js
  let a1 = ['a', 10, 'b', 20, 'c', 30]
  let a2 = a1.filter(function(item) { return typeof item === 'number'; })
  console.log(a2)	// logs[10, 20, 30]
  ```

* `every(callback[, thisObject])` returns `true` if `callback` returns `true` for every item in the array.

  ```js
  function isNumber(value) {
    return typeof value === 'number'
  }
  let a1 = [1, 2, 3]
  console.log(a1.every(isNumber))	// logs true
  let a2 = [1, '2', 3]
  console.log(a2.every(isNumber))	// logs false
  ```

* `some(callback[, thisObject])` returns `true` if `callback` returns `true` for at least one item in the array.

  ```js
  function isNumber(value) {
    return typeof value === 'number'
  }
  let a1 = [1, 2, 3]
  console.log(a1.some(isNumber))	// logs true
  let a2 = [1, '2', 3]
  console.log(a1.some(isNumber))	// logs true
  let a3 = ['1', '2', '3']
  console.log(a3.some(isNumber))	// logs false
  ```

* `reduce(callback[, initialValue])` applies `callback(accumulator, currentValue[, currentIndex[, array]])` for each value in the array for the purpose of reducing the list of items down to a single value. The `reduce` function returns **the final value** returned by `callback` function.

  ```js
  let a = [10, 20, 30]
  let total = a.reduce(function(accumulator, currentValue) { return accumulator + currentValue }, 5)
  console.log(total)	// logs 65
  ```

* `reduceRight(callback[, initialValue])` works like `reduce()`, but starts with **the last element**.

### Multi-dimensional arrays

Arrays can be nested, meaning that an array can contain another array as an element.

Two-dimensional array:

```js
let a = new Array(4)
for (let i = 0; i < 4; i++) {
  a[i] = new Array(4)
  for (let j = 0; j < 4; j++) {
    a[i][j] = '[' + i + ', ' + j + ']'
  }
}
// Row 0: [0, 0] [0, 1] [0, 2] [0, 3]
// Row 1: [1, 0] [1, 1] [1, 2] [1, 3]
// Row 2: [2, 0] [2, 1] [2, 2] [2, 3]
// Row 3: [3, 0] [3, 1] [3, 2] [3, 3]
```

### Using arrays to store other properties

Arrays can also be used like objects, to store related information.

```js
const arr = [1, 2, 3];
arr.property = "value";
console.log(arr.property);		// logs "value"
```

### Array and regular expressions

When an array is the result of a match between a regular expression and a string, the array returns properties and elements taht provide information about the match.

### Working with array-like objects

Some JavaScript objects, such as the `NodeList` returned by `document.getElementByTagName()` or the `arguments` object made available within the body of a function, look and behave like arrays on the surface but dno not share all of their methods.

* The `arguments` object provides a `length` attribute but does not implement the `forEach()` method.

  >  Array methods cannot be called directly on array-like objects.
  >
  > ```js
  > function printArguments() {
  >   arguments.forEach(function(item) {	// TypeError: arguments.forEach is not a function
  >     console.log(item);
  >   });
  > }
  > ```
  >
  > But we can call them indirectly using `Function.prototype.call()`.
  >
  > ```js
  > function printArguments() {
  >   Array.prototype.forEach.call(arguments, function(item) {
  >     console.log(item);
  >   });
  > }
  > ```
  >
  > Array prototype methods can be used on strings as well, since they provide sequential access to their characters in a similar way to arrays:
  >
  > ```js
  > Array.prototype.forEach.call('a string', function(ch) {
  >   console.log(ch);
  > });
  > ```

## Typed Arrays

JavaScript typed arrays are **array-like objects** and provide a mechanism for accessing raw(原始) binary data.

### ArrayBuffer

The `ArrayBuffer` is a data type that is used to represent a generic, fixed-length binary data buffer. You can't directly manipulate(操作) the contents of an `ArrayBuffer`; instead, you create a typed array view or a `DataView` which represents the **buffer in a specific format**, and use that to **read** and **write** the **contents of the buffer**.







