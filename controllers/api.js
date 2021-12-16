const { genPassword, issueJWT, validPassword } = require('../lib/utils');
const { User } = require('../models/users');

exports.getApiHome = (req, res) => {
    res.json({msg: 'Welcome!'});
}

exports.register = (req, res) => {
    console.log(req.body)
    const { username, password, firstname, lastname, email } = req.body;
    const { salt, hash } = genPassword(password);
    const newUser = new User({ 
        username, 
        hash, 
        salt, 
        firstname,
        lastname,
        email,
        admin: req.body.admin ? req.body.admin : false 
    });
    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({success: false, msg: 'Per favore verifica i dati inseriti'});
        };
        res.json({success: true, user});
    });
}

exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user, next) => {
        if (err) { next(err) };
        if (!user) {
            return res.status(401).json({ success: false, msg: 'L\'utente non è stato trovato' });
        }
        
        const isValid = validPassword(req.body.password, user.hash, user.salt);

        if (isValid) {
            const tokenObject = issueJWT(user);
            const userObj = { _id: user._id, username: user.username };
            res.status(200).json({ success: true, token: tokenObject, expiresIn: tokenObject.expires, user: userObj });
        } else {
            res.status(401).json({ success: false, msg: 'La password non è corretta' });
        }
    });
}

exports.protected = (req, res) => {
    const userObj = { _id: req.user._id, username: req.user.username };
    res.status(200).json({ success: true, msg: 'You are authorized', user: userObj });
}

exports.getUsers = (req, res) => {
    User.find({}, 'username admin firstname lastname email', { sort: { admin: -1, lastname: 1 } }, (err, users) => {
        if (err) { next(err) };
        if (!users) {
            return res.status(404).json({ success: false, msg: 'Nessun utente trovato' });
        }
        res.status(200).json({ success: true, users: users });
    });
}
