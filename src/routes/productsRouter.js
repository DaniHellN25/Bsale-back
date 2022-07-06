const { Router } = require("express");
const {getAll, getByCategory, getByName, orderByName} = require('../controllers/productsControllers')
const productsRouter = Router();

productsRouter.get("/", getAll);
productsRouter.get("/:categoryId", getByCategory);
productsRouter.post("/", getByName);
productsRouter.get("/order/name", orderByName);

module.exports = productsRouter;
