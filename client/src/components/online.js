import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/online.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
  addCart,
  getCart,
  getMenu,
  updateCart,
  placeOrder,
  getOrder,
  updateOrder,
} from "../redux/actions/dataAction";
import Axios from "axios";

const Online = (props) => {
  const {
    menu,
    order,
    credentials,
    id,
    getMenu,
    user_id,
    cart,
    getCart,
    locId,
    updateCart,
    placeOrder,
    getOrder,
    updateOrder,
    addCart,
  } = props;
  useEffect(() => {
    getMenu(id);
    if (user_id && id) {
      getCart(user_id, id);
      getOrder(user_id,id,locId);
    }
  }, [user_id, id]);

  const Proceed =
    cart && cart.length ? (
      <div className="online_proceedMainDiv">
        <p className="online_proceedP">Proceed to Payment</p>
        {order && !order.statusOrder && (
          <p className="online_proceedP">
            {order.cost > 0 &&  <span>Rs.{order.cost}</span>  }
          </p>
        )}
        <Link to={`/payment/${id}/${locId}`}>
        
          <FontAwesomeIcon
            icon={faLongArrowAltRight}
            className="online_arrowRight"
          />
        </Link>
      </div>
    ) : null;

  const handleAddToCart = (food_id) => (e) => {
    console.log(user_id, food_id);
    e.preventDefault();
    let quantity = 0;
    Axios.get(`cart/${user_id}/${id}/${food_id}`)
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          console.log("messageBlock");
          console.log(user_id, food_id, id, 1);
          addCart(user_id, food_id, id, 1);
        } else {
          quantity = res.data[0].quantity + 1;
          updateCart(user_id, food_id, quantity, id);
        }
      })
      .then(() => {
        const idData = {
          user_id,
          restaurant_id: id,
          loc_id:locId
        };
        if (!order) {
          setTimeout(() => {
            placeOrder(idData,locId);
          }, 100);
        } else {
          const orderId = {
            user_id,
            order_id: order.id,
            restaurant_id: id,
          };
          setTimeout(() => {
            updateOrder(orderId,locId);
          },100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (food_id) => (e) => {
    console.log(user_id, food_id);
    e.preventDefault();
    let quantity = 0;
    Axios.get(`cart/${user_id}/${id}/${food_id}`)
      .then((res) => {
        if (res.data[0].quantity) {
          quantity = res.data[0].quantity - 1;
          updateCart(user_id, food_id, quantity, id);
        }
      })
      .then(() => {
        const orderId = {
          user_id,
          order_id: order.id,
          restaurant_id: id,
        
        };
        updateOrder(orderId,locId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const restShow = (
    <div>
      <Container className="onlineInfo_container">
        {menu.map((item, i) => {
          return (
            <Row className="online_foodDesMain">
              <Col sm={2} className="online_imgDiv">
                <img className="online_thumbpic" src={item.image} />
              </Col>
              <Col sm={8}>
                <h3>{item.name}</h3>
                <p className="online_des">Rs.{item.price}</p>
                <p className="online_des">{item.category}</p>
                <p className="online_des">{item.description}</p>
              </Col>
              <Col sm={2}>
                <div>
                  <Button
                    onClick={handleAddToCart(item.id)}
                    className="online_AddIcon"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <span>
                    {" "}
                    {cart[0] &&
                      cart.map((food, i) => {
                        if (food.food_id == item.id) {
                          return food.quantity;
                        }
                      })}{" "}
                  </span>
                  <Button
                    onClick={handleDelete(item.id)}
                    className="online_MinusIcon"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );

  return (
    <div>
      {restShow}
      {Proceed}
    </div>
  );
};

Online.propTypes = {
  getMenu: PropTypes.func.isRequired,
  menu: PropTypes.array.isRequired,
  restaurant: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  credentials: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  addCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
  getOrder: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.data.menu,
  restaurant: state.data.restaurant,
  cart: state.data.cart,
  order: state.data.order,
  credentials: state.user.credentials,
});
const mapActionToProps = {
  addCart,
  getCart,
  getMenu,
  updateCart,
  placeOrder,
  getOrder,
  updateOrder,
};

export default connect(mapStateToProps, mapActionToProps)(Online);
