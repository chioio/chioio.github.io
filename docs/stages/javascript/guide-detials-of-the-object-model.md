# Details of the object model

JavaScript is an **object-based** language based on **prototypes**, rather than being **class-based**.

## Class-based vs Prototype-based

Class-based object-oriented languages, such as Java and C++, are founded on the concept of two distinct entities: **classes** and **instance**.

* **A class** defines all of the properties that characterize a certain set of objects.
* **An instance**, on the other hand, is the instantiation of a class; that is.

A **prototype-based** language, such as JavaScript, does not make this distinction: it simply has object. A **prototype-based** language has the notion(概念) of a *prototypical object*, an object used as a template fron which to get the initial properties for a new object.

Any object can specify its own properties, either when you create it or at run time. In addition, any object can be associated as the *prototype* fro another object, allowing the second object **to share the first object's properties**.

### Defining a class

In class-based languages, you define a class in a separate *class definition*. We use the `new` operator in association with the constructor method to create class instances.

> Note that ECMAScript 2015 introduces a class declaration:
>
> JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.
>
> The class syntax does not introduce a new object-oriented inheritance model to JavaScript.

### Subclasses and inheritance

In a **class-based** language, we create a hierarchy of classes through the class definitions.

The subclass inherits all the **properties** of the superclass and additionally can add new properties or modify the inherited ones.

## The employee example

A simple object hierarchy with the following objects:

