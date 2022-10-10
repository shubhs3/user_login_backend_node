const { checkToken } = require("../middle/token_validation");
const { adminLogin, verifyToken } = require("./admin.controller");

const router = require("express").Router();


router.post("/login" , adminLogin);
router.post("/verifyToken" ,checkToken ,  verifyToken);


module.exports =  router;