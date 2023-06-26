exports.get404 = (req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  return res.render("404", {
    pageTitle: "Page Not Found",
    path: "",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  return res.status(500).render("500", {
    pageTitle: "Error",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};
