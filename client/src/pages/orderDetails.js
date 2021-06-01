import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getOrderItems } from "../redux/actions/userAction";



import "../css/orderDetails.css";

import NavHome from "../components/navbar";

import FooterMain from '../components/footer'
import moment from "moment";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
moment().format();

const OrderDetails = (props) => {
    const {user,getOrderItems} = props;
   const order_id=props.match.params.id
     useEffect(() => {
        getOrderItems(order_id)
     }, [order_id]);

     const orderDets=user.orderItems[0] ?(
         <div>
            <p className="ordets_ordNo">Order No : {user.orderItems[0].order_id}</p>
            <p className="ordets_ordDate">Ordered on : {moment(user.orderItems[0].date).format("DD MMM, YYYY")} </p>
     <p className="ordets_ordDate">Amount : Rs.{user.orderItems[0].cost}</p>
         </div>

     ) :null

     const orderItemDets =user.orderItems[0] && user.orderItems.map((item, ind) => {
        
        return (
          <div key={ind} className="ordets_ordetsDets">
            <div>
              <FontAwesomeIcon
                icon={faCircle}
                className={`ordets_${item.category}`}
              />
            </div>
            <div>
              <p className="ordets_ordetsDetName">{item.name}</p>
              <p>Rs.{item.price}</p>
            </div>
            <div>
              <p className="ordets_ordetsDetQty ">qty : {item.quantity}</p>
              <p>Rs.{item.quantity *item.price}</p>
            </div>
          </div>
        );
      });
   
     return (
       <div>
         <NavHome />
   
         <Container className="ordets_container">
             {orderDets}
{
    orderItemDets
}
   
         </Container>
         <FooterMain/>
       </div>
     );
   };
OrderDetails.propTypes = {
    getOrderItems:PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});
const mapActionToProps = {
    getOrderItems
};

export default connect(mapStateToProps, mapActionToProps)(OrderDetails);
