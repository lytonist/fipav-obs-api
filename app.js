const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const {PORT} = require('./configs');

/*
**  GENERAL SETUP
*/

const app = express();

require('./config/database');
require('./config/passport')(passport);

app.use(passport.initialize());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

/*
** ROUTES
*/

const apiRoutes = require('./routes/api');
app.use('/api/v1/', apiRoutes);

/*
** ERROR HANDLING
*/
app.use((req, res, next) => {
    res.status(404);
    res.json({error: 'Not Found'});
})

app.use((err, req, res, next) => {
    res.status(500);
    res.json({success: false, msg: 'Something went wrong'});
});

/*
** SERVER
*/

app.listen(PORT, () => {
    console.log(`Server running and listening at port ${PORT}`);
});