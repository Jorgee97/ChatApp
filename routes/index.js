var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  // Checking if the user is logged in, if session doesn't exist I send him to the login screen.
  if (!req.session.username) {
    res.redirect("/users");
  } else {
    res.render("index", {
      title: "Chat Application",
      welcome: "Welcome back " + req.session.username
    });
  }
});

module.exports = router;
