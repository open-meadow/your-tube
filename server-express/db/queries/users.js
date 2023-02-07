const db = require("../connection");

// Get all users
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

// Get user by name
const getUserByName = (username) => {
  return db
    .query(
      `SELECT username
        FROM users 
        WHERE username = $1;`,
      [username]
    )
    .then((data) => {
      return data.rows;
    });
};

// Get user by name
const getUserById = (id) => {
  return db
    .query(
      `SELECT username
        FROM users 
        WHERE id = $1;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getUsers, getUserByName, getUserById };
