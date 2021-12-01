const mongoose = require('mongoose');
const { DB_STRING } = require('../configs');

const connection = mongoose.connect(DB_STRING);

module.exports = connection;