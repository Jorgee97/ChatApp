const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { createdAt: 'created_at' },
}

var MessagesModelSchema = new Schema({
    username: String, // The user that sends the message    
    message: String
}, schemaOptions);

var MessagesModel = mongoose.model('Messages',  MessagesModelSchema);

module.exports = MessagesModel;