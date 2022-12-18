const { Router, request, response } = require("express");

const Cart = require("../models").cart;
const router = new Router();

// get all cart products

router.get("/", async (request, response, next) => {
  try {
    const item = await Cart.findAll();
    console.log("item", item);

    response.send(item);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});



module.exports = router;
