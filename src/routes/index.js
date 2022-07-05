const { Router } = require("express");

const products = require("./productsRouter");
const categories = require("./categoryRouter");

const router = Router();

router.use("/products", products);
router.use("/categories", categories);

module.exports = router;
