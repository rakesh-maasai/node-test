// src/models/userModel.js

// Missing import
const db = require('../db'); // db module does not exist

// Syntax error
function getUserById(id {
  // Logic error, missing return statement
  const query = `SELECT * FROM users WHERE id = ${id}`;
  db.query(query);
}

module.exports = { getUserById };
