var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {  
  req.session.username = "Jorge";  
  res.render('index', {
    title: "Chat Application"
  });
});

module.exports = router;
