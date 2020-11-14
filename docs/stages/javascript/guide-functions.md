# Functions

## Defining functions

### Function declarations

A **function definition** (also called a **function declaration**, or **function statement**) consists of the `function` keyword, followed by: 

* The name of the function
* A list of parameters to the function, enclosed in parentheses and spearated by commas.
* The JavaScript statements that define the function, enclosed in curly brackets, `{...}`.

```js
function square(number) {
  return number * number;
}
```

### Function expressions

Functions can be created by function expression. Such a function can be **anonymous(匿名的)**; it does not have to have a name.

```js
const square = function(number) { return number * number }
var x = square(4)	// x gets the value 16
```

However, a name can be provided with a function expression. Providing a name allows the function to refer to itself, and also makes it easier to identify the function in a debugger's stack traces: 

```js
const factorial = function fac(n) { return n < 2 ? 1 : n * fac(n - 1) }
console.log(factorial(3))
```

```js
function map(f, a) {
  let result = [];	// create a new Array
  let i;	// declare variable
  for (i = 0; i != a.length; i++)
    result[i] = f(a[i]);
  return result;
}

const f = function(x) {
  return x * x * x;
}
let numbers = [0, 1, 2, 5, 10];
let cube = map(f, numbers);
console.log(cube);

// map() RETURNS
// [0, 1, 8, 125, 1000]
```

In JavaScript, a function can be based on a condition.

```js
var myFunc;
if (num === 0) {
  myFunc = function(theObject) {
    theObject.make = 'Toyota';
  }
}
```

A **method** is a function that is a property of an object.

## Calling functions

```js
// calling square
square(5);
```

Functions must be in scope when they are called, but the function declaration can be hoisted.

```js
console.log(square(5));
/* ... */
function square(n) { return n * n }
```

>**Note: ** Function hoisting only works with function *declarations* -- not with function *expressions*.
>
>> ```js
>> console.log(square)			// square is hoisted with an initial value undefined.
>> console.log(square(5))	// Uncaught Type Error: square is not a function
>> const square = function(n) {
>>   return n * n;
>> }
>> ```

A function can call itself.

```js
// computes factorials recursively(递归地)
function factorial(n) {
  if ((n === 0) || (n === 1))
    return 1;
  else 
    return (n * factorial(n - 1));
}

let a, b, c, d, e;
a = factorial(1);		// a gets the value 1
b = factorial(2);		// b gets the value 2
c = factorial(3);		// c gets the value 6
d = factorial(4);		// d gets the value 24
e = factorial(5);		// e gets the value 120
```

## Function scope

```js
// the following variables are defined in the global scope
let num1 = 20,
    num2 = 3,
    name = 'Chamahk';

// this function is defined in the global scope
function multiply() {
  return num1 * num2;
}

multiply();		// returns 60

// a nested function example
function getScore() {
  let num1 = 2,
      num2 = 3;
  
  function add() {
    return name + ' scored ' + (num1 + num2);
  }
  
  return add();
}

getScore();		// return "Chamahk scored 5"
```

## Scope and the function stack

### Recursion

A function can refer to and call itself.

There are three ways for a function to refer to itself: 

1. The function's name
2. `arguments.callee`
3. An in-scope variable that refers to the function(作用域下的一个指向该函数的变量名)

```js
let foo = function bar() {
  // statements go here
}
```

With in the function body, the following are all equivalent: 

1. `bar()`
2. `arguments.callee()`
3. `foo()`

In some ways, recursion is analogous(类似) to a loop.

```js
// loop way
let x = 0;
while (x < 10) {	// "x < 10" is the loop condition
  // do stuff
  x++;
}

// recursion way
function loop(x) {
  if (x >= 10)	// "x >= 10" is the exit condition (equivalent to "!(x < 10)")
    return;
  // do stuff
  loop(x + 1);	// the recursive call
}
loop(0);
```

