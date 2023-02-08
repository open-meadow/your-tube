const db = require("../connection");

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

module.exports = { getUserByName };
