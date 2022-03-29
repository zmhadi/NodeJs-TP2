const { users } = require('./db');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.getUsers = () => {
  return users;
};

exports.getUserByFirstName = (firstName) => {
  const foundUser = users.find((user) => user.firstName == firstName);
  return foundUser;
};

exports.createUser = (data) => {
  if(exports.getUserByFirstName(data.firstName) != undefined) {
    throw new Error('User already exist');
  }
  const user = {
    id: uuid.v4(),
    firstName: data.firstName,
    lastName: data.lastName,
    password: bcrypt.hashSync(data.password, 12),
    roles : data.roles || "MEMBER"
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
  foundUser.roles = data.roles || foundUser.roles
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
    const token = jwt.sign({ data: userData }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_DURATION })
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

exports.isAdmin = (token) => {
  for(let i = 0 ; i<users.length ; i++) {
    if(("Bearer " + users[i].accessToken == token) && (users[i].roles == "ADMIN")) {
      return true
    }
  }
  return false
}
