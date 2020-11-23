# Numbers & Dates

## Numbers

In JavaScript, numbers are implemented in double-precision 64-bit binary format IEEE 754. Integer values up to `±2^53 - 1` can be represented exactly.

In addition to being able to represent floating-point numbers, the number types has three symbolic values: `+ Infinity`, `-Infinity`, and `NaN` (not-a-number).

A more recent addition to JavaScript is `BigInt` which lets you represent integers that may be very large.

* You can't mix and match `BigInt` and `Number` values in the same operation.
* You can't use the `Math` object with `BigInt` values.

### Decimal numbers

```js
1234567890
42

// Caution when using leading zeros: 
0888	// 888 parsed as decimal
0777	// parsed as octal in non-strict mode (511 in decimal)
```

### Binary numbers

```js
let FLT_SIGNBIT = 0b10000000000000000000000000000000;		// 2147483648
let FLT_EXPONENT = 0b01111111100000000000000000000000;	// 2139095040
let FLT_MANTISSA = 0B00000000011111111111111111111111;	// 8388607
```

### Octal numbers

```js
let n = 0755;		// 493
let m = 0644;		// 420
let a = 0o10;		// ES2015: 8
```

### Hexadecimal numbers

```js
0xFFFFFFFFFFFFFFFFF // 295147905179352830000
0x123456789ABCDEF   // 81985529216486900
0XA                 // 10
```

### Exponentiation

```js
1E3   // 1000
2e6   // 2000000
0.1e2 // 10
```

## Number object

The built-in `Number` object has properties for numerical constants, such as maximum value, not-a-number, and infinity. These properties cannot be change.

```js
let biggestNum = Number.MAX_VALUE;
let smallestNUm = Number.MIN_VALUE;
let infiniteNum = Number.POSITIVE_INFINITY;
let negInfiniteNum = Number.NEGATIVE_INFINITY;
let notANum = Number.NaN;
```

#### Properties of `Number`

| Property                   | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `Number.MAX_VALUE`         | The largest representable number (`±1.7976931348623157e+308`) |
| `Number.MIN_VALUE`         | The smallest representable number (`±5e-324`)                |
| `Number.NaN`               | Special "not a number" value                                 |
| `Number.NEGATIVE_INFINITY` | Special negative infinite value; returned on overflow.       |
| `Number.POSITIVE_INFINITY` | Special positive infinite value; returned on overflow        |
| `Number.EPSILON`           | Difference between `1` and the smallest value greater than `1` that can be represented as a `Number` (`2.220445049250313e-16`) |
| `Number.MIN_SAFE_INTEGER`  | Minimum safe integer in JavaScript (−2^53 + 1, or `−9007199254740991`) |
| `Number.MAX_SAFE_INTEGER`  | Maximum safe integer in JavaScript (+2^53 − 1, or `+9007199254740991`) |

#### Methods of `Number`

| Method                   | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `Number.parseFloat()`    | Parses a string argument and returns a floating point number. Same as the global `parseFloat()` function. |
| `Number.parseInt()`      | Parses a string argument and returns an integer of the specified radix or base. Same as the global `parseInt()` function. |
| `Number.isFinite()`      | Determines whether the passed value is a finite number.      |
| `Number.isInteger()`     | Determines whether the passed value is an integer.           |
| `Number.isNaN()`         | Determines whether the passed value is `NaN`. More robust(健壮的；结实的) version of the original global `isNaN()` |
| `Number.isSafeInteger()` | Determines whether the provided value is a number that is a safe integer. |

#### Method of `Number.prototype`

| Method            | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `toExponential()` | Returns a string representing the number in exponential notation. |
| `toFixed()`       | Returns a string representing the number in fixed-point notation. |
| `toPrecision()`   | Returns a string representing the number to a specified precision(精度；精确) in fixed-point notation. |

## Math object

The built-in `Math` object has properties and methods for mathematical constants and functions.

```js
Math.PI
```

Similarly, standard mathematical functions are methods of `Math`. These include trigonometric, logarithmic, exponential, and the other functions.

```js
Math.sin(1.56)
```

#### Methods of `Math`

