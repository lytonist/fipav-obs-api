require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 4000,
    DB_STRING: process.env.DB_STRING
}