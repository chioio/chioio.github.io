# Iterators and generators

**Iterators** and **Generators** bring the concept of iteration directly in to the core language and provide a mechanism(机制) for customizing the behavior of `for...of` loops

## Iterators

In JavaScript an **iterator** is an object which defines a sequence and potentially(可能地；潜在地) a return value upon its termination.

Specifically, an iterator is any object which implements the iterator protocol by having a `next()` method that returns an object with two properties:

**`value`**

​	The next value in the iteration sequence.

**`done`**

​	This is `true` if the last value in the sequence has already been consumed. If `value` is present **alongside** `done`, it is the iterators **return value**.

```js
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;
  
  const rangeIterator = {
    next: function() {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false }
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, doone: true }
    }
  };
  return rangeIterator;
}

const it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
  console.log(result.value);	// 1 3 5 7 9
  result = it.next();
}

console.log("Iterated over sequence of size: ", result.value);
// [5 numbers returned, that took interval in between: 0 to 10]
```

## Generator functions

**Generator functions** provide a powerful alternative: they allow we to define an iterative algorithm by writing a single function whose execution is not continuous.

**Generator functions** are written using the `function*` syntax.

When called, generator functions do not initially execute their code. Instead, they return a special type of iterator, called a **Generator**. When a value is consumed by calling the generator's `next` method, the Generator function executes until it encounters the `yield` keyword.

The function can be called as **many times** as desired, and **returns a new Generator each time**. Each Generator may only be iterated once.

```js
function* makeRangeIterator(start = 0, end = 100, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  return iterationCount;
}
```

## Iterables

An object is **iterable** if it defines its iteration behavior, such as what values are looped over in a [`for...of`](https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) construct.

In order to be **iterable**, an object must implement the **@@iterator** method. This simply means that the object (or one of the objects up its prototype chain) must have a property with a `Symbol.iterator` key.

```js
function* makeIterator() {
  yield 1;
  yield 2;
}

coonst it = makeIterator();

for (const itItem of it) {
  console.log(itItem);
}

console.log(it[Symbol.iterator]() === it);		// true

/* This example show us generator(iterator) is iterable object.
 * which has the @@iterator method return the it (itself),
 * and consequently, the it object can iterate only _once_.
 */

/* If we chage it's @@iterator method to a function/generator
 * which returns a new iterator/generator object, (it)
 * can iterate many times
 */
if[Symbol.iterator] = function* () {
  yield 2;
  yield 1;
};
```

### User-defined iterables

```js
const myIterable = {
  *[Symbol.iterator]() {
    yield: 1;
    yield: 2;
    yield: 3;
  }
}

for (let value of myIterable) {
  console.log(value);
}
// 1
// 2
// 3

// or
[...myIterable];
// [1, 2, 3]
```

### Built-in iterables

`String`, `Array`, `TypedArray`, `Map` and `Set` are all built-in iterables, because their prototype objects all have a `Symbol.iterator` method.

### Syntaxes expecting iterables

```js
for (let value of ['a', 'b', 'c']) {
  console.log(value);
}
// "a"
// "b"
// "c"

[...'abc']
// ["a", "b", "c"]

function* gen() {
  yield* ['a', 'b', 'c'];
}

gen().next();
// { value: "a" ,done: false }

[a, b, c] = new Set(['a', 'b', 'c']);
a;
// "a"
```

## Advanced generators

The [`next()`](https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next) method also accepts a value, which can be used to modify the internal state of the generator. A value passed to `next()` will be received by `yield` .

> **Note: **A value passed to the *first* invocation(调用) of `next()` is **always ignored**.

Here is the fibonacci generator using `next(x)` to restart the sequence:

```js
function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    let reset = yield current;
    [current, next] = [next, next + current];
    if (reset) {
      current = 0;
      next = 1;
    }
  }
}

const sequence = fibonacci();
console.log(sequence.next().value);				// 0
console.log(sequence.next().value);				// 1
console.log(sequence.next().value);				// 1
console.log(sequence.next().value);				// 2
console.log(sequence.next().value);				// 3
console.log(sequence.next().value);				// 5
console.log(sequence.next().value);				// 8
console.log(sequence.next(true).value);		// 0
console.log(sequence.next().value);				// 1
console.log(sequence.next().value);				// 1
console.log(sequence.next().value);				// 2
```

