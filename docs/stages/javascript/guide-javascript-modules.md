# JavaScript modules

## Example

### Basic example structure

```text
index.html
main.js
modules/
	canvas.js
	square.js
```

The modules directory's two modules are described below:

* `canvas.js` -- contains functions related to setting up the canvas:
  * `create()` -- contains a canvas with a specified `width` and `height` inside a wrapper `<div>` with a specified ID, which is itself appended inside a specified parent element. Returns an object containing the canvas's 2D context and the wrapper's ID.
  * `createReportList()` -- creates an unordered list appended inside a specified wrapper element, which can be used to output report data into. Returns the list's ID.
* `square.js` -- contains:
  * `name` -- a coonstant containing the string 'square'.
  * `draw() -- draws a square on a specified canvas, with a specified size, position, and color. Returns an object containing the square's size, position, and color.
  * `reportArea()` -- writes a square's area to a specific reports list, given its length.
  * `reportPerimeter()` -- writes a square's perimeter to a specific report list, given its length.

## Exporting module features

```js
export const name = 'square';

export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);
  
  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}

// convenient way
export { name, draw, reportArea, reportPerimeter };
```

`main.js` :

```js
let myCanvas = create('myCanvas', document.body, 480, 320);
let reportList = createReportList(myCanvas.id);

let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);
```

## Applying the module to your HTML

Now we just need to apply the main.js module to our HTML page.

First of all, we need to include `type="module"` in the `<script>` element, to declare this script as a module.

```html
<script type="module" src="main.js"></script>
```

We can also embed the module's script directly into the HTML file by placing the JavaScript code within the body of the `<script>` element:

```html
<script type="module">
  /* JavaScript module code here */
</script>
```

We can only use `import` and `export` statements inside modules, not regular scripts.

##  Other differences between modules and standard scripts

* You need to pay attention to local testing — if you try to load the HTML file locally (i.e. with a `file://` URL), you'll run into CORS errors due to JavaScript module security requirements. You need to do your testing **through a server**.
* Also, note that you might get different behavior from sections of script defined inside modules as opposed to in standard scripts. This is because modules use [strict mode]() automatically.
* There is no need to use the `defer` attribute (see [`` attributes](https://wiki.developer.mozilla.org/en-US/docs/Web/HTML/Element/script#Attributes)) when loading a module script; modules are deferred automatically.
* Modules are **only executed once**, even if they have been referenced in multiple `<script>` tags.
* Last but not least, let's make this clear — module features are imported into the scope of a single script — *they aren't available in the global scope*. Therefore, you will only be able to access imported features in the script they are imported into, and you won't be able to access them from the JavaScript console, for example. You'll still get syntax errors shown in the DevTools, but you'll not be able to use some of the debugging techniques you might have expected to use.

## Default exports versus named exports

The functionality we've exported so far has been comprised of **named exports** -- each item (be it a function, `const`, etc.) has been referred to by its name upon export, and that name has been used to refer to it on import as well.

There is also a type of export called the **defalut export** -- this is designed to make it easy to have a default function provided by module, and also helps JavaScript modules to interoperate(互操作) with existing CommonJS and AMD module system.

```js
export default randomSquare;
```

We could instead prepend `export default` onto the function and define it as an anonymous(匿名的) function.

```js
export default function(ctx) {
  // ...
}

// Over in our `main.js` file, we import the default function using this line:
import randomSquare frooom './modules/square.js';

import { default as randomSquare } from './modules/square.js';
```

## Renaming imports and exports

```js
// inside module.js
export {
	function1 as newFunctionName,
  function2 as anotherNewFunctionName
};

// inside main.js
import { newFunctionName, anotherNewFunctionName } from './modules/module.js';
```

```js
// inside module.js
export { function1, function2 };

// inside main.js
import { 
  function1 as newFunctionName,
  function2 as anotherNewFunctionName
} from './modules/module.js';
```

## Creating a module object

```js
import * as Module from './modules/module.js';

Module.function1()
Module.function2()
// etc.
```

## Modules and classes

This is another option for **avoiding conflicts** in our code, and is especially useful if we've already got our module code written in **an object-oriented style**.

```js
class Square {
  constructor(ctx, listId, length, x, y, color) {
    // ...
  }
  draw() {
    // ...
  }
  // ...
}

export { Square };

// in `main.js`
import { Square } from './modules/square.js';

// use the class to draw our square
let square1 = new Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, 'blue');
square.draw();
square.reportArea();
square.reportPerimeter();
```

## Aggregating(聚合；合并) modules

```js
export * from 'x.js'
export { name } from 'x.js'
```

### Example

```js
/* modules/
 * 	canvas.js
 *	shapes.js
 *	shapes/
 *		circle.js
 *		square.js
 *		triangle.js
 */
// e.g. in submodules
export { Square };

// inside `shapes.js`
export { Square } from './shapes/square.js';
export { Triangle } from './shapes/triangle.js';
export { Circle } from './shapes/circle.js';
// inside `main.js`
import { Square } from './modules/square.js';
import { Circle } from './modules/circles.js';
import { Triangle } from './modules/triangle.js';
// single line
import { Square, Circle, Triangle } from './modules/shapes.js';
```

## Dynamic module loading

The newest part of the JavaScript modules functionality to be available in browsers is dynamic module loading. *This has some obvious performance advantages*.

This new functionality allows you to call `import()` as a function, passing it the path to the module as a parameter. **It returns a `Promise`**, which fulfills with a module obejct.

```js
import('./modules/myModule.js')
	.then((module) => {
  // Do something with the module.
});
```

### Example

`main.js` :

```js
let squareBtn = document.querySelector('.square');

squareBtn.addEventListener('click', () => {
  import('./modules/square.js')
  	.then((Module) => {
    let square1 = new Module.Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, 'blue');
    square1.draw();
    square1.reportArea();
    square1.reportPerimeter();
  })
})
```

