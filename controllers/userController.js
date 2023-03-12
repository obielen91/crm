const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports = {
    create: (req, res) => {
        let newUser = new User(req.body);
        newUser.save((err) => {
            if (err) {
                res.render('userViews/signupUser', {
                    error: true,
                    message: 'Użytkownik już istnieje',
                    user: req.body,
                });
            } else {
                res.redirect('/customer');
            }
        });
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email }).exec((err, user) => {
            if (err) {
                res.send('Error');
                return;
            }
            if (!user) {
                // return res.json({ success: false, message: 'That user not exist' });
                res.render('userViews/loginUser', {
                    error: true,
                    message: 'Użytkownik nie istnieje',
                    user: req.body,
                });
                return;
            } else {
                bcrypt.compare(req.body.password, user.password, (err, logged) => {
                    if (err) {
                        res.render('userViews/loginUser', {
                            error: true,
                            message: 'Logowanie nie powiodło się',
                            user: { email: req.body.email, password: "" },
                        });
                        return;
                    }
                    if (logged) {
                        const token = user.generateAuthToken(user);
                        res.cookie('AuthToken', token);
                        res.redirect('/customer');
                    } else {
                        res.render('userViews/loginUser', {
                            error: true,
                            message: 'Nieprawidłowe hasło użytkownika',
                            user: { email: req.body.email, password: "" },
                        });
                        return;
                    }
                });
            }
        });
    },
    logout: (req, res) => {
        res.clearCookie('AuthToken');
        res.redirect('/user/login');
    }
};



