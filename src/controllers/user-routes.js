const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');

router.get('/', (req, res) => {
  res.send(userRepository.getUsers())
});

router.post('/login',(req, res) => {
  console.log(req.body)
  if(userRepository.isAuthentified(req.body) == false) {
    res.status(401).end()
  }
  userRepository.isAuthentified(req.body)
  res.status(201).send({accessToken : userRepository.isAuthentified(req.body)});
})

router.get('/:firstName', (req, res) => {
  const foundUser = userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post('/', (req, res) => {
  userRepository.createUser(req.body);
  res.status(201).end();
});

router.put('/:id', (req, res) => {
  userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => {
  return router;
}
