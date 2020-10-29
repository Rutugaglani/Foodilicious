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
exports.restaurantInfo = (req,res)=>{
    const id=req.params.id
    const locId=req.params.locId
       db.query(`SELECT * FROM restaurant,restaurantaddress AS restAdd WHERE restaurant_id = ${id} AND restAdd.id = ${locId} `, async(error,response)=>{
           if(error){
               console.log(error);
           }
           else
           {  
               return res.status(200).json(response);
           }
           
       })
       
   }
   exports.subCatList = (req,res)=>{
    const id=req.params.id
       db.query(`SELECT Distinct name,rating,type FROM fallunder as FU,restaurant as rest ,restaurantaddress as RA WHERE subcategory_id = ${id} AND FU.restaurant_id=rest.restaurant_id   `, async(error,response)=>{
           if(error){
               console.log(error);
           }
           else
           {  
               return res.status(200).json(response);
           }
           
       })
       
   }