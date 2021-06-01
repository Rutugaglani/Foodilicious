import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRestaurantInfo } from "../redux/actions/dataAction";
import { getUser } from "../redux/actions/userAction";
import RestInfoTemp from "../components/restInfoTemp";
import FooterMain from '../components/footer'
import RestaurantInfo from "../components/restaurantInfo";
import NavHome from "../components/navbar";
import "../css/review.css";

class InfoRest extends Component {
  componentDidMount() {
    this.props.getUser();
    const id = this.props.match.params.id;
    const locId = this.props.match.params.locId;
    console.log(id);
    this.props.getRestaurantInfo(id, locId);
  }
  render() {
    return (
      <div>
        <NavHome />

        {this.props.restaurant !== undefined && (
          <RestInfoTemp
            restaurant={this.props.restaurant}
            id={this.props.match.params.id}
            locId={this.props.match.params.locId}
          />
        )}
        {this.props.restaurant !== undefined && (
          <RestaurantInfo
            restaurant={this.props.restaurant}
            id={this.props.match.params.id}
            locId={this.props.match.params.locId}
          />
        )}
          <FooterMain/>
      </div>
    );
  }
}
InfoRest.propTypes = {
  getRestaurantInfo: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  restaurantReview: PropTypes.object.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurantReview: state.data.restaurantReview,
  restaurant: state.data.restaurant,
});
const mapActionToProps = {
  getRestaurantInfo,
  getUser,
};

export default connect(mapStateToProps, mapActionToProps)(InfoRest);
