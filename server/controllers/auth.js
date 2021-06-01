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
            return res.status(201).json({message : "this email is already taken"});
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);
        db.query('INSERT INTO users SET ?',{username:username , email:email , password : hashedPassword} ,(error,response)=>{
            if(error)
            {
                console.log(error)
            }
            else{
                console.log(response);
              
                      
                db.query('SELECT * from users WHERE email = ?',[email],async(error,results)=>{
                    try{
                        if(results.length > 0)
                        {
                            const comparision = await bcrypt.compare(
                                password,
                                results[0].password
                              );
                              if (comparision) {
                                const id = results[0].id;
                                const token = jwt.sign({id},process.env.JWT_SECRET,{
                                    expiresIn: process.env.JWT_EXPIRES_IN
                                });
                                
                
                                const cookieOpt ={
                                    expires : new Date(
                                        Date.now() + process.env.JWT_COOKIE_EXPIRES *24*60*60*1000
                
                                    ),
                                    httpOnly : true
                                }
                                res.cookie('jwt',token,cookieOpt);
                                return res.status(200).json({token:token})
                              }
                             else {
                                res.status(201).send({
                                  message: "Password is incorrect",
                                });
                              }
                        }
                        else{
                            return res.status(201).json({message:"Email does not exist"})
                        }
                    }
                        
                    catch(error)
                    {
                        console.log(error)
                    }
                }) 
              
            
        }
      
    
    })
    
})
}
exports.login = async (req,res)=>{
    try{
        const {password,email}= req.body;
        db.query('SELECT * from users WHERE email = ?',[email],async(err,results)=>{
            try{
                if(results.length > 0)
                {
                    const comparision = await bcrypt.compare(
                        password,
                        results[0].password
                      );
                      if (comparision) {
                        const id = results[0].id;
                        const token = jwt.sign({id},process.env.JWT_SECRET,{
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });
                        
        
                        const cookieOpt ={
                            expires : new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPIRES *24*60*60*1000
        
                            ),
                            httpOnly : true
                        }
                        res.cookie('jwt',token,cookieOpt);
                        return res.status(200).json({token:token})
                      }
                     else {
                        res.status(201).send({
                          message: "Password is incorrect",
                        });
                      }
                }
                else{
                    return res.status(201).json({message:"Email does not exist"})
                }
            }
                
            catch(err)
            {
                console.log(err)
            }
        })
    }
    catch(error)
    {
     console.log(error)
    }
    
}
exports.getUser = (req,res) => {

    db.query(`select id,username,email from users where email = ?`,[req.user.email],async (err,result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).json(result);
        }
    })
}
exports.getCustomerAddress=(req,res)=>{
    const {id}=req.user;
    console.log(id)
    db.query(`select address,city,pincode from customer where user_id = ${id}`,async (err,result) => {
        try{
            if(result.length>0)
            {
                res.status(200).json(result);
            }
            else
            {
                res.status(200).json({message:"No Address Registered"});
            }
        }
        catch{
            console.log(err)
        }

    })
}
exports.updateCustomerAddress=(req,res)=>{
    const {address,city,pincode,user_id}=req.body;
 
    db.query(`update customer set address="${address}",city="${city}",pincode=${pincode} where user_id = ${user_id}`,async (err,result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).json(result);
        }
    })
}
exports.insertCustomerAddress=(req,res)=>{
    const {address,city,pincode,user_id}=req.body;
 
    db.query(`insert into customer(user_id,address,city,pincode) values(${user_id},"${address}","${city}",${pincode})`,async (err,result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).json(result);
        }
    })
}
exports.getUserOrders=(req,res)=>{
    const {user_id}=req.params;
 
    db.query(`select orders.id,orders.cost,orders.statusOrder,orders.date,orders.user_id,orders.restaurant_id,restaurant.name,restaurantaddress.id as loc_id from users join orders on orders.user_id=${user_id} and orders.user_id=users.id
     join restaurant on restaurant.restaurant_id=orders.restaurant_id join restaurantaddress on restaurantaddress.id=orders.loc_id`,async (err,result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).json(result);
        }
    })
}

