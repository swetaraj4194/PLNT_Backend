const { Router, request, response } = require("express");
const Products = require("../models").product;
const Cart = require("../models").cart;
const router = new Router();
// get all products

router.get("/", async (request, response, next) => {
  try {
    const product = await Products.findAll();

    response.send(product);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//get a specific product with it's id

router.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await Products.findByPk(id);
    response.send(product);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//add to cart

router.post("/cart", async (request, response, next) => {
  const { title, price, description, image } = request.body;

  console.log("swetaTitle", request.body);

  try {
    const findProduct = await Cart.create({
      title,
      price,
      description,
      image,
    });

    return response.status(201).send({ message: "product added", findProduct });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//delete cart product
router.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const productToDelete = await Cart.findByPk(id);

    if (!productToDelete) {
      return response.status(404).send("no product found");
    }

    await productToDelete.destroy();

    response.send({
      message: `deleted product with id ${id}`,
    });
  } catch (e) {
    response.status(500).send({ error: e });
    console.log(e.message);
    next(e);
  }
});
module.exports = router;
