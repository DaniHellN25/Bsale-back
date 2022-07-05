const { Router } = require("express");
//trae las funciones
const categoryRouter = Router();

categoryRouter.get("/", getAll);

module.exports = categoryRouter;
