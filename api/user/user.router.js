const { checkToken } = require("../middle/token_validation");
const { addUser, login, getAllUsers } = require("./user.controller");


const router = require("express").Router();



router.post("/addUser" , addUser);


router.get("/allUsers", checkToken  , getAllUsers);



module.exports = router;