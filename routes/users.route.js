const express = require("express");
const router = express.Router();
const userController = require('../controller/user.controller');


// ========================  control routes ==============================

//generate random user
router.route('/random').get(userController.getRandomUser)

// add new user post('/users', async (req, res)
router.route('/save').post(userController.saveUser)

router.route('/all').get(userController.getAllUser)

router.route('/update/:updateId').patch(userController.updateUser)

router.route('/bulk-update').patch(userController.bulkUpdate)

router.route('/delete/:id').delete(userController.deleteUser)

module.exports = router;