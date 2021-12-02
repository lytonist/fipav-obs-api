const router = require('express').Router();
const passport = require('passport');
const api = require('../controllers/api');

router.route('/')
    .get(api.getApiHome);

router.post('/register', api.register);

router.post('/login', api.login);

router.get('/protected', passport.authenticate('jwt', { session: false }), api.protected);

module.exports = router;