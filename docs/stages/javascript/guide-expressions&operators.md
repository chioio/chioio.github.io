# Expressions & Operators

## Operators

* [Assignment operators]()
* [Comparison operators]()
* [Arithmetic operators]()
* [Bitwise operators]()
* [Logical operators]()
* [String operators]()
* [Conditional (ternary(三元的)) operator]()
* [Comma operator]()
* [Unary(一元的) operators]()
* [Relational operators]()

### Assignment operators

`x = y` assigns the value of `y` to `x`.

#### Compound(复合) assignment operators

| Name                             | Shorthand operator | Meaning        |
| -------------------------------- | ------------------ | -------------- |
| Assignment                       | `x = y`            | `x = y`        |
| Addition assignment              | `x += y`           | `x = x + y`    |
| Subtraction(减法) assignment     | `x -= y`           | `x = x - y`    |
| Multiplication assignment        | `x *= y`           | `x = x * y`    |
| Division assignment              | `x /= y`           | `x = x / y`    |
| Remainder assignment             | `x %= y`           | `x = x % y`    |
| Exponentiation(求幂) assignment  | `x **= y`          | `x = x ** y`   |
| Left shift assignment            | `x <<= y`          | `x = x << y`   |
| Right shift assignment           | `x >>= y`          | `x = x >> y`   |
| Unsigned right shift assignment  | `x >>>= y`         | `x = x >>> y`  |
| Bitwise AND assignment           | `x &= y`           | `x = x & y`    |
| Bitwise XOR(异或) assignment     | `x ^= y`           | `x = x ^ y`    |
| Bitwise OR assignment            | `x |= y`           | `x = x | y`    |
| Logical AND assignment           | `x &&= y`          | `x = x && y`   |
| Logical OR assignment            | `x ||= y`          | `x = x || y`   |
| Logical nullish(空的) assignment | `x ??= y`          | `x ?? (x = y)` |

#### Return value and chaining

```js
const z = (x = y);	// Or equivalently: const z = x = y;

console.log(z);			// Log the return value of the assignment x = y. RESULT: y
console.log(x = y);	// Or log return value directly. RESULT: y
```

When chaining these expressions, each assignment is evaluated **right-to-left**.

* `w = z = x = y` is equivalent to `w = (x = (x = y))` or `x = y; z = y; w = y`
* `z += x *= y` is equivalent to `z += (x *= y)` or `tmp = x * y; x *= y; z += tmp` (except without the `tmp`)

#### Destructuring(解构)

For more complex assignments, the restructuring assignment syntax is a JavaScript expression that makes it possible to extract data from arrays or objects using a syntax that mirrors the construction of array and object literals.

```js
var foo = ['one', 'two', 'three'];

// without destructuring
var one = foo[0];
var two = foo[1];
var three = foo[2];

// with destructuring
var [one, two, three] = foo;
```

### Comparison operators

A comparison operator compares its operands and returns **a logical value** based on whether the comparison is `true`. The operands can be numerical, string, logical, or object values.

The sole exceptions to type conversion within comparisons involve the `===` and `!==` operators, which perform strict equality and inequality comparisons.

```js
var var1 = 3;
var var2 = 4;
```

#### Comparison operators

| Operator                     | Description                                                  | Examples returning `true`               |
| ---------------------------- | ------------------------------------------------------------ | --------------------------------------- |
| Equal (`==`)                 | Returns `true` if the operands are equal.                    | `3 == var1` , `"3" == var1`, `3 == '3'` |
| Not equal (`!=`)             | Returns `true` if the operands are not equal.                | `var1 != 4`, `var2 != "3"`              |
| Strict equal (`===`)         | Returns `true` if the operands are equal and of the same type. | `3 === var1`                            |
| Strict not equal (`!==`)     | Returns `true` if the operands are of the same type but not equal, or are of different type. | `var1 !== "3"`, `3 !== '3'`             |
| Greater than (`>`)           | Returns `true` if the left operand is greater than the right operand. | `var2 > var1`, `"12" > 2`               |
| Greater than or equal (`>=`) | Returns `true` if the left oerand is greater than or equal to the right operand. | `var2 >= var1`, `var1 >= 3`             |
| Less than (`<`)              | Returns `true` if the left operand is less than the right operand. | `var1 < var2`, `"2" < 12`               |
| Less than or equal (`<=`)    | Returns `true` if the left operand is less than or equal to the right operand. | `var1 <= var2`, `var2 <= 5`             |

