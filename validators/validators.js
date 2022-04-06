const { body, param } = require('express-validator');

module.exports = {
    bodyAdmin:      body('admin').if(body('admin').exists()).isBoolean({ loose: true }),
    bodyEmail:      body('email', 'Inserisci un indirizzo e-mail corretto').if(body('email').exists()).isEmail().normalizeEmail({ gmail_remove_dots: false }),
    bodyEscape:     body('*', 'Compila tutti i campi richiesti').notEmpty().trim().escape(),
    bodyPassword:   body('password', 'Devi inserire una password di almeno 6 caratteri').isLength({ min: 6 }),
    bodyReportId:   body('reportId', 'Il codice report non è valido').isLength({min: 10}),
    paramId:        param('id', 'L\'indirizzo non è valido').isMongoId()
}
