const express = require('express')
const router = express.Router();
const {userLogin,userSignin} = require('../controllers/UserController')
router.post('/signin',userSignin);
router.post('/login',userLogin);

module.exports = router;