const passport = require('passport');
const { validationResult } = require('express-validator');

exports.authenticateUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) { return next(err) };
        if (!user) { return res.status(401).json({ success: false, msg: 'Non sei autorizzato a visualizzare questa risorsa' }) };
        // Forward user information to the next middleware
        req.user = user;
        next()
    })(req, res, next);
};

exports.userIsAdmin = (req, res, next) => {
    return req.user.admin ? 
        next() 
        : res.status(401).json({ success: false, msg: 'Questa risorsa è riservata agli admin' });
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array(), msg: errors.array()[0].msg });
    }
    next();
}