**Getting all the nodes of a tree structure (such as the DOM) is easier via recursion**

```js
function walkTree(node) {
  if (node == null)	//
    return;
  // do something with node
  for (var i = 0; i < node.childNodes.length; i++) {
    walkTree(node.childNodes[i]);
  }
}
```

### Nested functions and closures

The nested (inner) function is private to tis containing (outer) function.

It also forms a closure(闭包). A closure is an expression (most commonly, a function) that can have free variables together with an environment that binds those variables (that "closes" the expression).

The inner function contains the scope of the outer function.

```js
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}
a = addSquares(2, 3);	// returns 13
b = addSquares(3, 4);	// returns 25
c = addSquares(4, 5);	// returns 41
```

Since the inner function forms a closure, you can call the outer function and specify arguments for both the outer and inner function:

```js
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}

fn_inside = outside(3);	// think of it like: give me a function that adds 3 to whatever you give it
result = fn_inside(5);	// returns 8

result1 = outside(3)(5);	// returns 8
```

### Preservation(保存) of variables

A closure must preserve the arguments and variables in all scopes it references. **Since each call provides potentially(潜在的) different arguments, a new closure is created for each call to `outside`**. The memory can be freed only when the returned `inside` is no longer accessible.

### Multiply-nested functions

Functions can be multiply-nested.

```js
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + y + z);
    }
    C(3);
  }
  B(2);
}
A(1);		// logs 6 (1 + 2 + 3)
```

### Name conflicts(冲突)

When two **arguments** or **variables** in the scopes of a closure have the same name, there is a *name* conflict. **More nested scopes take precedence(先于).** 

```js
function outside() {
  let x = 5;
  function inside(x) {
    return x * 2;
  }
  return inside;
}

outside()(10);	// returns 20 instead of 10
```

## Closures(闭包)

JavaScript allows for the nesting of functions and grants the inner function full access to all the variables and functions defined inside the outer function.

However, the outer function does not have access to the variables and functions defined inside the inner function.

Also, **since the inner function has access to the scope of the outer function, the variables and functions defined in the outer function will live longer than the duration of the outer function execution, if the inner function manages to survive beyond the lift of the outer function.** A closure is created when the inner function is somehow made available to any scope outside the outer function.

```js
var pet = function(name) {		// The outer function defines a variable called "name"
  var getName = function() {
    return name;							// The inner function has access to the "name" varibale of the outer function
  }
  return getName;							// Return the inner function, thereby exposing it to outer scopes
}
myPet = pet("Vivie");

myPet();		// Returns "Vivie"
```

```js
var createPet = function(name) {
  var sex;
  
  return {
    setName: function(newName) {
      name = newName;
    },
    
    getName: function() {
      return name;
    },
    
    getSex: function() {
      return sex;
    },
    
    setSex: function(newSex) {
      if (typeof newSex === 'string' && (newSex.toLowerCase() === 'male' || newSex.toLowerCase() === 'female')) {
        sex = newSex;
      }
    }
  }
}

var pet = createPet('Vivie');
pet.getName();					// Vivie

pet.setName('Oliver');
pet.setSex('male');
pet.getSex();						// male
pet.getName();					// Oliver
```

In the code above, the `name` variable of the outer function is accessible to the inner functions, and there is no other way to access the inner variables except through the inner functions. The inner variables of the inner functions act as safe stores for the outer arguments and variables. They hold "persistent(持久；稳定)" and "encapsulated(封装)" data for the inner functions to work with. The functions do not even have to be assigned to a variable, or have a name.

```js
var getCode = (function() {
  var apiCode = '0]Eal(eh&2';		// A code we do not want outsiders to be able to modify...
  return function() {
    return apiCode;
  }
})();

getCode();			// Returns the apiCode
```