> **Note: **(`=>`) is not an operator, but the notation for Arrow functions.

### Arithmetic(算数的) operators

An arithmetic operator takes numerical values (either literals or variables) as their operands and returns a single numerical value.

The standard arithmetic operators are addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`). **In particular, note that division by zero produces `Infinity`**

```js
1 / 2;	// 0.5
1 / 2 == 1.0 / 2.0;	// this is true
```

#### Arithmetic operators

| Operator                       | Description                                                  | Example                                                      |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Remainder (`%`)                | Binary operator. Returns the integer remainder of dividing the two operands. | 12 % 5 returns 2.                                            |
| Increment (`++`)               | Unary operator. Adds one to its operand. If used as a prefix operator (`++x`), returns the value of its operand after adding one; if used as a postfix operator (`x++`), returns the value of its operand before adding one. | If `x` is 3, then `++x` sets `x` to 4 and returns 4, whereas `x++` returns 3 and, only then, sets `x` to 4. |
| Decrement (`--`)               | Unary operator. Subtracts one from its operand. The return value is analogous(类似的) to that for the increment operator. | If `x` is 3, then `--x` sets `x` to 2 and returns 2, whereas `x--` returns 3 and, only then, sets `x` to 2. |
| Unary negation(负值) (`-`)     | Unary operator. Returns the negation of its operand.         | If `x` is 3, then `-x` returns -3.                           |
| Unary plus (`+`)               | Unary operator. Attempts to convert the operand to a number, if it is not already. | `+"3"` returns `3`. `+true` returns `1`.                     |
| Exponentiation operator (`**`) | Calculates the `base` to the `exponent` power, that is , `base^exponent ` | `2 ** 3` returns `8`. `10 ** -1` returns `0.1`.              |

### Bitwise operators

A bitwise operator treats their operands as a set of 32 bits (zeros and ones), rather than as decimal, hexadecimal, or octal numbers.

#### Bitwise operators

| Operator                                          | Usage     | Description                                                  |
| ------------------------------------------------- | --------- | ------------------------------------------------------------ |
| Bitwise AND                                       | `a & b`   | Returns a one in each bit position for which the corresponding(对应的) bits of both operands are ones. |
| Bitwise OR                                        | `a | b`   | Returns a zero in each bit position for which the corresponding bits of both operands are zeros. |
| Bitwise XOR                                       | `a ^ b`   | Returns a zero in each bit position for which the corresponding bits are the same. [Returns a one in each bit position for which the corresponding bits arre different.] |
| Bitwise NOT                                       | `~ a`     | Inverts the bits of its operand.                             |
| Left shift                                        | `a << b`  | Shifts `a` in binary representation `b` bits to the left, shifting in zeros from the right. |
| Sign-propagating(符号传递) right shift            | `a >> b`  | Shifts `a` in binary representation `b` bits to the right, discarding(丢弃) bits shifted off. |
| Zero-fill right shift [无符号右移] (左边补零右移) | `a >>> b` | Shifts `a` in binary representation `b` bits to the right, discarding bits shifted, and shifting in zeros from the left. |

#### Bitewise logical operators

The bitwise logical operators work as follows: 

* The operands are converted to thirty-two-bit integers and expressed by a series of bits (zeros and ones). Numbers with more than 32 bits get their most significant bits discarded. 

  ```txt
  Before: 1110 0110 1111 1010 0000 0000 0000 0110 0000 0000 0001
  After:								1010 0000 0000 0000 0110 0000 0000 0001
  ```

* Each bit in the first operand is paired with the corresponding bit in the second operand: first bit to first bit, second bit to second bit, and so on.

* The operator is applied to each pair of bits, and the result is constructed bitwise.

#### Bitwise operator examples

| Expression | Result | Binary Description                                     |
| ---------- | ------ | ------------------------------------------------------ |
| `15 & 9`   | `9`    | `1111 & 1001 = 1001`                                   |
| `15 | 9`   | `15`   | `1111 | 1001 = 1111`                                   |
| `15 ^ 9`   | `6`    | `1111 ^ 1001 = 0110`                                   |
| `~15`      | `-16`  | `~ 0000 0000 ... 0000 1111 = 1111 1111 ... 1111 0000`  |
| `~9`       | `-10`  | `~  0000 0000 ... 0000 1001 = 1111 1111 ... 1111 0110` |

Note that all 32 bits are inverted using the Bitwise NOT operator, and that values with the most significant (left-most) bit set to 1 represent negative numbers (two's-complement representation). `~x` evaluates to the same value that `-x - 1` evaluates to.

#### Bitwise shift operators

 

| Operator                            | Description                                                  | Example                                                      |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Left shift (`<<`)                   | This operator shifts the first operand the specified number of bits to the left. Excess bits shifted off to the left are *discarded*. Zero bits are shifted in from the right. | `9 << 2` yields 36, because 1001 shifted 2 bits to the left becomes 100100, which is 36. |
| Sign-propagating right shift (`>>`) | This operator shifts the first operand the specified number of bits to the right. Excess bits shifted off to the right are discarded. *Copies of the leftmost bit are shifted in from the left.* | `9 >> 2` yields 2, because 1001 shifted 2 bits to the right becomes 10, which is 2. Likewise, `-9 >> 2` yields -3, *because the sign is preserved.* |
| Zero-fill right shift (`>>>`)       | This operator shifts the first operand the specified number of bits to the right. Excess bits shifted off to the right are discarded. Zero bits are shifted in from the left. | `19 >>> 2` yields 4, because 10011 shifted 2 bits to the right becomes 100, which is 4. For non-negative numbers, zero-fill right shift and *sign-propagating right shift yield the same result.* |

### Logical operators

Logical operators are typically used with Boolean (logical) values; when they are, they return a Boolean value.

#### Logical operators

| Operator           | Usage            | Description                                                  |
| ------------------ | ---------------- | ------------------------------------------------------------ |
| Logical AND (`&&`) | `expr1 && expr2` | Returns `expr1` if it can be converted to `false`; otherwise, returns `expr2`. Thus, when used with Boolean values, `&&` returns `true` if both operands are true; otherwise, returns `false`. |
| Logical OR (`||`)  | `expr1 || expr2` | Returns `expr1` if it can be converted to `true`; otherwise, returns `expr2`. Thus, Thus, when used with Boolean values, `||` returns `true` if either operand is true; if both are false, returns `false`. |
| Logical NOT (`!`)  | `!expr`          | Returns `false` if its single operand that can be converted to `true`; otherwise, return `true`. |

* Examples of expressions that can be converted to `false` are those that evaluate to **null**, **0**, **NaN**, **""**(the empty string), or **undefined**.

```js
// Logical AND
let a1 = true && true;			// t && t returns true
let a2 = true && false;			// t && f returns false
let a3 = false && true;			// f && t returns false
let a4 = false && (3 == 4);	// f && f returns false
let a5 = 'Cat' && 'Dog';		// t && t returns Dog
let a6 = false && 'Cat';		// f && t returns false
let a7 = 'Cat' && false;		// t && f returns false
// Logical OR
let o1 = true || true;			// t || t returns true
let o2 = false || true;			// f || t returns true
let o3 = true || false;			// t || f returns true
let o4 = false || (3 == 4);	// f || f returns false
let o5 = 'Cat' || 'Dog';		// t || t returns Cat
let o6 = false || 'Cat';		// f || t returns Cat
let o7 = 'Cat' || false;		// t || f returns Cat
// Logical NOT
let n1 = !true;							// !t returns false
let n2 = !false;						// !f returns true
let n3 = !'Cat';						// !t returns false
```

#### Short-circuit(短路) evaluation

As logical expressions are evaluated left to right, they are tested for possible "short-circuit" evaluation using the following rules: 

* `false` && anything is short-circuit evaluated to false.
* `true` || anything is short-circuit evaluated to true.

The rules of logic guarantee(保证) that these evaluations are always correct.

#### Nullish coalescing operator(`??`)

It works like `||`, but it only returns the second expression, when the first one is "nullish", i.e. `null` or `undefined`. It is thus the better alternative(可能的；可供选择的) to provide defaults, when values like `''` or `0` are valid values for the first expression, too.

### String operators

```js
console.log('my ' + 'string');		// console logs the string "my string".

