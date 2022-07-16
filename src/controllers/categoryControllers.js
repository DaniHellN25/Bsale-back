const mysql = require("../db");
//Buscamos y mandamos todas las categorías al front
const getAll = async (req, res, next) => {
  try {
    mysql.query("SELECT * FROM category", (error, response) => {
      if (error) {
        next(error);
      } else {
        res.status(200).json(response);
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
