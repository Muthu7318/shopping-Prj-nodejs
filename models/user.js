const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; //{items:[]}
    this._id = id;
  }

  save() {
    const db = getDb();

    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("user saved");
      })
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cartProd=>{
    //   return cartProd._id === product._id;
    // })

    const updatedCart = {
      items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }],
    };
    const db = getDb();
    return db.collection("users").updateOne(
      {
        _id: new mongodb.ObjectId(this._id),
      },
      {
        $set: {
          cart: updatedCart,
        },
      }
    );
  }

  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({
        _id: new mongodb.ObjectId(userId),
      })
      .then()
      .catch((err) => console.log(err));
  }
}

module.exports = User;
