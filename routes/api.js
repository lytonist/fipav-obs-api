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

router.post('/login', [ bodyEscape ], validate, api.login);

// Routes for Authenticated users
router.get('/protected', authenticateUser, api.protected);

// Users Routes
router.route('/users')
    .all(authenticateUser, userIsAdmin)
    .get(api.getUsers)
    .post([ bodyEscape, bodyPassword, bodyAdmin, bodyEmail ], validate, api.newUser);

router.route('/users/:id')
    .all(authenticateUser, userIsAdmin)
    .patch([ paramId, bodyEscape, bodyAdmin, bodyEmail ], validate, api.editUser)
    .delete([ paramId ], validate, api.deleteUser);

// Referees Routes
router.route('/referees')
    .get(authenticateUser, api.getReferees)
    .post(authenticateUser, userIsAdmin, api.newReferee);

router.route('/referees/:id')
    .all(authenticateUser, userIsAdmin)
    .patch([ paramId, bodyEscape, bodyEmail ], validate, api.editReferee)
    .delete([ paramId ], validate, api.deleteReferee);

// Reports Routes
router.route('/reports')
    .get(api.getReports)
    .post(authenticateUser, api.newReport);

router.route('/reports/:id')
    .all(authenticateUser)
    .patch([ paramId ], validate, api.editReport)
    .delete([ paramId ], validate, api.deleteReport);

module.exports = router;