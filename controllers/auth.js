const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "nmuthukumaranm@gmail.com",
    pass: "",
  },
});

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message) {
    message = message[0];
  } else {
    message = null;
  }
  return res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  console.log("message", message);
  if (message) {
    message = message[0];
  } else {
    message = null;
  }
  return res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({
    email: email,
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(() => {
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password");
          res.redirect("/login");
        })
        .catch((err) => {
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  User.findOne({
    email: email,
  })
    .then((user) => {
      if (user) {
        console.log("flash", req.flash("error", "Email exist already"));
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new User({
            email: email,
            password: hashedPassword,
            cart: {
              items: [],
            },
          });
          return newUser.save();
        })
        .then((result) => {
          res.redirect("/login");
          transporter.sendMail(
            {
              from: "shoping App",
              to: email,
              subject: "Signup succeeded!",
              text: "<h1>Successfully signed up!!</h1>",
            },
            function (error, info) {
              if (error) {
                console.log("email err", error);
              } else {
                console.log("Email sent: " + info.response);
              }
            }
          );
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("dest", err);
    res.redirect("/");
  });
};
