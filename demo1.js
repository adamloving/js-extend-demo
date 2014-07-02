'use strict';
var assert = require('assert');

var A = function () {
  this.name = 'apple';
}; // constructor function

A.prototype.run = function() {
  return this.name;
}

var B = function() { 
  A.call(this); // call super constructor
  this.data = 'banana';
}

B.prototype = new A(); // B extends A

B.prototype.run = function() {
  A.prototype.run.call(this);
  return this.data;
}

var b = new B();

assert(b.name == 'apple');
assert(b.prototype == undefined); // kinda confusing
assert(b.run() == 'banana');

var a = new A();
assert(a.run() == 'apple');

// A prototype on a constructor behaves differently than a prototype on an instance!
var c = { name: 'canary', data: 'castle' };
// c is an instance of object, you can't set it's prototype.


// A function is (can be) a constructor. Instances constructed from it will use the prototype!