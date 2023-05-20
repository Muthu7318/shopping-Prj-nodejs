const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;

  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((res) => res.redirect("/"))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log("***  admin.js [20] ***", editMode);
  if (!!!editMode) {
    return res.redirect("/");
  }

  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: !!editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  Product.deleteById(productId);
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
