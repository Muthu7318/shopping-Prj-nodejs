const { getDb } = require("../util/database");
const mongodb = require("mongodb");
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();

    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    console.log("test --2", prodId);
    const productId = prodId.trim();
    return db
      .collection("products")
      .findOne({
        _id: new mongodb.ObjectId(productId),
      })
      .then((product) => {
        console.log("test----", product);
        return product;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
