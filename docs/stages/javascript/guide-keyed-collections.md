# Keyed collections

## `Map`s

### Map object

ECMAScript 2015 introduces a new data structure to map values to values.

A `Map` object is a simple **key/value** map and can iterate its elements in insertion order.

```js
let sayings = new Map();
sayings.set('dog', 'woof');
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
sayings.size;					// 3
saying.get('dog');		// woof
saying.get('fox');		// undefined
saying.has('bird');		// false
sayings.delete('dog');
sayings.has('dog');		// false

for(let [key, value] of sayings) {
  console.log(key + ' goes ' + value);
}
// "cat goes meow"
// "elephant goes toot"

sayings.clear();
sayings.size;					// 0
```

### `Object` and `Map` compared

Traditionally, objects have been used **to map strings** to values. Objects allow you to set keys to values, retrieve(检索) those values, delete keys, and detect(检测) whether is stored at a key.

* The keys of an `Object` are `Strings` or `Symbols`, where they can be of any value for a `Map`.
* We can get the `size` of a `Map` easily, while you have to manually keep track of size for an `Object`.
* The iteration of maps is in insertion order of the elements.
* An `Object` has a prototype, so there are default keys in the map. (This can be bypassed using `map = Object.create(null)`).

These three tips can help we to decide whether to use a `Map` or an `Object`:

* Use **maps** over objects **when keys are unknown until run time**, and **when all keys are the same type and all values are the same type**.
* Use **maps** if there is a **need to store primitive values as keys** *because object treats each key as a string whether it's a number value, boolean value or any other primitive value*.
* Use **objects** when there is **logical** that operates on individual elements.

### `WeakMap` object

The `WeakMap` object is a collection of **key/value** pairs in which the **keys are objects only** and the **values can be arbitrary(任意值) values**. The object references in **the keys are held *weakly***, ***meaning that they are a target of garbage collection(GC) if there is no other reference to the object anymore***.

* One difference to `Map` objects is that `WeakMap` **keys are not enumerable** (i.e., there is no method giving you a list of the keys).

  If they were, the list would depend on the state of garbage collection, introducing non-determinism(未预知的).

```js
const privates = new WeakMap();

function Public() {
  const me = {
    // Private data goes here
  };
  privates.set(this, me);
}

Public.prototype.method = function() {
  const me = privates.get(this);
  // Do stuff with private data in `me`...
};

module.exports = Public
```

## Sets

### `Set` object

`Set` objects are collections of values. We can iterate its elements in insertion order.

A value in a `Set` may only occur once; it is unique in the `Set`'s collection.

```js
let mySet = new Set();
mySet.add(1);
mySet.add('some text');
mySet.add('foo');

mySet.has(1);			// true
mySet.delete('foo');
mySet.size;				// 2

for (let item of mySet) console.log(item);
// 1
// "some text"
```

### Converting between `Array` and `Set`

We can create an `Array` from a `Set` using `Array.from` or the spread operator.

Also, the `Set` constructor accepts an `Array` to convert in the other direction.

> **Note: ** Remember that `Set` object store *unique values* -- so any duplicate elements from an Array are deleted when converting!

```js
Array.from(mySet);
[...mySet2];

mySet2 = new Set([1, 2, 3, 4]);
```

### `Array` and `Set` compared

The new `Set` object has some advantages:

* Deleting Array elements by value (`arr.splice(arr.indexOf(val), 1)` is very slow.
* `Set` objects let you delete elements by their value. With an array, you would have to `splice` based on an **element's index**.
* The value `NaN` cannot be found with `indexOf` **in an array**.
* `Set` objects store unique values. You don't have to manually keep track of duplicates.

### `WeakSet` object

`WeakSet` objects are collections of objects. An object in the `WeakSet` may only occur once. It is **unique** in the `WeakSet`'s collection, and **objects are not enumerable**.

The main differences to the `Set` object are:

* In contrast(明显差异) to `Sets`, `WeakSets` are **collections of objects only**, and not of arbitrary value of any type.
* The `WeakSet` is *weak*: References to objects in the collection are held weakly. If there is no other reference to an object stored in the `WeakSet`, **they can be garbage collected**. `WeakSets` are not enumerable.

### Key and value equality of `Map` and `Set`

Both **the *key* equality of `Map` objects** and **the *value* equality of `Set` objects**, are based on the "[same-value-zero algorithm]()"

* Equality works like the identity comparison operator `===`.
* `-0` and `+0` are considered equal.
* [`NaN`](https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) is considered **equal to itself** (contrary(相反的；与...有所不同) to `===`).

