# Grammar & Types

## Declarations

`var` Declares a variable, optionally initializing it to a value.

`let` Declares a block-scoped, local variable, optionally initializing it to value.

`const` Declares a block-scoped, read-only named contant

### Variables

### Declaring variables

* With the keyword `var`. To declare both **local** and **global** valiables, depending on the execution context.
* With the keyword `const` or `let`. To declare a block-scope local variable.
* Object Literals, using the destructuring assignment syntax. For example `let { bar } = foo`

### Evaluating variables

A variable declared using the `var` or `let` statement with no assigned value specified has the value of `undefined`.

An attempt to access an undeclared variable results in a `ReferenceError` exception being thrown: 

```js
var a;
console.log('The value of a is ' + a);	// the value of a is undefined
console.log('The value of b is ' + b);	// the value of b is undefined
var b;

console.log('The value of c is ' + c);	// uncaught ReferenceError: c is no defined

let x;
console.log('The value of x is ' + x);	// the value of x is undefined

console.log('The value of y is ' + y);	// uncaught ReferenceError: y is not defined
let y;
```

```js
var input;
if (input === undefined) {
  doThis();
} else {
  doTaht();
}
```

The `undefined` value behaves as `false` when used in a boolean context.

```js
var myArray = [];
if (!myArray[0]) myFunction();
```

The `undefined` value converts to `NaN` when used in numeric context.

```js
var a;
a + 2;	// evalutates to NaN
```

When you evaluate a `null` variable, the null value behaves as `0` in numeric contexts and as `false` in boolean contexts.

```js
var n = null;
console.log(n * 32);	// will log 0 to the console
```

### Variable scope

Using `var` to declare the `x`, the scope of `x` is not limited to the immediate `if` statement block.

```js
if(true) {
  var x = 5;
}
console.log(x);	// x is 5
```

Using `let` to declare the `x`, the scope of `x` is limited to the immediate `if` statement block.

```js
if (true) {
  let y = 5;
}
console.log(y);	// ReferenceError: y is not defined
```

### Variable hoisting(变量提升)

Variables in JavaScript are, in a sense(感觉), "hoisted" (or "lifted") to the top of the function or statement. However, variable that are hoisted return a value of `undefined`.  

```js
/**
 * Example 1
 */
console.log(x === undefined);	// true
var x = 3;

/**
 * Example 2
 */
// will return a value of undefined
var myVar = 'my value';

(funtion() {
 	console.log(myVar);	// undefined
	var myVar = 'local value';
})();
```

The above examples will be interpreted the same as: 

```js
var x;
console.log(x === undefined);	// true
x = 3;

var myVar = 'my value';

(function() {
  var myVar;
  console.log(myVar);	// undefined
  myVar = 'local value';
})();
```

Because of hoisting, all `var` statements in a function should be placed as near to the top of the function as possible.

In ECMAScript 2015, `let` and `const` **are hoisted but not initialized**. 

```js
console.log(x);	// ReferenceError
let x = 3;
```

### Function hoisting

Only function declarations are hoisted -- but not the function expressions.

```js
/* Function declaration */
foo();	// "bar"

function foo() {
  console.log('bar');
}

/* Function expression */
baz();	// TypeError: baz is not a function

var baz = function() {
  console.log('bar2');
}
```

### Global variables

Global variables are in fact properties of the *global object*.

In web pages, the global object is `window`, so you can set and access global variables using the `window.variable` syntax.

### Constants

Create a read-only, named constant with the `const` keyword.

```js
const PI = 3.14;
```

A constant cannot change value through assignment or be re-declared while the script is running. It must be initialized to a value.

The scope rules for constants are the same as those for `let` block-scope variables. If the `const` keyword is omitted(漏掉), the identifier is assumed to represent a variable.

```js
// THIS WILL CAUSE AN ERROR
function f() {};
const f = 5;

// THIS WILL CAUSE AN ERROR TOO
function f() {
  const g = 5;
  var g;
  
  // ...
}
```

However, the properties of objects assigned to constants are not protected.

```js
const MY_OBJECT = {'key': 'value'};
MY_OBJECT.key = 'otherValue';
```

Also ,the contents of an array are not protected.

```js
const MY_ARRAY = ['HTML', 'CSS'];
MY_ARRAY.push('JAVASCRIPT');
console.log(MY_ARRAY);	// logs ['HTML', 'CSS', 'JAVASCRIPT'];
```



## Data structure and types

### Data types

The latest ECMAScript standard defines eight data types: 

