const mysql = require("../db");

const { finalResponse, basicQuery } = require("./utils");

const getAll = (req, res, next) => {
  mysql.query(`${basicQuery} ORDER BY category.id`, (error, response) => {
    if (error) {
      next(error);
    } else {
      const responseWithDiscount = finalResponse(response);
      res.status(200).json(responseWithDiscount);
    }
  });
};

const getByCategory = (req, res, next) => {
  const { categoryId } = req.params;
  console.log(Number(categoryId));
  if (Number(categoryId) < 1 || Number(categoryId) > 7 || !Number(categoryId)) {
    res
      .status(404)
      .send({ msg: "categoryId must be a number between 1 and 7" });
  } else {
    mysql.query(
      `${basicQuery} WHERE product.category = ${categoryId}`,
      (error, response) => {
        if (error) {
          next(error);
        } else {
          const responseWithDiscount = finalResponse(response);
          res.status(200).json(responseWithDiscount);
        }
      }
    );
  }
};

const getByName = (req, res, next) => {
  const { name } = req.body;
  try {
    if (name.length < 1) {
      res.status(404).send({ msg: "You must type at least one character" });
    } else {
      mysql.query(
        `${basicQuery} WHERE product.name LIKE '%${name}%'`,
        (error, response) => {
          if (error) {
            next(error);
          } else {
            if (!response.length) {
              res.status(404).json({ msg: "No products found" });
            } else {
              const responseWithDiscount = finalResponse(response);
              res.status(200).json(responseWithDiscount);
            }
          }
        }
      );
    }
  } catch (error) {
    res.status(404).send({ msg: "name must be send" });
  }
};

const orderByName = (req, res, next) => {
  const { option } = req.query;
  if (option != "ASC" && option != "DESC") {
    res.status(404).send({ msg: "Must choose ASC or DESC" });
  } else {
    if (option == "ASC") {
      mysql.query(
        `${basicQuery} ORDER BY product.name ASC`,
        (error, response) => {
          if (error) {
            next(error);
          } else {
            const responseWithDiscount = finalResponse(response);
            res.status(200).json(responseWithDiscount);
          }
        }
      );
    } else {
      mysql.query(
        `${basicQuery} ORDER BY product.name DESC`,
        (error, response) => {
          if (error) {
            next(error);
          } else {
            const responseWithDiscount = finalResponse(response);
            res.status(200).json(responseWithDiscount);
          }
        }
      );
    }
  }
};

module.exports = {
  getAll,
  getByCategory,
  getByName,
  orderByName,
};
