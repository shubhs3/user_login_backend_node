const jwt = require("jsonwebtoken");
module.exports = {

  checkToken: (req, res, next) => {
    let token = req.get("Authorization");
    console.log("From authorization " , token)
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status : {
                status_code : 401,
                status_messsage : "Invalid Token..."
            },
          });
        } else {
          req.token_data = decoded.result;
        //   console.log("Decoded", decoded);
          next();
        }
      });
    } else {
      return res.status(401).json({
        status : {
          status_code : 401,
          status_messsage : "Invalid Token..."
      },
});
    }
  },
};
