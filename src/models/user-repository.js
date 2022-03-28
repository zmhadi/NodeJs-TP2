const { users } = require('./db');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.getUsers = () => {
  return users;
};

exports.getUserByFirstName = (firstName) => {
  const foundUser = users.find((user) => user.firstName == firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  return foundUser;
};

exports.createUser = (data) => {
  const user = {
    id: uuid.v4(),
    firstName: data.firstName,
    lastName: data.lastName,
    password: bcrypt.hashSync(data.password, 12),
  };

  users.push(user);
};

exports.updateUser = (id, data) => {
  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  foundUser.firstName = data.firstName || foundUser.firstName;
  foundUser.lastName = data.lastName || foundUser.lastName;
  foundUser.password = data.password ? bcrypt.hashSync(data.password, 12) : foundUser.password;
};

exports.deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    throw new Error('User not foud');
  }

  users.splice(userIndex, 1);
}

exports.isAuthentified = (data) => {
  const userData = {
    firstName : data.firstName,
    password: data.password
  }
  const user = users.findIndex((user) => user.firstName == userData.firstName && bcrypt.compareSync(userData.password, user.password))
  if(user >= 0 ) {
    const token = jwt.sign({ data: userData }, 'secret', { expiresIn: '1h' })
    setToken(userData, token)
    return token
  }
  return false
}

function setToken(userData, token) {
  for(let i = 0 ; i<users.length ; i++) {
    if(users[i].firstName == userData.firstName) {
       users[i].accessToken = token 
     } 
  }
}

exports.hasToken = (userData) => {
  for(let i = 0 ; i<users.length ; i++) {
    if(users[i].firstName == userData.firstName) {
       if(users[i].accessToken != undefined) return true
     } 
  }
  return false
}