* Primitive data: 
  * **`Boolean`** true and false
  * **`null`** A special keyword denoting a null value. (Because JavaScript is case-sensitive, `null` is not the same as `Null`, `NULL`, or any other variant.)
  * **`undefined`** A top-level property whose value is not defined.
  * **`Number`** An integer or floating point number.
  * **`BigInt`** An integer with arbitrary precision(任意精度).
  * **`String`** A sequence of characters that represent a text value.
  * **`Symbol`** (new in ECMAScript 2015). A data type whose instances are unique and immutable.
* Object

### Data type conversion

**JavaScript is a dynamically typed language(weakly type language)**. This means you don't have to specify the data type of a variable when you declare it. It also means that data types are automatically converted as-needed during script execution.

```js
var answer = 42;

// there, we can assign the same variable a string value
answer = 'Thanks for all the fish...';
```

### Numbers and the '+' operator

**In expressions involving numeric and string values with the `+` operator, JavaScript converts numeric value to strings.**

```js
x = 'The answer is ' + 42	// "The answer is 42"
y = 42 + ' is the answer'	// "42 is the answer"
```

With all other operators, JavaScript does not convert numeric values to strings.

```js
'37' - 7	// 30
'37' + 7	// "377"
```

### Converting strings to numbers

There are methods that for string convert to number.

* `parseInt()`
* `parseFloat()`

`parseInt` only returns whole numbers, so its use is diminished(减少；丢失) for decimals.

> Additionally, a best practice for `parseInt` is to always include the radix parameter. The radix(基数；进制) parameter is used to specify which numerical system is to be used.

```js
parseInt('101', 2)	// 5
```

An alternative(可替换的) method of retrieving(修复；转换) a number from a string is with the `+` (unary plus) operator.

```js
'1.1' + '1.1'	// '1.11.1'
(+'1.1') + (+'1.1')	// 2.2
// Note: the parentheses(圆括号) are added for clarity, not required.
```

## Literals

Literals represent values in JavaScript. These are fixed values -- not variables -- that you *literally* provide in your script.

* Array literals
* Boolean literals
* Floating-point literals
* Numeric literals
* Object literals
* RegEx literals
* String literals

### Array literals

```js
let coffees = ['French Roast', 'ColomBian', 'Kona'];
```

> **Note: **An array literal is a type of object initializer.

If an array is created using a literal in a top-level script, JavaScript interprets(解释) the array each time it evaluates the expression containing the array literal. In addition, a liiteral used in a function is created each time the function is called.

> **Note: **Array literals are also `Array` objects.

#### Extra commas in array literals

```js
let fish = ['Lion', , 'Angel']
```

This array has two elements with values and one empty element: 

* `fish[0]` is "Lion"
* `fish[1]` is `undefined`
* `fishtailing[2]` is "Angel"

> **Note: **Trailing commas can create errors in older browser versions and it is a best practice to remove them.

```js
// `myList1` length is 3
let myList1 = ['home', , 'school', ];
// `myList2` length is 4
let myList2 = [, 'home', , 'school'];
// `myList3` length is 4
let myList3 = ['home', , 'school', , ];
```

### Boolean literals

The Boolean type has two literal values: `true` and `false`.

> **Be careful: **Do not confuse the primitive Boolean values `ture` and `false` with the true and false values of the `Boolean` object.
>
> The Boolean object is a wrapper around the primitive Boolean data type.

### Numeric liiterals

`Number` and `BigInt` types can be written in decimal (base 10), hexadecimal (base 16), octal (base 8) and binary (base 2).

* A decimal numeric literal is a sequence of digits without a leading `0` (zero).
* A leading `0` (zero) on a numeric literal, or leading `0o` (or `0O`) indicates it is in *Octal* numerics can include only the digits `0` - `7`
* A leading `0x` (or `0X`) indicates a *hexadecimal* numeric type. Hexadecimal numerics can include digits(`0` - `9`) and the letters `a` - `f` and `A` - `F`. (The case of a character does not change its value. Therefore: `0xa` = `0xA` = `10`) and `0xf` = `0xF` = `15`.)
* A leading `0b` (or `0B`) indicates a *binary* numeric literal. Binary numeric can only include the digits `0` and `1`.

### Floating-point literals

A floating-point literal can have the following parts: 

* A decimal integer which can be signed (preceded by "`+`" or "`-`"),
* A decimal point ("`.`"),
* A fraction(小数) (another decimal number),
* An exponent(指数).

The exponent part is an "`e`" or "`E`" followed by an integer, which can be signed (preceded by "`+`" or "`-`"). A floating-point literal must have at least one digit, and either a decimal point or "`e`" (or " `E`").

