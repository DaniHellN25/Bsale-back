const mysql = require("../db");
//Traemos la función para generar la respuesta que será enviada al cliente
//así también la query base para la consulta SQL para tener un codigo más limpio
const { finalResponse, basicQuery } = require("./utils");


//Buscamos y enviamos un JSON con todos los productos aplicando la función para dar formato
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



//Sabiendo que existen solo 7 posibles ID podemos validar que el valor del param 
//Sea uno aceptable, lo transformamos a número para poder buscarlo en el array validId
//Por ultimo usamos placeholders para hacer la busqueda
const getByCategory = (req, res, next) => {
  const { categoryId } = req.params;
  const categoryIdtoNumber = Number(categoryId)
  const validId = [1,2,3,4,5,6,7]
  if (!validId.includes(categoryIdtoNumber)) {
    res
      .status(403)
      .send({ msg: "categoryId must be a number between 1 and 7" });
  } else {
    const query = `${basicQuery} WHERE product.category = ?`
    mysql.query( query, [categoryIdtoNumber]
      ,
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
//Dado que el nombre del producto se puede buscar tambien si se incluye un numero,  o 
//caracteres especiales en su nombre,  usamos placeholders para realizar la busqueda 
//sin riesgo a una inyección SQL
const getByName = (req, res, next) => {
  const { name } = req.body;
  try {
    if (name.length < 1 && name.length > 50 ) {
      res.status(404).send({ msg: "You must type at least one character" });
    } else {
//Transformamos el string del nombre para que podemaos usarlo en el placeholder      
      const safeName = `%${name}%`
      const query = `${basicQuery} WHERE product.name LIKE ?`
      mysql.query(query,[safeName],
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


//Aqui no utilizamos placeholders porque no hay riesgo de inyección
//dado que somos nosotros quienes proporcionamos la opción de ordenamiento
//Las opciones que otorga el cliente se usan unicamente para decidir que camino tomar
const orderByName = (req, res, next) => {
  const { option } = req.query;
  if (option !== "ASC" && option !== "DESC") {
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
