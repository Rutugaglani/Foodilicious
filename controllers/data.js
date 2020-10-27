const mysql = require('mysql');
const db = mysql.createConnection({
    
    host     :  process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
  
});

exports.subCategory = (req,res)=>{
 const id=req.params.id
    db.query(`SELECT * FROM subcategory WHERE category_id = ${id}`, async(error,response)=>{
        if(error){
            console.log(error);
        }
        else
        {  
            return res.status(200).json(response);
        }
        
    })
    
}
/*exports.restaurantInfo = (req,res)=>{
    const id=req.params.id
       db.query(`SELECT * FROM restaurant WHERE category_id = ${id}`, async(error,response)=>{
           if(error){
               console.log(error);
           }
           else
           {  
               return res.status(200).json(response);
           }
           
       })
       
   }*/
