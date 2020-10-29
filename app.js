const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app=express();
dotenv.config({ path:'./.env'});

// Create connection
app.use(cors())

const db = mysql.createConnection({
    
        host     :  process.env.DATABASE_HOST,
        user     : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE
      
});



app.use(express.urlencoded({extended : false}));

app.use(express.json());

app.use(cookieParser());

//Connect
db.connect((err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log('Mysql connected........');
    }
  
})

app.listen('5000',()=>{
    console.log('Server started on port 5000');
});

//Routes

app.use('/auth',require('./routes/auth'));