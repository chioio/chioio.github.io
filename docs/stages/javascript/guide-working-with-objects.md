# Working with objects

## Objects and properties

Access the properties of an object with a simple dot-notation:

```js
objectName.propertyName
```

```js
// assigning object property with dot-notation
let myCar = new Object();
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;

// object initializer
let myCar = {
  make: 'Ford',
  model: 'Mustang',
  year: 1969
};
```

Unssigned properties of an object are `undefined` (and not `null`).

```js
myCar.color;			// undefined
```

Properties of JavaScript objects can also be accessed or set using a bracket notation.

```js
myCar['make'] = 'Ford';
myCar['model'] = 'Mustang';
myCar['year'] = 1969;
```

An object property name can be any valid JavaScript string, or anything that can be converted to a string, including the empty string.

```js
// four variables are created and assigned in a single go, separated by commas
let myObj = new Object(),
    str = 'myString',
    rand = Math.random(),
    obj = new Object();

myObj.type							= 'Dot syntax';
myObj['data created']		= 'String with space';
myObj[str]							= 'String value';
myObj[rand]							= 'Random Number';
myObj[obj]							= 'Object';
myObj['']								= 'Even an empty string';

console.log(myObj);
```

We can use the bracket notation with `for...in` to iterate over all the enumerable properties of an object.

```js
let propertyName = 'make';
myCar[propertyName] = 'Ford';

propertyName = 'model';
myCar[propertyName] = 'Mustang';

propertyName = 'year';
myCar[propertyName] = '1969';

function showProps(obj, objName) {
  let result = ``;
  for (var i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      result += `${objName}.${i} = ${obj[i]}\n`;
    }
  }
  return result;
}

showProps(myCar, 'myCar');
// myCar.make = Ford
// myCar.model = Mustang
// myCar.year = 1969
```

## Enumerate the properties of an object

* `for...in` loops

  This method traverses(穿过；依次访问) all enumerable properties of an object and its prototype chain.

* `Object.keys(o)`

  This method returns an array with all the own (**not in the prototype chain**) enumerable properties' names ("keys") of an object `o`.

* `Object.getOwnPropertyNames(o)`

  This method returns an array containing all own properties' names (enumerable or not) of an object `o`.

## Creating new objects

### Using object initializers

```js
let obj = { property_1: value_1,			// property_# may be an identifer...
          	2:					value_2,			// or a number...
          	// ...
          	'property n': value_n };	// or a string
```

The following statement creates an object and assigns it to the variable `x` if and only if the expression `codn` is true:

```js
if(cond) let x = { greeting: 'hi there' };
```

Nested object:

```js
let myHonda = { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 }};
```

### Using a constructor function

To define an object type, create a function for the object type that specifies its name, properties, and methods.

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

let mycar = new Car('Eagle', 'Talon TSi', 1993);
let kenscar = new Car('Nissan', '300ZX', 1992);
let vpgscar = new Car('Mazda', 'Miata', 1990);

function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

let rand = new Person('Rand McKinnon', 33, 'M');
let ken = new Person('Ken Jones', 39, 'M');

function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}

let car1 = new Car('Eagle', 'Talon TSi', 1993, rand);
let car2 = new Car('Nissan', '300ZX', 1992, ken);
```

### Using the `Object.create` method

```js
let Animal = {
  type: 'Invertebrates',		// Default value of properties
  displayType: function() {	// Method which will diplay type of Animal
    console.log(this.type);
  }
};

// Create new animal type called animall
let animal1 = Object.create(Animal);
animal1.displayType();		// Output: Invertebrates

// Create new animal type called Fishes
let fish = Object.create(Animal);
fish.type = 'Fishes';
fish.displayType();				// Output: Fishes
```

## Inheritance

All objects in JavaScript inherit from at least one other object. The object being inherited from is known as the prototype, and the inherited properties can be found in the `prototype` object of the constructor.

## Defining properties for an object type

We can add a property to a previously defined object type by using the `prototype` property.

```js
Car.prototype.color = null;
car1.color = 'black';
```

## Defining methods

A *method* is a function associated with an object, or simply put, a method is a property of an object that is a function.

```js
objectName.methodname = functionName;

