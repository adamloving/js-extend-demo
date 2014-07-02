'use strict';

require('./extend');
var assert = require('assert');

var A = Class.extend({
  init: function() {
    this.name = 'apple';  
  },
  run: function() {
    return this.name;
  }
});

// class data
A.CLASS_DATA = 'something'; 

// class function
A.classFn = function () { 
  return 'bonus';
}; 

var B = A.extend({
  run: function() {
    return this._super() + ' banana';
  }
})

var b = new B();

assert(b instanceof A);
assert(b instanceof B);
assert(b.name == 'apple');
assert(b.run() == 'apple banana');

// as a bonus, we have data and other functions stored on the class
assert(B.CLASS_DATA == 'something');
assert(B.classFn() == 'bonus');