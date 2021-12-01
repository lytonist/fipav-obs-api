const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {type: String, unique: true, required: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
    admin: {type: Boolean, default: false}
});

exports.User = mongoose.model('User', usersSchema);