const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refereesSchema = new Schema({
    firstname: {type: String, default: '', required: true},
    lastname: {type: String, default: '', required: true},
    email: {type: String, default: '', required: true, unique: true}
});

exports.Referee = mongoose.model('Referee', refereesSchema);