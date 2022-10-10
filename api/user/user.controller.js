const con = require("../../config/dbconfig");
const {
	add_user,
	get_user_by_email,
	get_all_users,
	is_anagram,
} = require("./user.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");

module.exports = {
	addUser: async (req, res) => {
		const body = req.body;
		console.log(body);

		var result1 = await get_user_by_email(body.email).catch((err)=>{
			return err;
		});;
		console.log("result1 ===> ", result1);
		if (result1.data.length > 0) {
			return res.status(409).json({
				status: {
					message: "E-mail already exist",
				},
			});
		}

		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);

		var result2 = await add_user(body).catch((err)=>{
			return err;
		});
		if (result2.err) {
			return res.status(400).json({
				status:{
					message : "Failed"
				}
			})
		}

		return res.status(201).json({
			status: {
				message: "User added Successfully",
			},
		});
	},

	getAllUsers: async (req, res) => {
		var result1 = await get_all_users().catch((err)=>{
			return err;
		});

		return res.status(200).json({
			status: {
				message: "All Users",
			},
			allUsers: result1.data,
		});
	},

	anagram: async (req, res) => {
		const body = req.body;

		const item = body.item.split("").sort();
		const strArray = body.strArray;

		const output = await is_anagram(item, strArray);
		return res.status(200).json({
			inputString: body.item,
			strArray: body.strArray,
			result: output
		});
	},
};
