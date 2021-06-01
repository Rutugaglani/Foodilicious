import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRestaurantInfo } from "../redux/actions/dataAction";
import { getUser } from "../redux/actions/userAction";

import RestInfoTemp from "../components/restInfoTemp";
import Online from "../components/online";

import "../css/review.css";

import NavHome from "../components/navbar";
import { faWindows } from "@fortawesome/free-brands-svg-icons";

class OrderOnline extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    const locId = this.props.match.params.locId;
    console.log(id);
    this.props.getUser();
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
        <Online
          id={this.props.match.params.id}
          locId={this.props.match.params.id}
          user_id={this.props.credentials.id}
          order={this.props.order}
        />
         
      </div>
    );
  }
}
OrderOnline.propTypes = {
  getRestaurantInfo: PropTypes.func.isRequired,
  menu: PropTypes.array.isRequired,
  restaurant: PropTypes.object.isRequired,
  order: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.data.menu,
  restaurant: state.data.restaurant,
  order: state.data.order,
  credentials: state.user.credentials,
});
const mapActionToProps = {
  getRestaurantInfo,
  getUser,
};

export default connect(mapStateToProps, mapActionToProps)(OrderOnline);
