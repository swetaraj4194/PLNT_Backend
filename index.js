const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const productRouter = require("./routers/product");
const cartRouter = require("./routers/cart");

app.use(express.json());

app.use(cors());

app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => console.log(`Listining on port: ${PORT}`));
