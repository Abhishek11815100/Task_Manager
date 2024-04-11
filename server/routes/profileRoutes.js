
const router = require('express').Router();
const verifyUser =require('../middlewares/AuthMiddleware');

router.post('/',verifyUser.userVerification,);

module.exports = router;