# Meta programming

## Proxies

Introduced in ECMAScript 6, `Proxy` objects allow us to *intercept* certain operations and to *implement custom behaviors*.

For example, getting a property on an object:

```js
let handler = {
  get: function(target, name) {
    return name in target ? target[name] : 42
  }
}

let p = new Proxy({}, handler)
p.a = 1
console.log(p.a, p.b)
// 1, 42
// Here, an object that is proxied will not return
// undefined when getting undefined properties, but 
// will instead return the number 42.
```

### Terminology(术语)

**handler**

​	Placeholder(占位符) object which contains traps.

**target**

​	Object which the proxy virtualizes. It is often used as storage backend for the proxy. Invariants(不变量) (semantics(语义；含义) that remain unchanged) regarding(考虑) object **non-extensibility** or **non-configurable** properties are verified against the target.

**invariants**

​	Semantics that remain unchanged when implementing custom operations are called *invariants*. If we violate the invariants of a handler, a `TypeError` will be thrown.

## Revocable(撤销) `Proxy`

The `Proxy.revocable()` method is used to create a revocable `Proxy` object. This means that the proxy can be revoked via the function `revoke` and switches the proxy off.

Afterwards(此后), any operation on the proxy leads to a `TypeError`.

```js
let revocable = Proxy.revocable({}, {
  get: function(target, name) {
    return '[[' + name + ']]'
  }
})
let proxy = revocable.proxy
console.log(proxy.foo)	// "[[foo]]"

revocable.revoke()

console.log(proxy.foo)	// TypeError is thrown
proxy.foo = 1						// TypeError again
delete proxy.foo				// still TypeError
typeof proxy						// "object", typeof doesn't trigger any trap
```

## Reflection(反射)

`Reflect` is built-in object that provides methods for interceptable(可拦截的) JavaScript operations. The methods are the same as those of the [proxy handlers]().

**`Reflect` is not a function object.**

`Reflect` helps with forwarding default operations from the handler to the `target`.

```js
Reflect.has(Object, 'assign')		// true
```

### A better `apply` function

In ES5, we typically use the [`Function.prototype.apply()`](https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) method to call a function with a given `this` value and `arguments` provided as an array (or an [array-like object]().

```js
Function.prototype.apply.call(Math.floor, undefined, [1.75])
```

With `Reflect.apply` this becomes less verbose(冗长) and easier to understand:

```js
Reflect.apply(Math.floor, undefined, [1.75])
// 1

Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111])
// "Hello"

Reflect.apply(RegExp.prototype.exec, /ab/, ['confabulation']).index
// 4

Reflect.apply(''.charAt, 'ponies', [3]);
// "i"
```

### Checking if property definition has been successful

WIth `Object.defineProperty`, which returns an object if successful, or throws a `TypeError` otherwise, we would use a `try...catch` block to catch any error that occurred while defining a property. Because `Reflect.defineProperty` **returns a Boolean** success status, we can just use an `if...else` block here:

```js
if (Reflect.defineProperty(target, property, attribuites)) {
  // success
} else {
  // failure
}
```

