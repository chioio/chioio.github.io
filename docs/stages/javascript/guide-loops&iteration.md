# Loops & Iteration

```js
for (let step = 0;step < 5; step++) {
  // Runs 5 times, with values of step 0 through 4.
  console.log('Walking east one step');
}
```

The statements for loops provided in JavaScript are: 

* for statement
* do...while statement
* while statement
* labeled statement
* break statement
* continue statement
* for...in statement
* for...of statement

## `for` statement

A `for` loop repeats until a specified condition evaluates to `false`.

```js
for ([initialExpression]; [conditionExpression]; [incrementExpression])
  statement
```

## `do...while` statement

The `do...while` statement repeats until a specified condition evaluates to false.

```js
do
  statement
while (condition);
```

`statement` is always executed once before the condition is checked.

## `while` statement

A `while` statement executes its statements as long as a specified condition evaluates to `true`.

```js
while (condition)
  statement
```

## `labeled` statement

A `label` provides a statement with an identifier that lets you refer to it elsewhere in your program.

```js
label: 
	statement
```

**The value of `label` may be any JavaScript identifier that is not a reserved word.**

### Example

```js
markLoop:
while (theMark === true) {
  doSomething();
}
```

## `break` statement

Use the `break` statement to terminate a loop, `switch`, or in conjunction(结合) with a labeled statement.

```js
break;					// terminates the innermost enclosing loop or `switch`
break [label];
```

## `continue` statement

The `continue` statement can be used to restart a `while`, `do-while`, `for`, or `label` statement.

* When you use `continue` without a label, it terminates the current iteration of the innermost enclosing `while`, `do-while`, or `for` statement and continues execution of the loop with the next iteration.
* When you use `continue` with a label, it applies to the looping statement identified with that label.

```js
continue [label];
```

## `for...in` statement

The `for..in` statement iterates a specified variable over all the enumerable properties of an object.

```js
for (variable in object)
  statement
```

## `for...of` statement

The `for...of` statement creates a loop Iterating over utterable objects (including `Array`, `Map`, `Set`, `arguments` object and so on), invoking a custom iteration hook with statement to be executed for the value of each distinct(独特的) property.

```js
for (variable of object)
  statement
```

`for...in` iterates over property names (subscript), `for...of` iterates over property values: 

```js
const arr = [3, 5, 7];
arr.foo = 'hello';	// "foo" is a property subscript

for (let i in arr) {
  console.log(i);		// logs "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i);		// logs 3, 5, 7
}
```

