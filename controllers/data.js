const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.category = (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM subcategory WHERE category_id = ${id}`,
    async (error, response) => {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json(response);
      }
    }
  );
};

exports.subCategory = (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM subcategory WHERE id = ${id}`,
    async (error, response) => {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json(response);
      }
    }
  );
};
exports.restaurantInfo = (req, res) => {
  const id = req.params.id;
  const locId = req.params.locId;
  db.query(
    `SELECT * FROM restaurant,restaurantaddress AS restAdd WHERE restaurant_id = ${id} AND restAdd.id = ${locId} `,
    async (error, response) => {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json(response);
      }
    }
  );
};
exports.subCatList = (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT Distinct name,rating,rest.restaurant_id,RA.locality,RA.id,rest.images 
       FROM fallunder as FU,restaurant as rest ,restaurantaddress as RA
        WHERE subcategory_id = ${id} AND FU.restaurant_id=rest.restaurant_id AND RA.rest_id=rest.restaurant_id  `,
    async (error, response) => {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json(response);
      }
    }
  );
};

exports.getReview = (req, res) => {
  const { id } = req.params;
  db.query(
    `select * from review where reviewid = ${id}`,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.postReview = (req, res) => {
  const { review_body, user_id, restaurant_id, rating } = req.body;
  //console.log(body,user_id,restaurant_id);
  db.query(
    `insert into review(review_body,user_id,restaurant_id,rating) values('${review_body}',${user_id},${restaurant_id},${rating})`,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.getReviewByUser = (req, res) => {
  const id = req.user.id;
  db.query(
    `select users.username,review.date_time,review.review_body,review.id,review.rating,restaurant.name from users join review on users.id=${id} and users.id =review.user_id  join restaurant on restaurant.restaurant_id = review.restaurant_id `,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.getReviewByRestaurant = (req, res) => {
  const { id } = req.params;
  db.query(
    `select users.username,review.id,review.date_time,review.review_body,review.rating from review join users on users.id = review.user_id AND restaurant_id = ${id}`,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

// Menu

exports.getMenu = (req, res) => {
  const { id } = req.params;
  db.query(
    `select * from hasmenuof join fooditem on hasmenuof.food_id=fooditem.id and hasmenuof.restaurant_id = ${id}`,
    async (err, result) => {
      try {
        return res.status(200).json(result);
      } catch {
        console.log(err);
      }
    }
  );
};

exports.getVegMenu = (req, res) => {
  const { id } = req.params;
  db.query(
    `select * from hasmenuof join fooditem on hasmenuof.food_id=fooditem.id and fooditem.category='Veg' and hasmenuof.restaurant_id = ${id}`,
    async (err, result) => {
      try {
        return res.status(200).json(result);
      } catch {
        console.log(err);
      }
    }
  );
};

//update quantity
exports.updateQuantity = (req, res) => {
  const { user_id, food_id, quantity, restaurant_id } = req.body;

  db.query(
    `update cart set quantity=${quantity} ,cost = (select ${quantity}*price from fooditem where id=${food_id}) 
    where user_id=${user_id} AND restaurant_id=${restaurant_id} AND food_id =${food_id}`,
    async (err, result) => {
      try {
        db.query(`call clear_cart();`, async (error, response) => {
          try {
            console.log(response);
          } catch {
            console.log(error);
          }
        });
        console.log(quantity, food_id, user_id);
        return res.status(200).json({ message: "values updated" });
      } catch {
        console.log(err);
      }
    }
  );
};

//Cart
exports.cart = (req, res) => {
  const { user_id, food_id, restaurant_id, quantity } = req.body;
  db.query(
    `insert into cart (user_id, food_id, quantity,restaurant_id, cost) values (${user_id},${food_id},${quantity},${restaurant_id},(select ${quantity}*price from fooditem where id=${food_id}))`,
    async (err, result) => {
      try {
        res.status(200).json(result);
      } catch {
        console.log(err);
      }
    }
  );
};

exports.getCart = (req, res) => {
  const { user_id, restaurant_id } = req.params;
  db.query(
    `select * from cart join fooditem on cart.food_id = fooditem.id where user_id=${user_id} AND restaurant_id=${restaurant_id}`,
    async (err, result) => {
      try {
        if (result.length > 0) {
          return res.status(200).json(result);
        } else {
          return res.status(200).json({ message: "cart is empty" });
        }
      } catch {
        console.log(err);
      }
    }
  );
};

exports.getCartItem = (req, res) => {
  const { user_id, food_id, rest_id } = req.params;
  db.query(
    `select * from cart where user_id=${user_id} AND restaurant_id=${rest_id} AND food_id=${food_id}`,
    async (err, result) => {
      try {
        if (result.length > 0) res.status(200).json(result);
        else res.status(200).json({ message: "item doesnt exist in cart" });
      } catch {
        console.log(err);
      }
    }
  );
};
exports.getFoodItem = (req, res) => {
  const { id } = req.params;
  db.query(`select * from fooditem where  id=${id}`, async (err, result) => {
    try {
      if (result.length > 0) res.status(200).json(result);
      else res.status(200).json({ message: "item doesnt exist in cart" });
    } catch {
      console.log(err);
    }
  });
};

//Place Order
exports.placeOrder = (req, res) => {
  const { restaurant_id, user_id, loc_id } = req.body;
  db.query(
    `insert into orders (cost, restaurant_id, user_id,loc_id) values((select sum(cost) from cart where user_id=${user_id}), ${restaurant_id}, ${user_id},${loc_id})`,
    async (err, result) => {
      if (err) console.log(err);
      else res.status(200).json(result);
    }
  );
};



exports.updateOrder = (req, res) => {
  const { restaurant_id, user_id, order_id } = req.body;
  db.query(
    `update orders set cost=(select sum(cost) from cart where user_id=${user_id} AND restaurant_id=${restaurant_id} ) where id=${order_id}`,
    async (err, result) => {
      if (err) console.log(err);
      else res.status(200).json(result);
    }
  );
};

//Get Order
exports.getCurrentOrder = (req, res) => {
  const { restaurant_id, user_id, loc_id } = req.params;
  db.query(
    `select * from orders where  user_id=${user_id} AND loc_id=${loc_id} AND statusOrder=0 AND restaurant_id=${restaurant_id}`,
    async (err, result) => {
      if (err) console.log(err);
      else res.status(200).json(result);
    }
  );
};

//Payment
exports.payment = (req, res) => {
  const { payment_method, order_id } = req.body;
  db.query(
    `insert into payment (payment_method,order_id) values(${payment_method},${order_id})`,
    async (err, result) => {
      try {
        console.log(payment_method, order_id);
        db.query(
          `update orders set statusOrder=1 where id=${order_id}`,
          async (err, resu) => {
            try {
              console.log(order_id);

              return res.status(200).json(resu);
            } catch {
              console.log(err);
            }
          }
        );
        return res.status(200).json(result);
      } catch {
        console.log(err);
      }
    }
  );
};

exports.deleteCart = (req, res) => {
  const { user_id, restaurant_id, order_id } = req.body;
  console.log(user_id, restaurant_id, order_id)
  db.query(
    `select * from cart where user_id=${user_id} AND restaurant_id=${restaurant_id}`,
    async (error, response) => {
      try {
        console.log(response)
        response.map((item) => {
          db.query(
            `insert into presentinan(food_id,order_id,quantity) values(${item.food_id},${order_id},${item.quantity})`,
            async (erro, res2) => {
              try {
                console.log(res2);
                db.query(
                  `DELETE FROM cart WHERE user_id=${user_id} AND restaurant_id=${restaurant_id} `,
                  async (err, result) => {
                    try {
                      console.log(restaurant_id, user_id);
                      return res
                        .status(200)
                        .json({ message: "Item Deleted !!" });
                    } catch {
                      console.log(err);
                    }
                  }
                );
              }
              catch{
                console.log(erro)
              }
            }
          );
        });
      }
      catch{
        console.log(error)
      }
    }
  );
};

exports.getPresentInAn = (req, res) => {
  const { order_id } = req.params;
  db.query(
    `select * from presentinan join fooditem on presentinan.food_id = fooditem.id join orders on presentinan.order_id = orders.id  where order_id=${order_id}`,
    async (err, result) => {
      try {
        if (result.length > 0) {
          return res.status(200).json(result);
        } else {
          return res.status(200).json({ message: "cart is empty" });
        }
      } catch {
        console.log(err);
      }
    }
  );
};

//Search
exports.search = (req, res) => {
  const str = req.body.str;
  db.query(
    `SELECT Distinct name,rating,rest.restaurant_id,RA.locality,RA.id,rest.images FROM fallunder as FU,restaurant as rest ,restaurantaddress as RA WHERE name LIKE '%${str}%' AND FU.restaurant_id=rest.restaurant_id AND RA.rest_id=rest.restaurant_id 
    UNION
    SELECT Distinct name,rating,rest.restaurant_id,RA.locality,RA.id,rest.images FROM fallunder as FU,restaurant as rest ,restaurantaddress as RA WHERE RA.locality LIKE '%${str}%' AND FU.restaurant_id=rest.restaurant_id AND RA.rest_id=rest.restaurant_id 

       `,
    async (error, response) => {
      if (error) {
        console.log(error);
      } else {
        if (response.length > 0) {
          return res.status(200).json(response);
        } else {
          return res.status(200).json("No results Found");
        }
      }
    }
  );
};

//by cuisine
/*
       UNION
    SELECT Distinct rest.name,rest.rating,rest.restaurant_id,RA.locality,RA.id,rest.images 
    FROM fallunder as FU, restaurant as rest ,restaurantaddress as RA ,subcategory as SC
    WHERE  RA.rest_id=rest.restaurant_id AND SC.category_id =3 AND SC.name LIKE '%${str}%' AND rest.restaurant_id  = FU.restaurant_id
    */
