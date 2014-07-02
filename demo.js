'use strict';
var assert = require('assert');

// A function is (can be) a constructor. 
function A() {
  this.name = 'apple';
}; // constructor function

// Instances constructed from it will use the prototype.
// Who made A's prototype? I don't care, but it's an new Object().
A.prototype.run = function() {
  return this.name;
}

// B is defined below! (function declaration runs first)
B.prototype = new A(); // B extends A

function B() { 
  A.call(this); // call super constructor
  this.data = 'banana';
}

B.prototype.run = function() {
  return A.prototype.run.call(this) + ' ' + this.data; // super()
}

var b = new B();

assert(b.name == 'apple');
assert(b.prototype == undefined); // instances don't have prototypes!
assert(b.run() == 'apple banana');

var a = new A();
assert(a.run() == 'apple');

// I guess it is good that changes to the prototype are ignored?
B.prototype.name = 'ignored';
assert(B.prototype.name == 'ignored');
var b2 = new B();
assert(b2.name == 'apple');