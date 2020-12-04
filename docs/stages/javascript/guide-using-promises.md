# Using Promises

A `Promise` is an object representing the **eventual completion** or **failure** *of* **an asynchronous** operation.

Essentially, a promise is a returned object to which you **attach callbacks**, instead of pass callbacks into a function (prameter).

```js
function successCallback(result) {
  console.log("Audio file ready at URL: " + result);
}

function failureCallback(error) {
  console.error("Error generating audio file: " + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);

// Modern functions return a promise that you can attach our callbacks to instead
/**
 * If `createAudioFileAsync()` were rewritten 
 * to return a promise
 */
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
// That's shorthand for this
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback);
```

## Guarantees(约定)

Unlike old-fashioned *passed-in* callbacks, a promise comes with some guarantees:

* Callbacks will never be called **before** the completion of the current run of the JavaScript event loop.
* Callbacks added with `then()`, as above, will be called even *after* the **success** or **failure** of the asynchronous operation.
* Multiple callbacks may be added by calling `then()` several times. Each callback is executed *one after another(顺序；一个接一个)*, in the order in which they were inserted.

One of the great things about using promises is **chaining**.

## Chaining

A common need is to execute two or more asynchronous operations **back to back**, where **each subsequent operation starts when the previous operation succeeds, with the result from the previous step**. 

```js
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);
// or
const promise2 = doSomething().then(successCallback, failureCallback);
```

*Basically, each promise represents the completion of another asynchronous step in the chain.*

In the old days, doing several asynchronous operations in a row would lead to the classic callback pyramid of doom:

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

With modern functions, we attach our callbacks to the **returned promises** instead, forming a **promise chain**:

```js
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);

// or with arrow functions instead
doSomthing()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```

**Important: *Always return results***, otherwise callbacks won't catch result of a previous promise (with arrow functions `() => x` is short for `() => { return x; }`).

### Chaining after a catch

It's possible to chain *after* a failure, i.e. a `catch`, which is useful to accomplish new actions even after an action failed in the chain.

```js
new Promise((resolve, reject) => {
  console.log('Initial');
  resolve();
})
.then(() => {
  throw new Error('Something failed');
  console.log('Do this');
})
.catch(() => {
  console.error('Do that');
})
.then(() => {
  console.log('Do this, no matter what happened before');
});

// Initial
// Do that
// Do this, no matter what happened before
```

**Note: ** The text "Do this" is not displayed because the "Something failed" error caused a rejection.

## Error propagation(传递)

```js
try {
  const result = syncDoSomething();
  const newResult = syncDoSomethingElse(result);
  const finalResult = syncDothirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
```

This symmetry with asynchronous code culminates in the `async`/`await` syntactic sugar in ECMAScript 2017.

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```

## Promise rejection events

Whenever a promise is rejected, one of two events is sent to **the global scope**.

**`rejectionhandled`**

​	Sent when a promise is rejected, **after** that rejection has been handled by the executor's `reject` function.

**`unhandledrejection`**

​	Sent when a promise is rejected but there is **no rejection handler available**.

In both cases, the event (of type `PromiseRejectionEvent`) has as members a `promise` property indicating the promise that was rejected, and a `reason` property that provides the reason given for the promise to be rejected.

These make it possible to offer fallback error handling for promises, as well as to help debug issues with your promise management. 

```js
window.addEventListener("unhandledrejection", event => {
  /* We might start here by adding code to examine the 
   * promise specified by event.promise and the reason 
   * in event.reason
   */
  event.preventDefault();
}, false);
```

By calling the event's `preventDefault()` method, we tell the JavaScript runtime not to de its default action when rejected promises go unhandled.

## Creating a Promise around an old callback API

A `Promise` can be created from scratch using its constructor.

Unfortunately, some APIs still expect success and/or failure callbacks to be passed in the old way. The most obvious example is the [`setTimeout()`](https://wiki.developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) function:

```js
setTimeout(() => saySomething("10 seconds passed"), 10 * 1000);
```

Mixing old-style callbacks and promises is problematic. If `saySomething()` fails or contains a programming error, nothing catches it. `setTimeout` is to blame for this.

Luckily we can wrap `setTimeout` in a promise. Best practice is to wrap problematic functions at the lowest possible level, and then never call them directly again:

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(10 * 1000).then(() => saySomething("10 seconds")).catch(failureCallback);
```

## Composition

`Promise.resolve()` and `Promise.reject()` are shortcuts to manually create an already **resolved** or **rejected** promise respectively. This can be useful at times.

`Promise.all()` and `Promise.race()` are two composition tools for running asynchronous operations in parallel(并行的；平行的).

```js
Promise.all([func1(), func2(), func3()])
.then(([result1, result2, result3]) => {
  /* use result1, result2, result3 */
});
```

Basically, we reduce an array of asynchronous functions down to a promise chain equivalent to: `Promise.resolve().then(func1).then(func2).then(func3);`

This can be made into **a reusable compose function**, which is common in functional programming:

```js
const applyAsync = (acc, val) => acc.then(val);
const composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));

const transformData = composeAsync(func1, func2, func3);
const result3 = transformData(data);
```

**`reduce()` - `Array.prototype.reduce()`**

The `reduce()` method executes a **reducer** function(that you provide)

on each element of the array, resulting in single output value.

The **reducer** function takes four arguments:

1. Accumulator(累加器)
2. Current Value
3. Current Index
4. Source Array

In ECMAScript 2017, sequential composition can be done more simply with **async/await**:

```js
let result;
for (const f of [func1, func2, func3]) {
  result = await f(result):
}
/* use last result (i.e. result3) */
```

## Timing(时序)

To avoid surprises, function passed to `then()` will never be called synchronously, even with an already-resolved promise:

```js
Promise.resolve().then(() => console.log(2));
console.log(1);

// 1, 2
```

**Instead of running immediately**, the passed-in function is put on **a microtask queue**, which means it *runs later* when the queue is emptied at the end of the current run of the JavaScript event loop, i.e. pretty soon:

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1);

// 1, 2, 3, 4
```

### Task queues vs microtasks

Promise callbacks are handled as a Microtask whereas `setTimeout()` callbacks are handled as Task queues.

```js
const promise = new Promise(function(resolve, reject) {
  console.log("Promise callback");
  resolve();
}).then(function(result) {
  console.log("Promise callback (.then)");
});

setTimeout(function() {
  console.log("event-loop cycle: Promise (fullfilled)", promise)
}, 0);

console.log("Promise (pending)", promise);

// Promise callback
// Promise (pending) Promise {<pending>}
// Promise callback (.then)
// event-loop cycle: Promise (fullfilled) Promise {<fulfilled>}
```

## Nesting

Nesting is a control structure to limit the scope of `catch` statements. Specifically, a nested `catch` only catches failures in its scope and below, not errors higher up in the chain outside the nested scope.

```js
doSomethingCritical()
.then(result => doSomethingOptional(result)
     .then(optionalResult => doSomethingExtraNice(optionalResult))
      .catch(e => {})	// Ignore if optional stuff fails; proceed.
.then(() => moreCritialStuff())
.catch(e => console.error("Cirtical failure: " + e.message));
```

