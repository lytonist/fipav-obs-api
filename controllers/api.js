const { genPassword, issueJWT, randomString, validPassword } = require('../lib/utils');
const { Referee } = require('../models/referees');
const { Report } = require('../models/reports');
const { User } = require('../models/users');

exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user, next) => {
        if (err) { next(err) };
        if (!user) {
            return res.status(401).json({ success: false, msg: 'L\'utente non è stato trovato' });
        }
        
        const isValid = validPassword(req.body.password, user.hash, user.salt);

        if (isValid) {
            const tokenObject = issueJWT(user);
            const userObj = { _id: user._id, username: user.username, admin: user.admin };
            res.status(200).json({ success: true, token: tokenObject, expiresIn: tokenObject.expires, user: userObj });
        } else {
            res.status(401).json({ success: false, msg: 'La password non è corretta' });
        }
    });
}

exports.protected = (req, res) => {
    const userObj = { _id: req.user._id, username: req.user.username, admin: req.user.admin };
    res.status(200).json({ success: true, msg: 'You are authorized', user: userObj });
}

/*
// USER ROUTES
*/

exports.getUsers = (req, res) => {
    User.find({}, undefined, { sort: { admin: -1, lastname: 1 } }, (err, users) => {
        if (err) {
            console.error(err);
            return res.status(500).json({success: false, msg: 'Per favore verifica i dati inseriti'});
        };
        res.status(200).json({ success: true, users: users });
    });
}

exports.newUser = (req, res) => {
    const { username, password, firstname, lastname, committee, role, email } = req.body;
    const { salt, hash } = genPassword(password);
    const newUser = new User({ 
        username, 
        hash, 
        salt, 
        firstname,
        lastname,
        committee,
        role,
        email,
        admin: req.body.admin ? req.body.admin : false 
    });
    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({success: false, msg: 'Per favore verifica i dati inseriti'});
        };
        res.status(200).json({success: true, user});
    });
}

exports.editUser = (req, res) => {
    const { id } = req.params;
    if (req.body.password) {
        // Reset with a random password
        const newPassword = randomString();
        const { salt, hash } = genPassword(newPassword);
        req.body.salt = salt;
        req.body.hash = hash;
        delete req.body.password;
    }
    User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
        if (err) return console.error(err);
        if (!user) return res.status(404).json({success: false, msg: 'L\'utente non è stato trovato'});
        res.status(200).json({success: true, user});
    });
}

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id, (err, user) => {
        if (err) return console.error(err);
        if (!user) return res.status(404).json({success: false, msg: 'L\'utente non è stato trovato'});
        res.status(200).json({success: true});
    });
}

/*
// REFEREES ROUTES
*/

exports.getReferees = (req, res) => {
    Referee.find({}, undefined, { sort: { lastname: 1 } }, (err, referees) => {
        if (err) { next(err) };
        res.status(200).json({success: true, referees: referees});
    });
}

exports.newReferee = (req, res) => {
    const { firstname, lastname, committee, email } = req.body;
    const newReferee = new Referee({ firstname, lastname, committee, email });
    newReferee.save((err, referee) => {
        if (err) {
            console.error(err);
            return res.status(500).json({success: false, msg: 'Per favore verifica i dati inseriti'});
        }
        res.status(200).json({success: true, referee: referee});
    });
}

exports.editReferee = (req, res) => {
    const { id } = req.params;
    Referee.findByIdAndUpdate(id, req.body, { new: true }, (err, referee) => {
        if (err) return console.error(err);
        if (!referee) return res.status(404).json({success: false, msg: 'L\'arbitro non è stato trovato'});
        res.status(200).json({success: true, referee});
    });
}

exports.deleteReferee = (req, res) => {
    const { id } = req.params;
    Referee.findByIdAndDelete(id, (err, referee) => {
        if (err) return console.error(err);
        if (!referee) return res.status(404).json({success: false, msg: 'L\'arbitro non è stato trovato'});
        res.status(200).json({success: true});
    });
}

/*
// REPORTS ROUTES
*/
exports.getReports = (req, res) => {
    // req.user.admin
    const query = req.query || {};
    Report.find(query, (err, reports) => {
        if (err) { next(err) };
        res.status(200).json({success: true, reports: reports});
    });
}

exports.newReport = (req, res) => {
    const newReport = new Report(req.body);
    newReport.save((err, report) => {
        if (err) {
            console.error(err);
            return res.status(500).json({success: false, msg: 'Per favore verifica i dati inseriti'});
        }
        res.status(200).json({success: true, report: report});
    });
}
