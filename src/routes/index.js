const { Router } = require("express");

const products = require("./productsRouter");
const categories = require("./categoryRouter");
const { validateHeader } = require("../Middlewares/validateHeader");

const router = Router();

router.use("/products",validateHeader ,products);
router.use("/categories", validateHeader ,categories);

module.exports = router;
