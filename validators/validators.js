const { body, param } = require('express-validator');

module.exports = {
    bodyAdmin:      body('admin').isBoolean({ loose: true }),
    bodyEmail:      body('email').isEmail().normalizeEmail(),
    bodyEscape:     body('*', 'Compila tutti i campi richiesti').notEmpty().trim().escape(),
    bodyPassword:   body('password', 'Devi inserire una password di almeno 6 caratteri').isLength({ min: 6 }),
    paramId:        param('id', 'L\'indirizzo non è valido').isMongoId()
}
