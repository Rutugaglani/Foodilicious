import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getOrder,

} from "../redux/actions/dataAction";
import {
  getUser,
  getCustomerAddress,
  updateAddress,
} from "../redux/actions/userAction";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../css/payment.css";

const Pay_Details = (props) => {
  const { user, updateAddress,paymentMethod, setPaymentMethod,order} = props;

  const [updateAdd, setUpdateAdd] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (user.address[0] && user.address[0].address) {
      setAddress(user.address[0].address);
      setCity(user.address[0].city);
      setPincode(user.address[0].pincode);
    }
    else if(user.address.message)
    {
      setUpdateAdd(true);
    }
  }, [user.address]);
 
  const handleEdit = (e) => {
    e.preventDefault();
    setUpdateAdd(true);
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else {
      setPincode(e.target.value);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setUpdateAdd(false);
    setAddress(user.address[0].address);
    setCity(user.address[0].city);
    setPincode(user.address[0].pincode);
  };

  const handleSave = (e) => {
    e.preventDefault();

    setUpdateAdd(false);
    const newAddress = {
      user_id: user.credentials.id,
      address: address,
      city: city,
      pincode: pincode,
    };
    updateAddress(newAddress);

    console.log(newAddress);
  };
  /*
const handleSelect=(item)=>e=>{
    e.preventDefault()
    setSelectAddress(item)
    setShowPayment(true);
    console.log(selectAddress);
    console.log(item);
}*/
  const nameBlock = (
    <div className="payDets_nameDiv">
      <h3>
        {user.credentials.username}{" "}
        <span className="nameDiv_email">({user.credentials.email})</span>
      </h3>

      <p className="nameDiv_secure">You are securely logged in</p>
    </div>
  );
  const deliveryBlock = !updateAdd  ? (
    <div className="payDets_deliveryDiv">
      <h3>Delivery Address</h3>
      <p>{address}</p>
      <p>
        {city} - {pincode}
      </p>
      <div className="payDets_delBtnDiv">
        {!showPayment && (
          <Button className="payDets_delBtn" onClick={handleEdit}>
            Edit
          </Button>
        )}
        {!showPayment && (
          <Button
            className="payDets_delBtn"
            onClick={() => setShowPayment(true)}
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  ) : null;
  const textBox = updateAdd ? (
    <div className="payDets_deliveryActDiv">
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <h3>Delivery Address</h3>
        <Form.Control
          as="textarea"
          className="payDets_textBox"
          onChange={handleChange}
          name="address"
          value={address}
          rows={2}
          placeholder="Address"
          required
        />
        <Form.Control
          type="text"
          className="payDets_textBox"
          onChange={handleChange}
          name="city"
          value={city}
          placeholder="City"
          required
        />
        <Form.Control
          type="text"
          className="payDets_textBox"
          onChange={handleChange}
          name="pincode"
          value={pincode}
          placeholder="Pincode"
          required
        />
        <div className="payDets_delBtnDiv">
          <Button className="payDets_delBtn" type="submit" onClick={handleSave}>
            Save
          </Button>
          <Button className="payDets_delBtn" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form.Group>
    </div>
  ) : null;

  const paymentBlock = showPayment  ? (
    <div className="payDets_paymentActDiv">
      <h2>Select a payment mode</h2>
      <div className="payDets_paymentBtnDiv">
      <Button
        onClick={
          (() => setPaymentMethod("credit_card") )}
        className="payDets_paymentBtn"
      >
        Credit Card
      </Button>
      <Button className="payDets_paymentBtn" onClick={() => setPaymentMethod("debit_card")}>Debit Card</Button>
      <Button className="payDets_paymentBtn" onClick={() => setPaymentMethod("cod")}>Cash on delivery</Button>

      </div>
     
    </div>
  ) : (
    <div className="payDets_paymentDiv">
      <h2>Payment mode</h2>
      <p>Confirm a delivery address</p>
    </div>
  );

const CreditCard= (paymentMethod == "credit_card" || paymentMethod == "debit_card")?(
  <Form className="creditCard_form">
  <Form.Group >
    <Form.Label>Name on the card</Form.Label>
    <Form.Control type="text"  />
  </Form.Group>

  <Form.Group >
    <Form.Label>Card Number</Form.Label>
    <Form.Control type="text" />
  </Form.Group>
  <div className="CVV_dets">
  <Form.Group >
    <Form.Label>Valid through</Form.Label>
    <Form.Control type="text"  />
  </Form.Group>

  <Form.Group >
    <Form.Label>CVV</Form.Label>
    <Form.Control type="text" />
  </Form.Group>

  </div>


  <Button className="payDets_paymentBtn" type="submit">
    Submit
  </Button>
</Form>
):null

  return (
    <div>
      {nameBlock}
      {deliveryBlock}
      {textBox}
      {order && order.cost>=100 && paymentBlock}
      {CreditCard}
    </div>
  );
};
Pay_Details.propTypes = {
  getUser: PropTypes.func.isRequired,
  getCustomerAddress: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
  restaurantReview: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  restaurant: state.data.restaurant,
  restaurantReview: state.data.restaurantReview,
  user: state.user,
  order: state.data.order,
});
const mapActionToProps = {
  getUser,
  getCustomerAddress,
  updateAddress,
  getOrder,
};

export default connect(mapStateToProps, mapActionToProps)(Pay_Details);
