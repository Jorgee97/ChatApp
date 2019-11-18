var express = require('express');
var router = express.Router();

const UserController = require('../controllers/users');

router.get('/', (req, res) => {
  res.render('login', {
    title: 'Chat Application - Login'
  });
});
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Chat Application - Register'
  });
});
router.get('/logout', UserController.logout);
router.post('/register/create', UserController.register);
router.post('/login', UserController.login);


module.exports = router;
