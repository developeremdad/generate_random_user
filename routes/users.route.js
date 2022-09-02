const express = require("express");
const router = express.Router();
const userController = require('../controller/user.controller');


// ========================  control routes ==============================

//generate random user
router
.route('/random')
    .get(userController.getRandomUser)
    router.post('/save',(req, res) =>{
        console.log(req.body, req.query);
        res.json(req.body);
    })

// add new user post('/users', async (req, res)



module.exports = router;