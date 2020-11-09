# Control Flow & Error Handling

## Block statement

```js
/*
{
  statement_1;
  statement_2;
  ...
  statement_n;
}
*/
```



### Example

```js
while (x < 10) {
  x++;
}
```

> **Important**: JavaScript before ECMAScript2015 (6th edition) **does not** have block scope!

## Conditional statements

Java Script support two conditional statements: `if...else` and `switch`.

An `if` statement looks like this: 

```js
if (condition) {
  statement_1;
} else {
  statement_2;
}
```

```js
if (condition_1) {
  statement_1;
} else if (condition_2) {
  statement_2;
} else if (condition_n) {
  statement_n;
} else {
  statement_last;
}
```

#### Best practice

```js
if (condition) {
  statement_1_runs_if_condition_is_true;
  statement_2_runs_if_condition_is_true;
} else {
  statement_3_runs_if_condition_is_false;
  statement_4_runs_if_condition_if_false;
}
```

**! It's unwise to use simple assignment in a conditional expression, because the assignment can be confused with equality when glancing over the code.**

Do not write code like this: 

```js
// Prone to being misread as "x == y"
if (x = y) {
  /* statements here */
}
```

If assignment statement is needed, we should write code like this: 

```js
if ((x = y)) {
  /* statements here */
}
```

#### Falsy(错误的) values

The following values evaluate to `false` (also known as Faisy values): 

* `false`
* `undefined`
* `null`
* `0`
* `NaN`
* the empty string (`""`)

All other values -- including all objects -- evaluate to `true` when passed to a conditional statement.

> **Caution: **Do not confuse the primitive boolean values `true` and `false` with the true and false values of the `Boolean` object!
>
> For example: 
>
> ```js
> var b = new Boolean(false);
> if (b)					// this condition evaluates to true
> if (b == true)	// this condition evaluates to false
> ```

#### Example

```js
function checkData() {
  if (document.form1.threeChar.value.length == 3) {
    return true;
  } else {
    alert(
    	'Enter exactly three characters. ' +
      `${document.form1.threeChar.value} is not valid.`);
    return false;
  }
}
```

### `switch` statement

```js
switch(expression) {
  case label_1:
    statements_1
    [break;]
  case label_2:
    statements_2
    [break;]
    ...
  default:
    statements_def
    [break;]
}
```

#### break statements

The optional `break` statement associated with each `case` clause ensures that the program breaks out of `switch` once the matched statement is executed, and then continues execution at the statement following `switch`. If `break` is omitted, the program continues execution inside the `switch` statement (and will evaluate the next `case`, and so on).

## Exception handling statements

* `throw` statement
* `try...catch` statement

### Exception types

* ECMAScript exceptions
* `DOMException` and `DOMError`

### `throw` statement

Use the `throw` statement to throw an exception. A `throw` statement specifies the value to be thrown: 

```js
throw expression;
```

```js
throw 'Error2';		// String type
throw 42;					// Number type
throw true;				// Boolean type
throw {toString: function() {return "I'm an object!";}};
```

```js
// Create an object type UserException
function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}

// Make the exception convert to a pretty string when used as a string
// (e.g., by the error console)
UserException.prototype.toString = function() {
  return `${this.name}: "${this.message}"`;
}

// Create an instance of the object type and throw it
throw new UserException('Value too high');
```

### `try...catch` statement

The `try...catch` statement marks a block of statements to try, and specifies one or more responses should an exception be thrown. If an exception is thrown, the `try...catch` statement catches it.

```js
function getMonthName(mo) {
  mo = mo - 1;	// Adjust month number for array index (1 = Jan, 12 = Dec)
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (months[mo]) {
    return month[mo];
  } else {
    throw 'InvalidMonthNo';		// throw keyword is used here
  }
}

try {	// statements to try
  monthName = getMonthName(myMonth);	// function could throw exception
}
catch (e) {
  monthName = 'unknown';
  logMyErrors(e);	// pass exception object to error handler (i.e. your own function)
}
```

