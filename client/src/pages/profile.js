import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FooterMain from '../components/footer'
import moment from "moment";
import { getUser, getCustomerAddress ,getUserReview, updateAddress, addAddress,getUserOrder } from "../redux/actions/userAction";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/profile.css";
import NavHome from "../components/navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
moment().format();

const stars = [1, 2, 3, 4, 5];
const Profile = (props) => {
 const {user, updateAddress, addAddress,getUserOrder} = props;
 const [editAddress, setEditAddress] = useState(false);
 const [addBtn, setAddBtn] = useState(false);
 const [address, setAddress] = useState("");
 const [city, setCity] = useState("");
 const [pincode, setPincode] = useState("");

  useEffect(() => {
    props.getUser();
    props.getCustomerAddress();
    props.getUserReview();
    getUserOrder(props.user.credentials.id);
  }, [props.user.credentials.id]);

  useEffect(() => {
    if (user.address[0] && user.address[0].address) {
      setAddress(user.address[0].address);
      setCity(user.address[0].city);
      setPincode(user.address[0].pincode);
    }

  }, [user.address]);

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
    setEditAddress(false);
    setAddBtn(false);
    setAddress(user.address[0].address);
    setCity(user.address[0].city);
    setPincode(user.address[0].pincode);
  };

  const handleSave = (e) => {
    e.preventDefault();

    setEditAddress(false);
    const newAddress = {
      user_id: user.credentials.id,
      address: address,
      city: city,
      pincode: pincode,
    };
    updateAddress(newAddress);

    console.log(newAddress);
  };
   
  const handleAdd = (e) => {
    e.preventDefault();
    setAddBtn(false);
    const newAddress = {
      user_id: user.credentials.id,
      address: address,
      city: city,
      pincode: pincode,
    };
    addAddress(newAddress);
    console.log(newAddress);
  };

  const userBlock= user.credentials && user.address ?(
      <div className="profile_userBlock">
      <p className="profile_name">{user.credentials.username}</p>
      <p className="profile_email">{user.credentials.email}</p>
      </div>
  ):null

  const deliveryBlock =  user.address[0]  ? (
    (!editAddress && !addBtn)?(
      <div className="payDets_deliveryDiv">
      <h3>Delivery Address</h3>
      <p>{address}</p>
      <p>
        {city} - {pincode}
      </p>
      <div className="payDets_delBtnDiv">
          <Button className="payDets_delBtn" onClick={()=>setEditAddress(true)}>
            Edit
          </Button>
      </div>
    </div>
    ):null
  ) : (
      <div>
          {!addBtn  &&<Button className="payDets_addBtn" onClick={()=>setAddBtn(true)}>
              Add
          </Button>}
      </div>
  )
  const textBox = editAddress || addBtn ? (
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


         {editAddress && <Button className="payDets_delBtn" type="submit" onClick={handleSave}>
            Save
          </Button>}
          {addBtn && <Button className="payDets_delBtn" type="submit" onClick={handleAdd}>
            Add
          </Button>}
          <Button className="payDets_delBtn" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form.Group>
    </div>
  ) : null;
  const reviewBlock = user.userReviews.length
  ? user.userReviews.map((rev, i) => {
      const date = moment(rev.date_time).format("DD MMM, YYYY");
      return (
        <Row className="compDets_feedbackDisplay" key={i}>
          {/*
           <Col xs={2} md={1} className="compDets_feedbackImageCol">
              <img src={rev.user.profile_image} alt="default"/>
            </Col>
           */}

          <Col xs={6} className="compDets_feedbackNameCol">
            <p>{rev.name}</p>
            <p className="compDets_feedbackDate">{date}</p>
          </Col>
          <Col sm={12} className="compDets_feedbackReveiwCol">
            <p>{rev.review_body}</p>
          </Col>
          <Col sm={12} className="compDets_feedbackStarCol">
            {stars.map((star, i) => {
              return rev.rating >= star ? (
                <FontAwesomeIcon
                  icon={faStar}
                  className="compDets_yellowStar"
                  key={i}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faStar}
                  className="compDets_emptyStar"
                  key={i}
                />
              );
            })}
          </Col>

          {/* <span onClick={() => {deleteCompany(company.id)}}>{company.content}</span> */}
        </Row>
      );
    })
  : (
    <div>
      <p>You have not reviewed any restaurant yet <Link to="/homepage">Click here</Link> to explore restaurants</p>
    </div>
  );

  const orderBlock = user.userOrders && user.userOrders[0] ?(
   user.userOrders.map((order,index)=>{
    const date = moment(order.date).format("DD MMM, YYYY");
     return(
       <div className="payDets_orderDiv">
            <div className="payDets_orderNoDiv">
         <p>Order No. {order.id}</p>
         <p>{date}</p>
     </div>
     <p>Ordered From : {order.name}</p>

     <p>Cost : Rs.{order.cost}</p>
     <p>Order Status : {order.statusOrder == 1?(<span>Order Placed</span>):(<span>Order Pending</span>) }</p>
     {
       order.statusOrder == 0 && <div className="profile_orderBtnDiv"><Link to={`/payment/${order.restaurant_id}/${order.loc_id}`}><Button className="profile_orderBtn">
         View Order
       </Button></Link></div>
     }
          {
       order.statusOrder == 1 && <div className="profile_orderBtnDiv"><Link to={`/orderDetails/${order.id}`}><Button className="profile_orderBtn">
         View Order
       </Button></Link></div>
     }
       </div>
     )
   })
  ):<h2>You have not placed any orders</h2>

  return (
    <div>
      <NavHome />

      <Container>
                 {userBlock}
                 {deliveryBlock}
                 {textBox}
                 <div>
                   <h3>Your Reviews</h3>
                 {reviewBlock}
                 <div className="payDets_orderMainDiv">
<h3 >Your Orders</h3>
                 
                 {orderBlock}
                 </div>
                 </div>

      </Container>
      <FooterMain/>
    </div>
  );
};
//https://b.zmtcdn.com/web_assets/b69badeeb9ef00f59428b4c09ef4c1901575873261.png
Profile.propTypes = {
    addAddress:PropTypes.func.isRequired,
    getUserOrder:PropTypes.func.isRequired,
  getUserReview: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getCustomerAddress: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
  updateAddress:PropTypes.func.isRequired,
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
  updateAddress,
  getUserReview,
  addAddress,
  getUserOrder
};

export default connect(mapStateToProps, mapActionToProps)(Profile);
