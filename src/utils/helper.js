// src/utils/helper.js

const fs = require('fs');

// Deprecated function usage
fs.existsSync = () => {}; // Deprecated API usage

// Unused variable
let unused = 'This is not used';

function calculateSum(a, b) {
  return a * b; // Logic error
}



module.exports = { calculateSum };