| Method                                                      | Description                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| `abs()`                                                     | Absolute value                                               |
| `sin()`, `cos()`, `tan()`                                   | Standard trigonometric(三角的) functions; with the argument in radians(弧度). |
| `asin()`, `acos()`, `atan()`, `atan2()`                     | Inverse trigonometric functions; return values in radians.   |
| `sinh()`, `cosh()`, `tanh()`                                | Hyperbolic(双曲线) functions; argument in hyperbolic angle.  |
| `asinh()`, `acosh()`, `atanh()`                             | Inverse hyperbolic functions; return values in hyperbolic angle. |
| `pow()`, `exp()`, `expm1()`, `log10()`, `log1p()`, `log2()` | Exponential and logarithmic functions.                       |
| `floor()`, `ceil()`                                         | Returns the largest/smallest integer less/greater than or equal to an argument. |
| `min()`, `max()`                                            | Returns the minimum or maximum (respectively(各自的)) value of a comma separated list of numbers as arguments. |
| `random()`                                                  | Returns a random number between 0 and 1.                     |
| `round()`, `fround()`, `trunc()`.                           | Rounding(整数；四舍五入) and truncation(截断) functions.     |
| `sqrt()`, `cbrt()`, `hypot()`                               | Square root, cube root, Square root of the sum of square arguments. |
| `sign()`                                                    | The sign of a number, indicating(说明) whether the number is positive, negative or zero. |
| `clz32()`, `imul()`                                         | Number of leading zero bits in the 32-bit binary representation. The result of the C-like 32-bit multiplication of the two arguments. |

## Date object

JavaScript does not have a date data type, but we can use the `Date` object and its methods to work with dates and times in applications.

* The `Date` object has a large number of methods for setting, getting, and manipulating dates. It does not have any properties.

```js
// create a `Date` object
let dateObjectName = new Date([parameters]);
```

Calling `Date` without the `new` keyword **returns a string representing the current date and time**.

The `parameters` in the preceding syntax can be any of the following:

* Nothing: creates today's date and time. For example, `today = new Date();`
* A string representing a date in the following form: "Month day, year hours:minutes:seconds." For example, `var Xmas95 = new Date("December 25, 1995 10:30:00")`;.
* A set of integer values for year, month, and day. For example, `var Xmas95 = new Date(1995, 11, 25);`.
* A set of integer values for year, month, day, hour, minute, and seconds. For example, `var Xmas95 = new Date(1995, 11, 25, 9, 30, 0);`.

### Methods of the Date object

The `Date object methods for handling dates and times fall into these broad categories:

* "set" methods, for setting date and time values in `Date` objects.
* "get" methods, for getting date and time values from `Date` objects.
* "to" methods, for returning string values from `Date` objects.
* parse and UTC methods, for parsing `Date` strings.

`Date` methods use integers to represent these values as follows:

* Seconds and minutes: 0 to 59
* Hours: 0 to 23
* Day: 0 (Sunday) to 6 (Saturday)
* Date: 1 to 31 (day of the month)
* Months: 0 (January) to 11(December)
* Year: years since 1900

The `getTime` and `setTime` methods are useful for comparing dates. The `getTime` method returns the number of milliseconds since January 1, 1970, 00:00:00 for a `Date` object.

```js
let today = new Date();
let endYear = new Date(1995, 11, 31, 23, 59, 999);
endYear.setFullYear(today.getFullYear());
let msPerDay = 24 * 60 * 60 * 1000;	// Number of milliseconds per day
let daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
let daysLeft = Math.round(daysLeft);	// returns days left in the year
```

The `parse` method is usefull for assigning values from date strings to existing `Date` objects.

```js
let IPOdate = new Date();
IPOdate.setTime(Date.parse('Aug 9, 1995'));
```

### Example

```js
// A digital clock
function JSClock() {
  let time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  let temp = '' + ((hour > 12) ? hour - 12 : hour);
  if (hour == 0)
    temp = '12';
  temp += ((minute < 10) ? ':0' : ':') + minute;
  temp += ((second < 10) ? ':0' : ':') + second;
  temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  return temp;
}
```

