import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCart,
  getOrder,
  postPayment,
  deleteCart,
} from "../redux/actions/dataAction";
import { getUser, getCustomerAddress } from "../redux/actions/userAction";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../css/payment.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import payment from "../pages/payment";

const Cart = (props) => {
  const {
    restaurant,
    cart,
    getOrder,
    order,
    paymentMethod,
    getCart,
    deleteCart,
    postPayment,
    locId
  } = props;
  useEffect(() => {
    if (restaurant) {
      getCart(props.user.credentials.id, restaurant.restaurant_id);
      getOrder(props.user.credentials.id, restaurant.restaurant_id,locId);
    }
  }, [props.user.credentials.id, restaurant]);

  const paymentOrder = (history) => {
    const idData = {
      user_id: props.user.credentials.id,
      restaurant_id: restaurant.restaurant_id,
      order_id:order.id
    };
    deleteCart(idData);
    console.log(paymentMethod);
    const payData = {
      order_id: order.id,
      payment_method: paymentMethod,
    };
    postPayment(payData);
  };
const orderBtn = order && order.cost>=100 ?(
  <Link to="/thankyou">
  <Button className="cart_placeOrder" onClick={paymentOrder}>
    Place Order
  </Button>
</Link>
  
):(
  <p className="cart_minOrder">
    * Minimum order of Rs.100 is required
  </p>
)
  const restaurantDets = restaurant && (
    <div className="cart_restDets">
      <p className="cart_restOrderFrom">ORDER FROM</p>
      <p className="cart_restName">{restaurant.name}</p>
      <p className="cart_restLoc">{restaurant.locality}</p>
    </div>
  );
  const cartDets = cart[0] && cart.map((item, ind) => {
    console.log(cart);

    return (
      <div key={ind} className="cart_cartDets">
        <div>
          <FontAwesomeIcon
            icon={faCircle}
            className={`cart_${item.category}`}
          />
        </div>
        <div>
          <p className="cart_cartDetName">{item.name}</p>
          <p>Rs.{item.price}</p>
        </div>
        <div>
          <p className="cart_cartDetQty">qty : {item.quantity}</p>
          <p>Rs.{item.cost}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="cart_summaryDiv">
      <p className="cart_summaryM">Summary</p>
      <div className="cart_orderBill">
        {restaurantDets}
        {cartDets}
        <p className="cart_totalCost">
          GRAND TOTAL : Rs. {order && order.cost}
        </p>
        {orderBtn}

      </div>
    </div>
  );
};
Cart.propTypes = {
  getUser: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  postPayment: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.data.cart,
  user: state.user,
  order: state.data.order,
});
const mapActionToProps = {
  getUser,
  getCustomerAddress,
  getCart,
  getOrder,
  postPayment,
  deleteCart,
};

export default connect(mapStateToProps, mapActionToProps)(Cart);
