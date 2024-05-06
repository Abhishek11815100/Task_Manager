
const router = require('express').Router();
const verifyUser =require('../middlewares/AuthMiddleware');
const profileController = require('../controller/profileControllers')

router.post('/',verifyUser.userVerification,profileController.getProfile);

module.exports = router;