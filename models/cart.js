const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "Cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      //analyze the cart --> find existing product
      const exisitingProductIndex = cart?.products?.findIndex(
        (product) => product.id === id
      );
      const exisitingProduct =
        exisitingProductIndex >= 0
          ? cart.products[exisitingProductIndex]
          : null;
      let updatedProduct;
      //add new product/ increase quantity
      if (exisitingProduct) {
        updatedProduct = { ...exisitingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart?.products];
        cart.products[exisitingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart?.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(productId, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(
        (item) => item.id === productId
      );
      if (!product) {
        return;
      }
      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== productId
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getProducts(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        const cartItems = JSON.parse(fileContent);
        cb(cartItems);
      }
    });
  }
};
