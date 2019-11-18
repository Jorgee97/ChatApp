const Users = require('../../models/users');

const { generateRandomString, sha512 } = require('../../utils/stringHelpers');

const createUser = (username, password, req, res) => {
    let salt = generateRandomString(20);
    let hashedPassword = sha512(password, salt);
    Users.create({
        username,
        password: hashedPassword,
        salt
    }).then(() => {
        res.redirect('/users');
    }).catch(e => {
        console.error("There was an error trying to create the user.", e);
        res.render('register', {
            title: "Chat Application - Register",
            errorMessage: "There was an error trying to create the user."
        });
    })
}

module.exports = {
    register(req, res) {
        const { username, password } = req.body;
        // Validate if username already exist
        Users.findOne({ username: username}, 'username')
        .then(user => {
            if (user) {
                res.render('register', {
                    title: "Chat Application - Register",
                    errorMessage: "The username already exist."
                });
            }
            else {
                // if username is unique, create one
                createUser(username, password, req, res);                
            }
        });
    },
    login(req, res) {
        const { username, password } = req.body;
        Users.findOne({ username: username })
        .then(user=> {
            if (user) {
                let hashedPassword = sha512(password, user.salt);
                Users.findOne({ username: username, password: hashedPassword }, ['username', '_id'])
                .then(userInfo => {
                    if (userInfo) {
                        req.session.username = userInfo.username;
                        req.session._id = userInfo._id;
                        res.redirect('/');
                    } else{
                        res.render('login', {
                            title: 'Chat Application - Login',
                            errorMessage: "User not found, validate your username and password."
                        });                        
                    }
                });
            } else {
                res.render('login', {
                    title: 'Chat Application - Login',
                    errorMessage: "User not found, validate your username and password."
                });
            }
        });
    },
    logout(req, res) {
        req.session.destroy(err => {
            if (!err) req.session = null;
        })
    }
};