// src/controllers/userController.js

const userService = require('../services/userService');

function getUser(req, res) {
  const userId = req.params.id;
  userService.findUserById(userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).send('Error occurred'); // Improper error handling
    });
}

module.exports = { getUser };
