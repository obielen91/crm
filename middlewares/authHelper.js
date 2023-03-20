const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const User = require('../models/UserModel');


module.exports = (req, res, next) => {

    const token = req.cookies['AuthToken'];

    try {
        if (!token) {
            res.redirect('/user/login?loginRedirect=true');
        } else {
            const decoded = jwt.decode(token, 'secret');
            User.findById(decoded._id).exec((err, user) => {
                if (err || !user) {
                    res.redirect('/user/login?loginRedirect=true');
                } else {
                    res.locals.userId = decoded._id;
                    res.locals.userName = user.name;
                    res.locals.currentUser = user;
                    next();
                }
            });
        }
    }
    catch {
        res.redirect('/user/login?loginRedirect=true');
    }

};