> **Caution: **There are a number of pitfalls to watch out for when using closures!
>
> If an enclosed function defines a variable with the same name as a variable in the outer scope, then there is no way to refer to the variable in the outer again. (The inner scope variable "overrides" the outer one, until the program exits the inner scope.)
>
> ```js
> var createPet = function(name) {		// The outer function defines a variable called "name".
>   return {
>     setName: function(name) {				// The enclosed function also defines a variable called "name".
>       name = name;									// How do we access the "name" defined by the outer function?
>     }
>   }
> }
> ```

## Using the `arguments` object

The arguments of a function are maintained(保存；维持) in an array-like object.

```js
arguments[i]
```

```js
function myConcat(separator) {
  let result = '';	// initialize list
  let i;
  // iterate through arguments
  for (i = 1; i < arguments.length; i++) {
    result += arguments[i] + separator;
  }
  return result;
}

// returns "red, orange, blue, "
myConcat(', ', 'red', 'orange', 'blue');

// returns "elephant; griaffe; lion; cheetah;"
myConcat('; ', 'elephant', 'griaffe', 'lion', 'cheetah');

// returns "sage. basil. oregano. pepper. parsley. "
myConcat('. ', 'sage', 'basil', 'oregano', 'peper', 'parsley');
```

>**Note: **The `arguments` variable is "array-like", **but not an array**. It is array-like in that it has **a numbered index** and a `length` property. However, it does *not* possess(拥有) all of the array-manipulation(数组操作) methods.

## Function parameters

Starting with ECMAScript 2015, there are two new kinds of parameters: **defalut parameters** and **rest paremeters**.

### Default parameters

In JavaScript, parameters of functions default to `undefined`.

#### Without default parameters (pre-ECMAScript 2015)

```js
function multiply(a, b) {
  b = typeof b !== 'undefined' ? b : 1;
  
  return a * b;
}

multiply(5);	// 5
```

#### With default parameters (post-ECMAScript 2015)

```js
function multiply(a, b = 1) {
  return a * b;
}

multiply(5);	// 5
```

### Rest parameters(剩余参数)

The rest parameter syntax allows us to represent an indenfinte(不确定的；含糊的) number of arguments as an array.

```js
function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}

let arr = multiply(2, 1, 2, 3);
console.log(arr);	// [2, 4, 6]
```

## Arrow functions

An arrow function expression (previously, and now incorrectly known as **fat arrow function**) has a shorter syntax compared to function expressions and **does not have its own `this`, arguments, super, or new.target.** Arrow functions are always anonymous(匿名的).

* Two factors influenced the introduction of arrow functions: *shorter functions and non-binding of `this`*.

### Shorter functions

In some functional patterns, shorter functions are welcome.

```js
let a = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

var a2 = a.map(function(s) { return s.length; });
console.log(a2);	// logs [8, 6, 7, 9]

var a3 = a.map(s => s.length);
console.log(a3);	// logs [8, 6, 7, 9]
```

### No separate `this`

Until arrow functions, every new function defined its own `this` value (**a new object in the case of a constructor, undefined in *strict mode* function calls, the base object if the function is called as an "object method"**, etc.).

```js
function Person() {
  // The Person() constructor defines `this` as itselft.
  this.age = 0;
  
  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this`
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

let p = new Person();
```

In ECMAScript 3/5, this issue was fixed by **assigning the value in `this` to a variable that colud be close over.**

```js
function Person() {
  let self = this;	// Some choose `that` instead of `self`.
  									// Choose one and be consistent(一贯的；一致的)
  self.age = 0;
  setInterval(function growUp() {
    // The callback refers to the `self` variable of which the value is the expected object.
    self.age++;
  }, 1000);
}

let p = new Person();
```

Alternatively, a [*bound function*](#) could be created so that the proper `this` value would be passed to the `growUp()` function.

**An arrow function does ont have its own `this`; the `this` value of the enclosing execution context is used.** 

```js
function Person() {
  this.age = 0;
  
  setInterval(() => {
    this.age++;		// |this| properly refers to the person object
  }, 1000);
}

let p = new Person();
```

