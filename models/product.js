const { getDb } = require("../util/database");
const mongodb = require("mongodb");
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    console.log("test---5", this._id);
    if (this._id) {
      dbOp = db.collection("products").updateOne(
        { _id: this._id },
        {
          $set: this,
        }
      );
    } else {
      console.log("test--- 4", this);
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
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

  static deleteById(prodId) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({
        _id: new mongodb.ObjectId(prodId),
      })
      .then((result) => {
        console.log("Deleted !!");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
