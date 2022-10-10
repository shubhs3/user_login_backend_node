const con = require("../../config/dbconfig");
require("dotenv").config();

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { get_admin_by_email } = require("./admin.service");

module.exports = {
	adminLogin: async (req, res) => {
		const body = req.body;
		console.log(body);

        var result1 = await get_admin_by_email(body.email);

        if(!result1.data[0]){
            return res.status(200).json({
                status: {
                    message: "Invalid Email"
                }
            })
        }


        if(body.password === result1.data[0].password){

            const jsondata = {
                id : result1.data[0].admin_id,
                name : result1.data[0].fname,
            }

            const token = sign({result : jsondata} , process.env.TOKEN_KEY , {expiresIn: "3hr"});

            res.setHeader("Content-Type", "application/json; charset=utf-8");
			res.setHeader("Authorization", "Bearer " + token);


            return res.status(200).json({
                status: {
                    message : "Login Successfully"
                },
                token : token
            })
        }

        return res.status(200).json({
            status: {
                message : "Invalid Credentials"
            },
        })


        
    },

    verifyToken : async (req , res) => {
        return res.status(200).json({
            status: {
                message: "Token Verified Successfully"
            },
            token : req.get("Authorization").slice(7)
        })
    }

};
