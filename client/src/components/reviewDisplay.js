// let rating = stars.map(star=>{ return(
//     this.state.rating >= star? (<FontAwesomeIcon icon={faStar} className="compDets_yellowStar"/>):(<FontAwesomeIcon icon={faStar} className="compDets_emptyStar"/>)
// )})
// let feedback = this.state.feedback != '' ? (<div>{this.state.feedback}</div>):null
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import "../css/review.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
moment().format();

const ReviewDisplay = (props) => {
  const stars = [1, 2, 3, 4, 5];

  const { review } = props;

  console.log(review);

  const reviewList = review.length
    ? review.map((rev, i) => {
        const date = moment(rev.date_time).format("DD MMM, YYYY");
        return (
          <Row className="compDets_feedbackDisplay" key={i}>
            {/*
             <Col xs={2} md={1} className="compDets_feedbackImageCol">
                <img src={rev.user.profile_image} alt="default"/>
              </Col>
             */}

            <Col xs={6} className="compDets_feedbackNameCol">
              <p>{rev.username}</p>
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
    : null;

  return <div>{reviewList}</div>;
};
export default ReviewDisplay;
