const express = require('express');
const authController = require('../controllers/auth');
const dataController = require('../controllers/data');
const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const db = mysql.createConnection({
    
    host     :  process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
  
});

const router = express.Router();

const MyAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split('Bearer ')[1];
      console.log("token :" ,token)
      console.log(process.env.JWT_SECRET)
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      await db.query(
        `SELECT * FROM users WHERE id = ${decoded.id}`,
        (error, result) => {
          if (error || !result.length) {
            throw error;
          } else {
            console.log(result)
            req.user = result[0];
            console.log(req.user)
            next();
          }
        }
      );
    } catch (err) {
        console.log(err);
      return res.status(400).send({ error: "Please Authenticate!" });
    }
  };

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/getUser',MyAuth,authController.getUser);
router.get('/getCustomerAddress',MyAuth,authController.getCustomerAddress);
router.post('/updateCustomerAddress',MyAuth,authController.updateCustomerAddress);
router.post('/insertCustomerAddress',MyAuth,authController.insertCustomerAddress);
router.post('/postAreview',MyAuth,dataController.postReview);
router.post('/search',MyAuth,dataController.search);
router.get('/getReviewByRestaurant/:id',MyAuth,dataController.getReviewByRestaurant);
router.get('/getMenu/:id',MyAuth,dataController.getMenu);
router.get('/getVegMenu/:id',MyAuth,dataController.getVegMenu);
router.get('/getReviewByUser',MyAuth,dataController.getReviewByUser);
router.get('/category/:id',MyAuth,dataController.category);
router.get('/subCategory/:id',MyAuth,dataController.subCategory);
router.get('/subCatList/:id',MyAuth,dataController.subCatList);
router.get('/restaurantInfo/:id/:locId',MyAuth,dataController.restaurantInfo);
router.get('/cart/:user_id/:restaurant_id', dataController.getCart);
router.get('/foodItem/:id', dataController.getFoodItem);
router.get('/cart/:user_id/:rest_id/:food_id', dataController.getCartItem);
router.get('/order/:user_id/:restaurant_id', dataController.getCurrentOrder);
router.post('/updateOrder', dataController.updateOrder);
router.post('/cart', dataController.cart);
router.post('/updateQuantity', dataController.updateQuantity);
router.post('/placeOrder', dataController.placeOrder);
router.post('/payment', dataController.payment);
router.post('/deleteCart', dataController.deleteCart);


module.exports = router; 