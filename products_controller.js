//here i am using module_exportto export objects with the following five methodscreate -> create_product.sql.
//and making sure that i am using the corresponding sql
// getOne -> read_product.sql.
// getAll -> read_products.sql.
// update -> update_product.sql.
// delete -> delete_product.sql.
//   create: (req, res, next) => {
//     const db = req.app.get("db");

module.exports = {
  create: (req, res, next) => {
    const db = req.app.get("db");
    const { name, description, price, image_url } = req.body;
    db.create_product([name, description, price, image_url])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong!" });
        console.log(err);
      });
  },

  getOne: (req, res, next) => {
    const db = req.app.get("db");
    const { params } = req;
    db.read_product(params.id)
      .then(product => res.status(200).send(product))
      .catch(err => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong!" });
        console.log(err);
      });
  },

  getAll: (req, res, next) => {
    const db = req.app.get("db");
    db.read_products()
      .then(products => res.status(200).send(products))
      .catch(err => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong!" });
        console.log(err);
      });
  },

  update: (req, res, next) => {
    const db = req.app.get("db");
    const { params, query } = req;
    db.update_product([params.id, query])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong!" });
        console.log(err);
      });
  },

  delete: (req, res, next) => {
    const db = req.app.get("db");
    const { params } = req;
    db.delete_product(params.id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({
          errorMessage: "Oops! Something went wrong!"
        });
        console.log(err);
      });
  }
};
