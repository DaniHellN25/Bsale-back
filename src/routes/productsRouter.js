const { Router } = require("express");
//trae las funciones
const productsRouter = Router();

productsRouter.get("/", getAll);
productsRouter.get("/:categoryId", getByCategory);
productsRouter.get("/", getByName);
productsRouter.get("/", orderByName);

module.exports = productsRouter;
