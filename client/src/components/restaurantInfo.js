import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRestaurantInfo } from "../redux/actions/dataAction";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/restaurantInfo.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const RestaurantInfo = (props) => {
  const { restaurant } = props;
  const restShow =
    restaurant != undefined ? (
      <Container className="restInfo_container">
        <Row>
          <Col sm={10}>
            <h3 className="restInfo_abt">About This Place</h3>
            
            {/* <h3>Cuisines</h3>
    {
        restaurant.cuisines.split(' ').map((item,index)=>{
            return(
                <div key={index} className="restInfo_cuisine">
                <button>{item}</button>
            </div>
            )

        })
    }*/}
            <p className="restInfo_subHead">Popular Dishes</p>
            <p className="restInfo_content">{restaurant.popularDishes}</p>
            <p className="restInfo_subHead">
              People Say this Place is known for{" "}
            </p>
            <p className="restInfo_content">{restaurant.knownFor}</p>
            <p className="restInfo_subHead">Average Cost</p>
            <p className="restInfo_content noMarginBtm">
              Rs.{restaurant.average_cost} for two people (approx)
            </p>
            <p className="restInfo_disclaimer">
              Exclusive of applicable taxes and charges if any
            </p>
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="tooltip-right" className="restInfo_tooltip">
                  The cost for two is computed as follows: 2 mains + 2
                  beverages. The actual cost you incur at a restaurant might
                  change depending on your appetite, or with changes in
                  restaurant menu prices.
                </Tooltip>
              }
            >
              <p className="restInfo_how">how do we calculate cost for 2 ?</p>
            </OverlayTrigger>

            <p className="restInfo_content">Cash and Card accepted</p>
          </Col>
          <Col sm={2}>
            <p className="restInfo_subHead">Address</p>
            <p className="restInfo_content">{restaurant.address}</p>
            <p className="restInfo_subHead">Call</p>
            <p className="restInfo_content">{restaurant.mobileNo}</p>
          </Col>
        </Row>
      </Container>
    ) : null;

  return <div>{restShow}</div>;
};
RestaurantInfo.propTypes = {
  getRestaurantInfo: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.data.restaurant,
});
const mapActionToProps = {
  getRestaurantInfo,
};

export default connect(mapStateToProps, mapActionToProps)(RestaurantInfo);