let mystring = "alpha";
mystring += 'bet';								// evaluates to "alphabet" and assigns this value to mystring.
```

### Conditional (ternary) operator

The syntax is:

```txt
condition ? val1 : val2
```

If `condition` is true, the operator has the value of `val1`. Otherwise it has the value of `val2`.

```js
let status = (age >= 18) ? 'adult' : 'minor';
```

### Comma operator

The comma operator (`,`) simply evaluates both of tis operands and returns the value of the last operand.

```js
let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let a = [x, x, x, x, x];

for (let i = 0, j = 9; i <= j; i++, j--)
  console.log('a[' + i + '][' + j + ']= ' + a[i][j]);
```

### Unary operators

A unary operation is an operation with only one operand.

#### `delete`

The `delete` operator deletes an object's property.

```js
delete object.property;
delete object[propertyKey];
delete objectName[index];
delete property;	// legal only within a with statement
```

where `object` is the name of an object, `property` is an existing property, and `propertyKey` is a string or symbol refering to an existing property.

If the `delete` operator succeeds, it removes the property from the object. Trying to access it afterwards will yield `undefined`.

The `delete` operator returns `true` if the operation is possible; it returns `false` if the operation is not possible.

```js
x = 42;	// implicitly creates window.x
let y = 43;
let myobj = { h: 4 };

