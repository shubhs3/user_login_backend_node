const { checkToken } = require("../middle/token_validation");
const { addUser, login, getAllUsers, anagram } = require("./user.controller");


const router = require("express").Router();



router.post("/addUser" , addUser);


router.get("/allUsers", checkToken  , getAllUsers);


router.post("/isAnagram" , anagram);



module.exports = router;