#### The `catch` block

Using a `catch` block to handle all exceptions that may be generated in the `try` block.

```js
catch (catchID) {
  statements
}
```

The `catch` block specifies an identifier (`catchID` in the preceding syntax) that holds the value specified by the `throw` statement.

Once the `catch` block finishes executing, the identifier no longer exists.

```js
try {
  throw 'myException';	// generates an exception
}
catch (err) {
  // statements to handle any exceptions
  logMyErrors(err);			// pass exception object to error handler
}
```

> **Best practice: ** When logging errors to the console inside a `catch` block, using `console.error()` rather than `console.log()` is advised for debugging. It formats the message as an error, and adds it to the list of error messages generated by the page. 

#### The `finally` block

The `finally` block contains statements to be executed *after* the `try` and `catch` blocks execute. Additionally, the `finally` block executes *before* the code that follows the `try...catch...finally` statement.

**It is also important to note that the `finally` block will execute *whether* or not an exception is thrown.** If an exception is thrown, however, the statements in the `finally` block execute even if no `catch` block handles the exception that was thrown.

```js
openMyFile();
try {
  writeMyFile(theData);		// This may throw an error
} catch(e) {
  handleError(e);		// If an error occurred, handle it
} finally {
  closeMyFile();		// Always close the resource
}
```

If the `finally` block returns a value, this value becomes the return value of the entire `try...catch...finally` production, regardless(不管的；不理会的) of any `return` statements in the `try` and `catch` blocks: 

```js
function f() {
  try {
    console.log(0);
    throw 'bogus';
  } catch(e) {
    console.log(1);
    return true;		// this return statement is suspended(暂停的)
    								// until finally block has completed
    console.log(2);	// not reachable
  } finally {
    consle.log(3);
    return false;		// overwrites the previous "return"
    consle.log(4);	// not reachable
  }
  // "return false" is executed now
  console.log(5);		// not reachable
}
console.log(f());		// 0, 1, 3, false
```

Overwriting of return values by the `finally` block also applies to exceptions thrown or re-thrown inside of the `catch` block: 

```js
function f() {
  try {
    throw 'bogus';
  } catch(e) {
    console.log('caught inner "bogus"');
    throw e;		// this throw statement is suspended until
    						// finally block has completed
  } finally {
    return false;		// overwrites the previous "throw"
  }
  // "return false" is executed now
}

try {
  console.log(f());
} catch(e) {
  // this is never reached!
  // while f() executes, the `finally` block returns false,
  // which overwrites the `throw` inside the above `catch`
  console.log('caught outer "bogus"');
}

// OUTPUT
// caught inner "bogus"
// false
```

#### Nesting try...catch statements

If an inner `try...catch` statement does *not* have a `catch` block: 

1. It *must* contain a `finally` block, and
2. the enclosing `try...catch` statement's `catch` block is checked for match.

### Utilizing(使用) Error objects

Depending on the type of error, you may be to use the `name` and `message` properties to get a more refined message.

The `name` property provides the general class of `Error` (such as `DOMException` or `Error`), while `message` generally provides a more succinct(简明的) message than one would get by convering the error object to a string.

```js
function doSomethingErrorProne() {
  if (ourCodeMakesAMistake()) {
    throw (new Error('The message'));
  } else {
    doSomethingToGetAJavascriptError();
  }
}
...
try {
  doSomethingErrorProne();
} catch(e) {								// NOW, we actully use `console.error()`
  console.error(e.name);		// logs 'Error'
  console.error(e.message);	// logs 'The message', or a JavaScript error message
}
```

## Promises

Start at `ECMAScript 2015`, JavaScript added support for `Promise` object. It allows you to control the delay and asynchoronous operation flow.

`Promise` object have the following states: 

* peding: The initial state, which is being executed, is not in the fulfilled or rejected state.
* fulfilled: The operation was successfully completed.
* rejected: Failured, the operation was not completed.
* settled: Promise is either fullfilled or rejected, will not be pending

