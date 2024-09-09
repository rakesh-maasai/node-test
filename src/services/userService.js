// src/services/userService.js

const userModel = require('../models/userModel');

function findUserById(id) {
  if (!id) {
    throw new Error('Invalid ID'); // Error thrown but not handled
  }

  return userModel.getUserById(id); // Logic error, return is not properly handled
}

module.exports = { findUserById };
