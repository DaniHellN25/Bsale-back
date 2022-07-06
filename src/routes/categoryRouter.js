const { Router } = require("express");
const { getAll } = require("../controllers/categoryControllers");
const categoryRouter = Router();

categoryRouter.get("/", getAll);

module.exports = categoryRouter;