```js
let f1 = 3.1415926;
let f2 = -.123456789;
let f3 = -3.1E+12;
let f4 = .1e-23;
```

### Object literals

An object literal is a list of zero or more pairs of property names and associated values of an objects, enclosed in curly braces (`{}`).

> **! Do not use an object literal at the beginning of a statement!** This will lead to an error(or not behave as you expect), because the `{` will be interpreted as the beginning of a block.

```js
var sales = 'Toyota';

function carTypes(name) {
  if (name === 'Honda') {
    return name;
  } else {
    return "Sorry, we don't sell " + name + ".";
  }
}

var car = { myCar: 'Saturn', getCar: carTypes('Honda'), special: sales };

console.log(car.myCar);			// Saturn
console.log(car.getCar);		// Honda
console.log(car.special);		// Toyota
```

Additionally, you can use a numeric or string literal for the name of a property or nest an object inside another.

```js
var car = { manyCars: {a: 'Saab', b: 'Jeep'}, 7: 'Mazda' };
console.log(car.manyCars.b);	// Jeep
console.log(car[7]);	// Mazda
```

Property names that are not valid identifiers cannot be accessed as a doe (`.`) property, but can be accessed and set with the array-like notation("`[]`").

```js
var unusualPropertyNames = {
  '': 'An empty string',
  '!': 'Bang!'
}
console.log(unusualPropertyNames.'');		// SyntaxError: Unexpected string
console.log(unusualPropertyNames['']);	// An empty string
console.log(unusualPropertyNames.!);		// SyntaxError: Unexpected token !
console.log(unusualPropertyNames['!']);	// Bang!
```

### Enhanced Object literals

In ES2015, object literals are extended to support setting the prototype at construction, shorthand for `foo: foo` assignments, defining methods, making `super` calls, and computing property names with expressions.

```js
var obj = {
  // __proto__
  __proto__: theProtoObj,
  // Shorthand for 'handler: handler'
  handler,
  // Methods
  toString() {
    // Super calls
    return 'd ' + super.toString();
  },
  // Computed (dynamic) property names
  ['prop_' + (() => 42)()]: 42
}
```

### RegEx literals

```js
var re = /ab+c/;
```

### String literals

A string literal is zero or more characters enclose in double(`"`) or single (`'`) quotation marks. A string must be delimited by quotation marks of the same type (taht is, either both single quotation marks, or both double quotation marks).

```js
let str1 = 'foo';
let str2 = "bar";
let str3 = '1234';
let str4 = 'one line \n another line';
```

You can call any of the `String` object's methods on a string literal value. You can also use the `String.length` property with a string literal.

```js
console.log("John's cat".lenght);		// 10
```

In ES2015, template literals are also available. Template literals are enclosed by the back-tick (`` ` ) character instead of double or single quotes.

**Template strings provide syntactic sugar for constructing strings.**

```js
let str1 = `In JavaScript '\n' is a line-feed.`;

let str2 = `In JavaScript, template strings can run 
						over multiple lines, but double and single 
						quoted strings cannot.`;
let name = 'Bob', time = 'today';
let str3 = `Hello ${name}, how are you ${time}?`;

POST`http://foo.org/bar?a=${a}&b=${b}
			Content-Type: application/json
			X-Credentials: ${credentials}
			{ "foo": ${foo},
				"bar": ${bar}
			}`(myOnReadyStateChangeHandler);
```

#### Using special characters in strings

| Character   | Meaning                                                      |
| ----------- | ------------------------------------------------------------ |
| `\0`        | Null Byte                                                    |
| `\b`        | Backspace                                                    |
| `\f`        | Form feed(换页)                                              |
| `\n`        | New line                                                     |
| `\r`        | Carriage(车) return                                          |
| `\t`        | Tab                                                          |
| `\v`        | Vertical tab                                                 |
| `\'`        | Apostrophe(撇号) or single quote                             |
| `\"`        | Double quote                                                 |
| `\\`        | Backshlash character                                         |
| `\XXX`      | The character with the Latin-1 encoding specified by up to three octal digits XXX between `0` and `377`. |
| `\xXX`      | The character with the Latin-1 encoding specified by the two hexadecimal digits XX between `00` and `FF`. |
| `\uXXXX`    | The Unicode character specified by the four hexadecimal digits XXXX. |
| `\u{XXXXX}` | Unicode code point escapes(转义字符).                        |

#### Escaping characters

```js
var quote = "He read \" The Cremation of Sam McGee\" by R.W. Service.";
console.log(quote);	// He read "The Cremation of Sam McGee" by R.W. Service.

var home = 'c:\\temp';
```

