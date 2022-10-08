const { reject, promise } = require("bcrypt/promises");
const con = require("../../config/dbconfig");

module.exports = {
  add_user: async (data) => {
    return new Promise((resolve , reject) =>
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
            err : err
          })
        }
        return reject({
          data : results,
          err : undefined
        })
      }
    )
    )
  },


  get_user_by_email: async (email) => {
    return new Promise((resolve , reject) =>
    con.query(
      `SELECT * FROM user WHERE email = ?`,
      [
        email
      ],
      (err, results, fields) => {
        if (err) {
          return reject({
            data: undefined,
            err : err
          })
        }else{
        return resolve({
          data : results,
          err : undefined
        })
      }
      }
    )
    )
  },

  delete_timing_info: async (id) => {
    return new Promise((resolve, reject) =>
      con.query(
        `DELETE FROM court_timings_details WHERE court_id=?`,
        [id],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return resolve({
              data: undefined,
              err: err,
            });
          }
          return resolve({
            data: results,
            err: undefined,
          });
        }
      )
    );
  },






  
};
