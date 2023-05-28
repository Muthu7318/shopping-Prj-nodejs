const mongoose = require("mongoose");
const { schema } = require("./product");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  console.log("test--", this);
  const cartProductIndex = this.cart.items.findIndex((cartProd) => {
    return cartProd.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (productId) {
  console.log("test---8", productId);
  const updatedCartItems = this.cart.items.filter((item) => {
    console.log(item.productId.toString());
    return item.productId.toString() !== productId.toString();
  });
  console.log("test---7", updatedCartItems);
  this.cart.items = updatedCartItems;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const mongodb = require("mongodb");

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; //{items:[]}
//     this._id = id;
//   }

//   save() {
//     const db = getDb();

//     return db
//       .collection("users")
//       .insertOne(this)
//       .then((result) => {
//         console.log("user saved");
//       })
//       .catch((err) => console.log(err));
//   }

//

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = {
//           items: [],
//         };
//         return db.collection("users").updateOne(
//           {
//             _id: new mongodb.ObjectId(this._id),
//           },
//           {
//             $set: {
//               cart: {
//                 items: [],
//               },
//             },
//           }
//         );
//       });
//   }

//   getOrders() {
//     const db = getDb();

//     return db
//       .collection("orders")
//       .find({
//         "user._id": new mongodb.ObjectId(this._id),
//       })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDb();

//     return db
//       .collection("users")
//       .findOne({
//         _id: new mongodb.ObjectId(userId),
//       })
//       .then()
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = User;
