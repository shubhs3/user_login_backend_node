const { reject, promise } = require("bcrypt/promises");
const con = require("../../config/dbconfig");
function arrayEquals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}
module.exports = {
	add_user: async (data) => {
		return new Promise((resolve, reject) =>
			con.query(
				`insert into user(fname, lname, email, mobile ,  password, address)
            values(?,?,?,?,?,?)`,
				[
					data.fname,
					data.lname,
					data.email,
					data.mobile,
					data.password,
					data.address,
				],
				(err, results, fields) => {
					if (err) {
						return resolve({
							data: undefined,
							err: err,
						});
					}
					return reject({
						data: results,
						err: undefined,
					});
				}
			)
		);
	},

	get_user_by_email: async (email) => {
		return new Promise((resolve, reject) =>
			con.query(
				`SELECT * FROM user WHERE email = ?`,
				[email],
				(err, results, fields) => {
					if (err) {
						return reject({
							data: [],
							err: err,
						});
					} else {
						return resolve({
							data: results,
							err: undefined,
						});
					}
				}
			)
		);
	},

	get_all_users: async () => {
		return new Promise((resolve, reject) =>
			con.query(
				`SELECT user_id , fname , lname , email , mobile , address FROM user`,
				[],
				(err, results, fields) => {
					if (err) {
						return reject({
							data: undefined,
							err: err,
						});
					} else {
						return resolve({
							data: results,
							err: undefined,
						});
					}
				}
			)
		);
	},

	is_anagram: async (item, strArray) => {
		var result = [];
		for (var i = 0; i < strArray.length; i++) {
			var word = strArray[i];
			var letterArray = word.split("").sort();
			result.push({
				testString: word,
				isAnagram: arrayEquals(item, letterArray),
			});
		}
		return result;
	},
};
