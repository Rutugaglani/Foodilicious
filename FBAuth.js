const jwt = require("jsonwebtoken");

const mysql = require('mysql');
const db = mysql.createConnection({
    
    host     :  process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
  
});

const FBAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    await db.query(
      `SELECT * FROM user WHERE user_id = ${decoded.user_id}`,
      (error, result) => {
        if (error || !result.length) {
          throw error;
        } else {
          req.user = result[0];
          next();
        }
      }
    );
  } catch (err) {
    return res.status(400).send({ error: "Please Authenticate!" });
  }
};

module.exports = { FBAuth };
