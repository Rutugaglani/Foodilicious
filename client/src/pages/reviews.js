import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRestaurantInfo, postReview } from "../redux/actions/dataAction";
import { getUser } from "../redux/actions/userAction";
import ReviewDisplay from "../components/reviewDisplay";
import ReviewForm from "../components/reviewForm";
import RestInfoTemp from "../components/restInfoTemp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/review.css";
import FooterMain from '../components/footer'
import NavHome from "../components/navbar";

class Reviews extends Component {
  state = {
    reviewApi: [],
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    const locId = this.props.match.params.locId;
    console.log(id, locId);
    this.props.getUser();
    this.props.getRestaurantInfo(id, locId);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.restaurantReview !== prevProps.restaurantReview) {
      this.setState({
        reviewApi: this.props.restaurantReview,
      });

      console.log(this.state.reviewApi);
    }
    console.log(this.state.reviewApi);
  }

  addReview = (body, rating) => {
    const rest_id = this.props.match.params.id;
    const user_id = this.props.credentials.id;
    this.props.postReview(body, rating, rest_id, user_id);
    console.log(postReview);
  };
  render() {
    return (
      <div>
        <NavHome />
        <RestInfoTemp
          restaurant={this.props.restaurant}
          id={this.props.match.params.id}
          locId={this.props.match.params.locId}
        />

        <Container>
          <Row>
            <Col sm={9}>
              {this.state.reviewApi !== undefined && (
                <ReviewDisplay review={this.state.reviewApi} />
              )}
            </Col>
            <Col sm={3}>
              <ReviewForm addReview={this.addReview} />
            </Col>
          </Row>
        </Container>
        <FooterMain/>
      </div>
    );
  }
}
Reviews.propTypes = {
  getRestaurantInfo: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  restaurantReview: PropTypes.array.isRequired,
  restaurant: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurantReview: state.data.restaurantReview,
  restaurant: state.data.restaurant,
  credentials: state.user.credentials,
});
const mapActionToProps = {
  getRestaurantInfo,
  postReview,
  getUser,
};

export default connect(mapStateToProps, mapActionToProps)(Reviews);
