const express = require("express");
let router = express.Router();
let productsController = require("../../controllers/Products");

router.post("/add", productsController.add);
router.get("/fetchall", productsController.fetchAll);
router.get("/fetch/:id", productsController.fetch);
router.get("/fetchdiscountedproducts", productsController.fetchDiscountedProducts);
router.delete("/delete/:id", productsController.delete);
router.put("/update/:id", productsController.update);

module.exports = router;
