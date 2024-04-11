const authController = require('../controller/authControllers');

const router = require('express').Router();

router.post('/signup',authController.SignUp);
router.post('/login',authController.Login);


module.exports = router;