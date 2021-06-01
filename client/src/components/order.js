import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import{getRestaurantInfo} from '../redux/actions/dataAction'; 
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row' 
import Col from 'react-bootstrap/Col'
import '../css/restaurantInfo.css'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const OrderInfo=(props)=> {
    const {restaurantMenu}=props;
    

      const restShow=restaurant != undefined  ? (
         <div>
        <Container className="restInfo_container">
        <Row>
            <Col sm={8}>
               <img src={restaurant.thumb} className="restInfo_mainthumb"/> 
            </Col>
            <Col>
            </Col>
        </Row>
        <h1 className="restInfo_name">{restaurant.name}</h1>
      <p>{restaurant.establishment[0]} - {restaurant.cuisines}</p>
      <p>{restaurant.location.locality}</p>
      <p>Timings - {restaurant.timings} </p>
    <p>In light of the government advisory, dining services may be affected. Please contact the restaurant before visiting.</p>
    <div className="restInfo_opt">
        <button>Overview</button>
        <button>Order Online</button>
    </div>
    <Row>
        <Col sm={10}>
    <h2>About This Place</h2>
    <h3>Menu</h3>
    <h3>Cuisines</h3>
    {
        restaurant.cuisines.split(' ').map((item,index)=>{
            return(
                <div key={index} className="restInfo_cuisine">
                <button>{item}</button>
            </div>
            )

        })
    }
    <h3>Popular Dishes</h3>
    {
        popular.map((dish,id)=>{
            return(
<div key={id} className="restInfo_popularDish">
               {dish},
            </div>
            )
            
        })
    }
    <h3>People Say this Place is known for </h3>
    <div className="restInfo_highlights">
    <p>
    {restaurant.highlights.map((item,i)=>{
               return(
                   <span> {item},</span>
               )
           })}
           </p>

    </div>
    <h3>Average Cost</h3>
    <p>Rs.{restaurant.average_cost_for_two} for two people (approx)</p>
    <p>Exclusive of applicable taxes and charges if any</p>
    <p>how do we calculate cost for 2 ?</p>
    <p>Cash and Card accepted</p>

    <div>
        <h3>Are You A Food Blogger</h3>
        <button>Click here </button>
    </div>
    </Col>
    <Col sm={2}>
    <p>{restaurant.location.address}</p>
    <p>{restaurant.phone_numbers}</p>
    </Col>
    </Row>

    </Container>          
           <p></p>
           
           
           <p>{restaurant.user_rating.aggregate_rating}</p>
           <p>{restaurant.user_rating.rating_text}</p>
           
           

           <img src={restaurant.thumb}/>
           <img src={restaurant.photos_url}/>
          
           </div>  
      ):null

      const reviewShow=restaurantReview !=undefined ?(
        restaurantReview.user_reviews.map((item,i)=>{
            return(
                <div>
                    <p>{item.review.user.name}</p>
                    <img src={item.review.user.profile_image}/>
                    <p>{item.review.rating}</p>
                    <p>{item.review.rating_text}</p>
                    <p>{item.review.review_time_friendly}</p>
                </div>
            )
        })
      ):null;

    return (
        <div>
           {restShow}
           {reviewShow}
             {console.log(restaurant)}
             </div>
      
    )
}
RestaurantInfo.propTypes={
    restaurantMenu:PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    restaurantMenu:state.data.restaurantMenu,
})


export default connect(mapStateToProps)(OrderInfo);