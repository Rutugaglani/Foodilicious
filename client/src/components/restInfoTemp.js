import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/restaurantInfo.css";
import moment from "moment";
moment().format();

const RestInfoTemp = (props) => {
  const { restaurant, id, locId } = props;
  const restShow =
    restaurant != undefined ? (
      <Container className="restInfo_container">
        <Row>
          <Col sm={12}>
            <img src={restaurant.images} alt="restImg" className="restInfo_mainthumb" />
          </Col>
          <Col></Col>
        </Row>
        <h1 className="restInfo_name">{restaurant.name}</h1>
        <p className="restInfo_type">{restaurant.type}</p>

        <p>
          <span className="restIfo_timeSpan">Timings - </span>
          {moment(restaurant.timings, "HHmmss").format("LT")} -{" "}
          {moment(restaurant.closingTime, "HHmmss").format("LT")}{" "}
        </p>
        <p>
          In light of the government advisory, dining services may be affected.
          Please contact the restaurant before visiting.
        </p>
        <div className="restInfo_opt">
          <Link to={`/restaurant/${id}/${locId}`}>
            <button className="restInfo_btnOpt">Overview</button>
          </Link>
          <Link to={`/order/${id}/${locId}`}>
            <button className="restInfo_btnOpt" >Order Online</button>
          </Link>
          <Link to={`/reviews/${id}/${locId}`}>
            <button className="restInfo_btnOpt">Reviews</button>
          </Link>
        </div>
      </Container>
    ) : null;

  return (
    <div>
      {restShow}
      {console.log(restaurant)}
    </div>
  );
};

export default RestInfoTemp;
