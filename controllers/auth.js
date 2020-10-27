const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    
    host     :  process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
  
});

exports.register = (req,res)=>{
    console.log(req.body);

    const {password,email,username}= req.body;
    db.query('SELECT email FROM users WHERE email = ?',[email], async(error,response)=>{
        if(error){
            console.log(error);
        }
        if(response.length > 0)
        {
            console.log("this email is already taken")
            return res.status(400).json({email : "this email is already taken"});
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);
        db.query('INSERT INTO users SET ?',{username:username , email:email , password : hashedPassword} ,(error,response)=>{
            if(error)
            {
                console.log(error)
            }
            else{
                console.log(res);
               return res.status(200).json({message: 'User Registered'})
            }
        })
    })
    
}
exports.login = async (req,res)=>{
    try{
        const {password,email}= req.body;
        db.query('SELECT * from users WHERE email = ?',[email],async(error,results)=>{
            if(!results || !(await bcrypt.compare(password,results[0].password)))
            {
                res.status(401).json({message:"Email or Password is incorrect"})
            }
            else{
                const id = results[0].id;
                const token = jwt.sign({id},process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log(token);

                const cookieOpt ={
                    expires : new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES *24*60*60*1000

                    ),
                    httpOnly : true
                }
                res.cookie('jwt',token,cookieOpt);
                res.status(200).json({token:token})


            }
        })
    }
    catch(error)
    {
console.log(error)
    }
    
}