const user =require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
  };

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new user({ email, username });
    const registeredUser = await user.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    if (e.name === "UserExistsError") {
      req.flash(
        "error",
        "A user with the given username is already registered"
      );
    } else {
      req.flash("error", e.message);
    }
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
  };

  module.exports.login =async (req, res) => {
    req.flash("success", "Welcome  back to Wanderlust! ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl );
  }

  module.exports.logout =(req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", " You are Logged  out!");
      res.redirect("/listings");
    });
};