const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

// Generates a random string
exports.randomString = () => {
    let password = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
      
    for (let i = 1; i <= 8; i++) {
        const char = Math.floor(Math.random() * str.length + 1);
        password += str.charAt(char);
    }
      
    return password;
}

// Generates a random salt and an hash from a password in plain text
exports.genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');

    return { salt, hash };
}

// Creates an hash from the password sent by user and the salt in db, then verify if it's equal to the one stored
exports.validPassword = (password, hash, salt) => {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
    return verifyHash === hash;
}

exports.issueJWT = (user) => {
    const _id = user._id;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Math.floor(Date.now() / 1000)
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn
    }
}