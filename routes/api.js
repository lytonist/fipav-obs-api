const router = require('express').Router();

// Controllers
const api = require('../controllers/api');

// Middlewares
const { authenticateUser, userIsAdmin } = require('../middlewares/middlewares');

router.route('/')
    .get(api.getApiHome);

router.post('/register', authenticateUser, userIsAdmin, api.register);

router.post('/login', api.login);

// Routes for Authenticated users
router.get('/protected', authenticateUser, api.protected);

router.get('/users', authenticateUser, userIsAdmin, api.getUsers);

module.exports = router;