![figure8.1](https://mdn.mozillademos.org/files/3060/figure8.1.png)



```js
// Employee - name, dept
function Employee() {
  this.name = '';
  this.dept = 'general';
}

// Manager - based on Employee, reports
function Manager() {
  Employee.call(this);
  this.reports = [];
}
// Creating the hierarchy
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

// WorkerBee - based on Employee, projects
function WorkerBee() {
  Employee.call(this);
  this.projects = [];
}
WorkerBee.prototype = Object.create(Employee.prototype);
WorkerBee.prototype.constructor = WorkerBee;

// SalesPerson - based on WorkerBee, quota, dept
function SalesPerson() {
  WorkerBee.call(this);
  this.dept = 'sales';
  this.quota = 100;
}
SalesPerson.prototype = Object.create(WorkerBee.prototype);
SalesPerson.prototype.constructor = SalesPerson;

// Engineer - based on WorkerBee, machine, dept
function Engineer() {
  WorkerBee.call(this);
  this.dept = 'engineering';
  this.machine = '';
}
Engineer.prototype = Object.create(WorkerBee.prototype)
Engineer.prototype.constructor = Engineer;
```

### Creating objects with simple definitions

#### Object hierarchy

![=figure8.3](https://mdn.mozillademos.org/files/10412/=figure8.3.png)

```js
let jim = new Employee;
// Parentheses can be omitted if the constructor takes no argument.
// jim.name is ''
// jim.dept is 'general'

let sally = new Manager;
// sally.name is ''
// sally.dept is 'general'
// sally.reports is []

let mark = new WorkerBee;
// mark.name is ''
// mark.dept is 'general'
// mark.projects is []

let fred = new SalesPerson;
// fred.name is ''
// fred.dept is 'sales'
// fred.projects is []
// fred.quota is 100

let jane = new Engineer;
// jane.name is ''
// jane.dept is 'engineering'
// jane.projects is []
// jane.machine is ''
```

## Object properties

### Inheriting properties

```js
let mark = new WorkerBee;
```

When JavaScript sees the `new` operator, it creates a new generic object and implicitly sets the value of the internal property [[Prototype]] to the value of `WorkerBee.prototype` and passes this new object as the value of the `this` keyword to the `WorkerBee` constructor function.

The internal [[Prototype]] property determines the prototype chain used to return property values.

Once these properties are set, JavaScript returns the new object and the assignment statement sets the variable `mark` to that object.

```js
mark.name = '';
mark.dept = 'general';
mark.projects = [];
```

The `mark` object is assigned local values for the `name` and `dept` properties by the Employee constructor. It is assigned a local value for the `projects` property by the `WorkerBee` constructor.

We can give specific information for `mark` as follows:

```js
mark.name = 'Doe, Mark';
mark.dept = 'admin';
mark.projects = ['navigator'];
```

### Adding properties

In JavaScript, we can add properties to any object at run time.

To add a property that is specific to a single object, we assign a value to the object, as follows:

```js
mark.bonus = 3000;
```

This just the `mark` object has a `bonus` property, but no other `WorkerBee` has this property.

If we add a new property to an object that is being used as the prototype for a constructor function, we add that property to all objects that inherit properties from the `prototype`.

```js
Employee.prototype.specialty = 'none';
```

### More flexible constructors

```js
// Employee
function Employee(name, dept) {
  this.name = name || '';
  this.dept = dept || 'general';
}

// WorkerBee
function WorkerBee(projs) {
  this.projects = projs || [];
}
WorkerBee.prototype = new Employee;

// Engineer
function Engineer(mach) {
  this.dept = 'engineering';
  this.machine = mach || '';
}
Engineer.prototype = new WorkerBee;

let jane = new Engineer('belau');

// Jane's properties are now:
jane.name == '';
jane.dept == 'engineering';
jane.projects == [];
jane.machine == 'belau';
```

We can have the constructor and more properties by directly calling the constructor function for an object higher in the **prototype chain**.

```js
function Engineer(name, projs, mach) {
  this.base = WorkerBee;
  this.base(name, 'engineering', projs);
  this.machine = mach || '';
}

let jane = new Engineer('Doe, Jane', ['navigator', 'javascript'], 'belau');
```

JavaScript follows these steps:

1. The `new` operator creates a generic object and sets its `__proto__` property to `Engineer.prototype`.
2. The `new` operator passes the new object to the `Engineer` constructor as the value of the `this` keyword.
3. The constructor creates a new property called `base` for **that obejct** and assigns the value of the `WorkerBee` constructor to the `base` property. This makes the `WorkerBee` constructor a method of the `Engineer` obejct.
4. The constructor calls the `base` method, passing as its arguments two of the arguments passed to the constructor(`"Doe, Jane"` and `["navigator", "javascript"]`) and also the string `"engineering"`, Explicitly using `"engineering"` in the constructor indicates that all `Engineer` objects have the same value for the inherited `dept` property, and this value overrides the value inherited from `Employee`.
5. Because `base` is a method of `Engineer`, within the call to `base`, JavaScript binds the `this` keyword to the object created in Step 1. Thus, the `WorkerBee` function in turn passes the `"Doe, Jane"` and `"engineering"` arguments to the `Employee` constructor function.
6. Upon return from the `base` method, the `Engineer` constructor initializes the object's `machine` property to `"belau"`.
7. Upon return from the constructor, JavaScript assigns the new object to the `jane` variable.

If we later add properties to the `Employee` or `WorkerBee` prototypes, those properties are note inherited by the `Engineer` object.

```js
function Engineer(name, projs, mach) {
  this.base = WorkerBee;
  this.base(name, 'engineering', projs);
  this.machine = mach || '';
}
let jane = new Engineer('Doe, Jane', ['navigator', 'javascript'], 'belau');
Employee.prototype.specialty = 'none';
```

The `jane` object does not inherit the `specialty` property.

We still need to explicitly(显式的；明确的) set up the prototype to ensure **dynamic inheritance**.

```js
function Engineer(name, projs, mach) {
  this.base = WorkerBee;
  this.base(name, 'engineering', projs);
  this.machine = mach || '';
}
Engineer.prototype = new WorkerBee;
let jane = new Engineer('Doe, Jane', ['navigator', 'javascript'], 'belau');
Employee.prototype.specialty = 'none';
```

Now the value of the `jane` object's `specialty` property is "none".

Another way of inheriting is by using the `call()` / `apply()` methods.

```js
function Engineer(name, projs, mach) {
  this.base = WorkerBee;
  this.base(name, 'engineering', projs);
  this.machine = mach || '';
}

function Engineer(name, projs, mach) {
  WorkerBee.call(this, name, 'engineering', projs);
  this. machine = mach || '';
}
```

## Property inheritance revisited

### Local versus inherited values(本地值与继承值)

```js
function Employee() {
  this.name = '';
  this.dept = 'general';
}

function WorkerBee() {
  this.projects = [];
}

WorkerBee.prototype = new Employee;

let amy = new WorkerBee;
```

The `amy` object has one local property, `projects`. The values for the `name` and `dept` properties are not local to `amy` and so derive from the `amy` object's `__proto__` property.

```js
amy.name == '';
amy.dept == 'general';
amy.projects == [];

// Suppose we change the value of the `name` property in the prototype associated with `Employee`
Employee.prototype.name = 'Unknown';
```

This does not set the new value to propagate(传递) down to all the instances of `Employee`.

When we create *any* instance of the `Employee` object, that instance gets a **local value** for the `name` property (the empty string). This means that when we set the `WorkerBee` prototype by creating a new `Employee` object, `WorkerBee.prototype` has a local value for the `name` property. Therefore, when JavaScript looks up the `name` property of the `amy` object (an instance of `WorkerBee`), JavaScript finds the local value for that property in `WorkerBee.prototype`. It therefore does not look further up the chain to `Employee.prototype`.

```js
function Employee() {
  this.dept = 'general';			// Note that this.name (a local variable) does not appear here
}
Employee.prototype.name = '';	// A single copy

function WorkerBee() {
  this.projects = [];
}
WorkerBee.prototype = new Employee;

let amy = new WorkerBee;
Employee.prototype.name = 'Unknown';
```

In this case, the `name` property of `amy` becomes "Unknown".

### Determining instance relationships

Property lookup in JavaScript looks within an object's own properties and, if the property name is *not found*, it looks within the special object property `__proto__`. This continues **recursively**; the process is called "lookup in the prototype chain".

The special property `__proto__` is set when an object **is constructed**; it is set to the value of the constructor's `prototype` property. So the expression `new Foo()` creates an object with `__proto__ == Foo.prototype`. Consequently, changes to the properties of `Foo.prototype` alters the property lookup for all objects that were created by `new Foo()`.

Every object has a `__proto__` object property (except `Object`); every function has a `prototype` object property.

JavaScript provides a shortcut: the `instanceof` operator tests an object against a function and returns true if the object inherits from the function prototype.

```js
let f = new Foo();
let isTrue = (f instanceof Foo);

let chris = new Engineer('Pigman, Chris', ['jsd'], 'fiji');
// with this object, the following statements are all true
chris.__proto__ == Engineer.prototype;
chris.__proto__.__proto__ == WorkerBee.prototype;
chris.__proto__.__proto__.__proto__ == Employee.prototype;
chris.__proto__.__proto__.__proto__.__proto__ == Object.prototype;
chris.__proto__.__proto__.__proto__.__proto__.__proto__ == null;

// create an `instanceOf` function
function instanceOf(object, constructor) {
  object = object.__proto__;
  while (object != null) {
    if (object == constructor.prototype)
      return true
    if (typeof object == 'xml')
      return constructor.prototype == XML.prototype;
    object = object.__proto__;
  }
  return false;
}

// These expressions are true
instanceOf(chris, Engineer)
instanceOf(chris, WorkerBee)
instanceOf(chris, Employee)
instanceOf(chris, Object)
// This expression is false
instanceOf(chris, SalesPerson)
```

> **Note: **The implementation above checks the type of the object against "xml" in order to work around a quirk(特异；巧合) of how XML objects are represented in recent versions of JavaScript.

### Global information in constructors

When we create constructors, you need to be careful if we set global information in the constructor.

```js
let idCounter = 1;

function Employee(name, dept) {
  this.name = name || '';
  this.dept = dept || 'general';
  this.id = idCounter++;
}

let victoria = new Employee('Pigbert, Victoria', 'pubs');	// victoria.id is 1
let harry = new Employee('Tschopik, Harry', 'sales');			// harry.id is 2

function Employee(name, dept) {
  this.name = name || '';
  this.dept = dept || 'general';
  if (name)
    this.id = idCounter++;
}
```

### No multiple inheritance

Some object-oriented languages allow multiple inheritance. That is, and object can inherit the properties and values from unrelated parent objects. But JavaScript does **not support multiple inheritance**.

Inheritance of property values occurs at **run time** by JavaScript searching the prototype chains of an obejct to find a value. Because an object has **a single associated prototype**, JavaScript **cannot** dynamically inherit from more than one prototype chain.

In JavaScript, you can have a constructor function call more than one other constructor function within it. This gives the illusion(假象) of multiple inheritance.

```js
function Hobbyist(hobby) {
  this.hobby = hobby || 'scuba';
}

function Engineer(name, projs, mach, hobby) {
  this.base1 = WorkerBee;
  this.base1(name, 'engineering', projs);
  this.base2 = Hobbyist;
  this.base2(hobby);
  this.machine = mach || '';
}
Engineer.prototype = new WorkerBee;

let dennis = new Engineer('Doe, Dennis', ['collabra'], 'hugo');

// the `dennis` object has these properties
dennis.name == 'Doe, Dennis';
dennis.dept == 'engineering';
dennis.projects == ['collabra'];
dennis.machine == 'hugo';
dennis.hobby == 'scuba';
```

So `dennis` does get the `hobby` property from the `Hobbyist` constructor. However, assume you then add a property to the `Hobbyist` constructor's prototype:

```js
Hobbyist.prototype.equipment = ['mask', 'fins', 'regulator', 'bcd'];
```

The `dennis` object does not inherit this new property.

