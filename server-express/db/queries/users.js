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
      ["BigJim48"]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getUsers, getUserByName };
