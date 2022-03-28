const bcrypt = require('bcryptjs');
const uuid = require('uuid');

exports.users = [
    {
        id: uuid.v4(),
        firstName : "root",
        lastName: "",
        password : bcrypt.hashSync("admin", 12),
        accessToken: "undefined"
    }
];
