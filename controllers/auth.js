const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  return res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("64735cd7ab756b73b4cefb77")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    })
    .catch((err) => console.log(err));
};
