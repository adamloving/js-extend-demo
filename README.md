# Simple Javascript Inheritance

## Problem

Make class inheritance in Javascript as easy as CoffeeScript.

```coffeescript
class A
  @name = 'apple'

class B extends A
  constructor:
    super()
    @data = 'mydata'
```

To do the same thing in JS requires...

```js
function A() {
  this.name = 'apple';
}; // constructor function

function B() { 
  A.call(this);
  this.data = 'banana';
}

B.prototype = new A();
```

It's hard to get the hang of. 
The instance assigned into B.prototype becomes the object to be copied
into new instances of B. 
Using ```A.call(this)``` in the constructor is funky. 
Same with ```B.prototype.method.call(this)``` to call super class methods.

I had two _Aha!_ moments understanding prototype based inheritance:

1. Only functions (AKA constructors) have prototypes. Instances don't have them.
2. ```function X() {}``` always runs before ```var X = function();``` (duh, right?)

### Requirements for simplifying syntax

* Simpler syntax for `B.prototype = new A();`
* Avoid (preferably with a `super` method): 
  * `A.call(this)` // call super constructor
  * `A.prototype.method.call(this)` // call super's method
* Copy class data and methods (on class, not instance)
* Preserve instanceof operator

## Alternatives

* CoffeeScript `__extends` - _not quite librifiable since generates code_
* node's `util.inherits` - _doesn't copy data, just functions_
* lodash `_.create` - _[half of the puzzle](http://lodash.com/docs#create) still requires knowledge of prototype_
* John Resig's `Class.extend` - [Winner](http://ejohn.org/blog/simple-javascript-inheritance/)!