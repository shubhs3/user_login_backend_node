const { addUser } = require("./user.controller");

const router = require("express").Router();



router.post("/signUp" , addUser);


module.exports = router;