let myObj = {
  myMethod: function(params) {
    // ...do something
  }
  
  // OR THIS WORKS TOO
  myOtherMethod(params) {
    // ...do something else
  }
};

// call the method in the context of the object
object.methodname(params);

myObj.myMethod(params);
myObj.myOtherMethod(params);
```

Define method for an object type by including a method definition in the object constructor function.

```js
function displayCar() {
  let result = `A Beautiful ${this.year} ${this.make} ${this.model}`;
  pretty_print(result);
}

// so, the full definition of `Car` would now look like
function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owenr;
  this.displayCar = displayCar;
}

// Now we can call the `displayCar` method for each of the objects
car1.displayCar();
car2.displayCar();
```

## Using `this` for object references

JavaScript has a special keyword, `this`, that you can use within a method to refer to the current object.

```js
const Manager = {
  name: "John",
  age: 27,
  job: "Software Engineer"
}
const Intern = {
  name: "Ben",
  age: 21,
  job: "Software Engineer Intern"
}

function sayHi() {
  console.log('Hello, my name is ', this.name)
}

// add sayHi function to both objects
Manager.sayHi = sayHi;
Intern.sayHi = sayHi;

Manager.sayHi()		// Hello, my name is John
Intern.sayHi()		// Hello, my name is Ben
```

## Defining getters and setters

* A **getter** is a method that **gets** the value of a specific property.
* A **setter** is a method that **sets** the value of a specific property.

When defining getters and setters using object initializers all you need to do is to prefix a getter method with `get` and a setter method with `set`.

> The **getter** method must **not expect a parameter**, while the **setter** method expects **exactly one parameter** (the new value to set).

```js
let o = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2;
  }
};

console.log(o.a);		// 7
console.log(o.b);		// 8
o.c = 50;
console.log(o.a);		// 25
```

> **Getters** and **setters** can also be added to an object at any time after creation using the **`Object.defineProperties()`** method.
>
> This method's first parameter is **the object** on which you want to define the **getter** or **setter**.
>
> The second parameter is **an object** whose **property names** are the getter or setter names, and whose **property value** are objects for defining the getter or setter functions.

```js
let o = { a: 0 };

Object.defineProperties(o, {
  'b': { get: function() { return this.a + 1; } },
  'c': { set: function(x) { this.a = x / 2; } }
});

o.c = 10;					// Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(o.b);	// Runs the getter, which yields a + 1 or 6
```

## Deleting properties

We can remove a **non-inherited** property by using the `delete` operator.

```js
// Creates a new object, myobj, with two properties, a and b.
let myobj = new Object;
myobj.a = 5;
myobj.b = 12;

// Removes the a property, leaving myobj with only the b property.
delete myobj.a;
console.log('a' in myobj);		// output: "false"
```

We can also use `delete` to delete a global variable if the `var` keyword was not used to declare the variable.

```js
g = 17;
delete g;
```

## Comparing objects

In JavaScript, objects are a reference type.

* Two distinct objects are never equal, even if they have the same properties.
* Only comparing the same **object reference** with itself yields *true*.

```js
// Two variables, two distinct objects with the same properties.
let fruit = { name: 'apple' };
let fruitbear = { name: 'apple' };

fruit == fruitbear;			// return false
fruit === fruitbear;		// return false

// Two variables, a single object.
let fruit = { name: 'apple' };
let fruitbear = fruit;			// Assign fruit object reference to fruitbear

fruit == fruitbear;			// return true
fruit === fruitbear;		// return true

fruit.name = 'grape';
console.log(fruitbear);	// output: { name: "grape" }, instead of { name: "apple" }
```

