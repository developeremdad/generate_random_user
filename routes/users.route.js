const express = require("express");
const router = express.Router();
const userController = require('../controller/user.controller');


// ========================  control routes ==============================

//generate random user
router
.route('/random').get(userController.getRandomUser)

// add new user post('/users', async (req, res)
router
.route('/save').post(userController.saveUser)

router.route('/all').get(userController.getAllUser)

module.exports = router;