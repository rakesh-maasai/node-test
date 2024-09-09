// index.js

// Unused variable
let unusedVar = 42;

// Syntax error
function faultyFunction(
  let x = 10;
) {
  return x * 2;
}

// Logic error
function addNumbers(a, b) {
  return a - b; // This should be a + b
}

// Undefined variable
function printMessage() {
  console.log(message); // 'message' is not defined
}

// Improper error handling
function divideNumbers(a, b) {
  try {
    return a / b;
  } catch (error) {
    console.error('Error dividing numbers');
  }
}

// Use of deprecated method
const fs = require('fs');
fs.existsSync = () => {}; // fs.existsSync is deprecated
