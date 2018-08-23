const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
const pc = require("./products_controller");
massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log(err));
// here we have to create end points to call the methods in our controller;
//   GET - /api/products - getAll.
// GET - /api/product/:id - getOne.
// PUT - /api/product/:id?desc=... - update.
// POST - /api/product - create.
// DELETE - /api/product/:id - delete.
// will be refering the top to avoid errors
app.post("/api/product", pc.create);
app.get("/api/products", pc.getAll);
app.get("/api/product/:id", pc.getOne);
app.put("/api/product/:id", pc.update);
app.delete("/api/product/:id", pc.delete);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
