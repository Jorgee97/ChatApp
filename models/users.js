const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UsersModelSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
});

var UserModel = mongoose.model('Users', UsersModelSchema);

module.exports = UserModel;