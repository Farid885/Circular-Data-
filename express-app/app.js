import express from "express";
import fs from "fs/promises";

const myApp = express();

const products = [];

async function hydrateData() {
  const fileContents = await fs.readFile("products.json");
  
  const stringContent = fileContents.toString();
  products.push(...JSON.parse(stringContent));
}

myApp.use(express.json());

myApp.get("/api/farid", (req, res) => {
  res.send({
    message: "Hello world",
  });
});

myApp.post("/api/add-product", async (req, res) => {
  const product = req.body;

  if ("id" in product && "name" in product) {
    products.push(req.body);

    await fs.writeFile("products.json", JSON.stringify(products, null, 2));

    res.send({
      message: "Product successfully added",
    });
  } else {
    res.status(400).send({
      message: "Invalid data",
    });
  }
});

myApp.get("/api/product-list", (req, res) => {
  res.send(products);
});

hydrateData().then(() => {
  myApp.listen(5005, () => {
    console.log("app started at 5005 port");
  });
});
