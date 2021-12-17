const router = require('express').Router();

/* Controllers */
const api = require('../controllers/api');

/* Middlewares */
const { authenticateUser, userIsAdmin, validate } = require('../middlewares/middlewares');

/* Validators */
const { bodyAdmin, bodyEmail, bodyEscape, bodyPassword, paramId } = require('../validators/validators');

// Validates body and params
router.use(validate);

/*
// ROUTES
*/

router.route('/')
    .get(api.getApiHome);

router.post('/login', [ bodyEscape ], validate, api.login);

// Routes for Authenticated users
router.get('/protected', authenticateUser, api.protected);

// User Routes
router.route('/users')
    .all(authenticateUser, userIsAdmin)
    .get(api.getUsers)
    .post([ bodyEscape, bodyPassword, bodyAdmin, bodyEmail ], validate, api.newUser);

router.route('/users/:id')
    .put([ paramId, bodyEscape, bodyAdmin, bodyEmail ], validate, api.editUser);

module.exports = router;