delete x;					// returns false (cannot delete if create implicitly)
delete y;					// returns false (cannot delete if declared with var/let)
delete Math.PI;		// returns false (cannot delete non-configurable properties)
delete myobj.h;		// return true (can delete user-defined properties)
```

##### Deleting array elements

Since arrays are just objects, it's technically possible to `delete` elements from them.

#### `typeof`

```txt
typeof operand
typeof (operand)
```

The `typeof` operator returns a string indicating tye type of the unevaluated operand. `operand` is  the string, variable, keyword, or object for which the type is to be returned.

```js
let myFun = new Function('5 + 2');
let shape = 'round';
let size = 1;
let foo = ['Apple', 'Mango', 'Orange'];
let today = new Date();
```

Tye `typeof` operator returns the following results for these variables:

```js
typeof myFun;					// returns "function"
typeof shape;					// returns "string"
typeof size;					// returns "number"
typeof foo;						// returns "object"
typeof today;					// returns "object"
typeof doesntExist;		// returns "undefined"
```

For the keywords `true` and `null`, the `typeof` operator returns the following results:

```js
typeof true;					// returns "boolean"
typeof null;					// returns "object"
```

For a number or string, the `typeof` oeprator returns the following results:

```js
typeof 62;						// returns "number"
typeof 'Hello world';	// returns "string"
```

For property values, the `typeof` operator returns the type of value the property contains:

```js
typeof document.lastModified;		// returns "string"
typeof window.length;						// returns "number"
typeof Math.LN2;								// returns "number"
```

For methods and functions, the `typeof` operator returns results as follows:

```js
typeof blur;					// returns "function"
typeof eval;					// returns "function"
typeof parseInt;			// returns "function"
typeof shape.split;		// returns "function"
```

For predefined objects, the `typeof` operator returns results as follows:

```js
typeof Date;					// returns "function"
typeof Function;			// returns "function"
typeof Math;					// returns "object"
typeof Option;				// returns "function"
typeof String;				// returns "function"
```

#### `void`

```txt
void (expression)
void expression
```

The `void` operator specifies an expression to be evaluated without returning a value. `expression` is a JavaScript expression to evaluate.

### Relational operators

A relational operator compares its operands and returns a `Boolean` value based on whether the comparison is true.

#### `in`

The `in` operator returns `true` if the specified property is in the specified object.

```txt
propNameOrNumber in objectName
```

```js
// Arrays
let trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
0 in trees;						// returns true
3 in trees;						// returns true
6 in trees;						// returns false
'bay' in trees;				// returns false (you must specify the index number, not the value at that index)
'length' in trees;		// returns true (length is an Array property)

