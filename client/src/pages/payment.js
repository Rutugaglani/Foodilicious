import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCart, getRestaurantInfo } from "../redux/actions/dataAction";
import FooterMain from '../components/footer'
import { getUser, getCustomerAddress } from "../redux/actions/userAction";
import Pay_Details from "../components/pay_details";
import Cart from "../components/cart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/payment.css";
import NavHome from "../components/navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

const Payment = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    props.getUser();
    props.getCustomerAddress();
  }, [props.user.credentials.id]);

  useEffect(() => {
    props.getRestaurantInfo(props.match.params.id, props.match.params.locId);
    if (props.user.credentials.id)
      props.getCart(props.user.credentials.id, props.match.params.id);
  }, [props.user.credentials.id]);

  return (
    <div>
      <NavHome />

      <Container>
        <Row>
          <Col sm={8} className="payment_detsCol">
            <h3>Secure Payment</h3>
            <Pay_Details
              user={props.user}
              setPaymentMethod={setPaymentMethod}
              paymentMethod={paymentMethod}
            />
            <Link
              to={`/order/${props.match.params.id}/${props.match.params.locId}`}
            >
              <FontAwesomeIcon
                className="payment_leftArrow"
                icon={faLongArrowAltLeft}
              />
            </Link>
          </Col>
          <Col sm={4} className="payment_cartCol">
            <Cart restaurant={props.restaurant}  locId={props.match.params.locId} paymentMethod={paymentMethod} />
          </Col>
        </Row>

      </Container>
      <FooterMain/>
    </div>
  );
};
//https://b.zmtcdn.com/web_assets/b69badeeb9ef00f59428b4c09ef4c1901575873261.png
Payment.propTypes = {
  getCart: PropTypes.func.isRequired,
  getRestaurantInfo: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getCustomerAddress: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,

  user: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.data.restaurant,

  cart: state.data.cart,
  user: state.user,
});
const mapActionToProps = {
  getUser,
  getCustomerAddress,
  getCart,
  getRestaurantInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Payment);
