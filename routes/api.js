const router = require('express').Router();
const api = require('../controllers/api');

router.route('/')
    .get(api.getApiHome);

router.post('/register', api.register);

router.post('/login', api.login);

module.exports = router;