// built-in objects
'PI' in Math;					// returns true
let myString = new String('coral');
'length' in myString;	// returns true

// Custom objects
let mycar = { make: 'Honda', model: 'Accord', year: 1998 };
'make' in mycar;		// returns true
'model' in mycar;		// returns true
```

#### `instanceof`

The `instanceof` operator returns `true` if the specified object is of the specified object type.

```txt
objectName instanceof objectType
```

Use `instanceof` when you need to confirm the type of an object at runtime.

```js
let theDay = new Date(1995, 1, 1);
if (theDay instanceof Date) {
  // statement to execute
}
```

### Operator precedence

#### Operator precedence (Highest to Lowest)

| Operator type          | Individual operators                                 |
| ---------------------- | ---------------------------------------------------- |
| member                 | `. []`                                               |
| call / create instance | `() new`                                             |
| negation / increment   | `! ~ - + ++ -- typeof void delete`                   |
| multiply /divide       | `* / %`                                              |
| addition/subtraction   | `+ -`                                                |
| bitwise shift          | `<< >> >>>`                                          |
| relational             | `< <= > >= in instanceof`                            |
| equality               | `== != === !==`                                      |
| bitwise-and            | `&`                                                  |
| bitwise-xor            | `^`                                                  |
| bitwise-or             | `|`                                                  |
| logical-and            | `&&`                                                 |
| logical-or             | `||`                                                 |
| conditional            | `?:`                                                 |
| assignment             | `= += -= *= /= %= <<= >>= >>>= &= ^= |= &&= ||= ??=` |
| comma                  | `,`                                                  |

## Expressions

An *expression* is any valid unit of code that resolves to a value.

JavaScirpt has the following expression categories:

* Arithmetic: evaluates to a number, for example 3.14159.
* String: evaluates to a character string, for example, "Fred" or "234".
* Logical: evaluates to true or false.
* Primary expressions: Basic keywords and general expressions in JavaScript.
* Left-hand-side expressions: Left values are the destination(目的地) of an assignment.

### Primary expressions

#### `this`

Use the `this` keyword to refer to the current object. In general, `this` refers to the calling object in a method.

```txt
this['propertyName']
this.propertyName
```

```js
function validate(obj, lowval, hival) {
  if ((obj.value < lowval) || (obj.value > hival))
    console.log('Invalid Value!');
}
```

You could call `validate` in each form element's `onChange` event handler, using `this` to pass it to the form element, as in the following example:

```html
<p>Enter a number between 18 and 99:</p>
<input type="text" name="age" size=3 onChange="validate(this, 18, 99);">
```

#### Grouping operator

```js
let a = 1, b = 2, c = 3;

// default precedence
a + b * c			// 7
// evaluated by default like this
a + (b * c)		// 7

// now overriding precedence
// addition before multiplication
(a + b) * c		// 9

// which is equivalent to
a * c + b * c	// 9
```

### Left-hand-side expressions

#### `new`

```js
let objectName = new objectType([param1, param2, ..., paramN]);
```

#### `super`

The `super` keyword is used to call functions on an object's parent. It is useful with classes to call the parent constructor.

```js
super([arguments]);			// calls the parent constructor.
super.functionOnParent([arguments]);
```

