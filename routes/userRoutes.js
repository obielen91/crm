const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router.get('/signUp', (req, res) => res.render('userViews/signupUser'));
router.post('/signUp', userController.create);

router.get('/login', (req, res) => {
    if (req.query.loginRedirect) {
        res.render('userViews/loginUser', {
            error: true,
            message: 'Użytkownik nie jest zalogowany!',

        });
        return;
    }
    res.render('userViews/loginUser')
});

router.post('/login', userController.login);
router.get('/logout', userController.logout);


module.exports = router;


