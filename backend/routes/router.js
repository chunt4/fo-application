const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user.controller');

/*---------- Public Routes ----------*/

/* user */
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/test', (req,res) => {
    res.json(req.user);
    console.log('sup');
});

module.exports = router;