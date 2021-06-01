import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCollectionRest,
  getCollectionInfo,
} from "../redux/actions/dataAction";
import { getUser } from "../redux/actions/userAction";
import FooterMain from '../components/footer'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/collectionInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import NavHome from "../components/navbar";

const CuisineInfo = (props) => {
  const { restaurants, collection } = props;
  const id = props.match.params.id;
  console.log(id);
  useEffect(() => {
    props.getUser();
    props.getCollectionInfo(id);
    props.getCollectionRest(id);
  }, []);
  const showRestaurants =
    restaurants !== undefined ? (
      <Row>
        {restaurants.map((item, id) => {
          return (
            <Col key={id} sm={3} className="collectInfo_Col">
              <Link to={`/restaurant/${item.restaurant_id}/${item.id}`}>
                <img
                  src={item.images}
                  alt="clnInfoImg"
                  className="collectInfo_img"
                />
              </Link>
              <p className="collectInfo_name">{item.name}</p>
              <p className="collectInfo_rating">
                <FontAwesomeIcon icon={faStar} className="collectInfo_Star" />{" "}
                {item.rating}
              </p>
              <p className="collectInfo_location">{item.locality}</p>
              <p className="collectInfo_cuisines">{item.type}</p>
            </Col>
          );
        })}
      </Row>
    ) : null;

  return (
    <div>
      <NavHome />
      <Container>
        <h1 className="cuisineInfo_CuiName">{collection.name}</h1>
        {showRestaurants}
        {console.log(restaurants)}
      </Container>
      <FooterMain/>
    </div>
  );
};
CuisineInfo.propTypes = {
  getCollectionRest: PropTypes.func.isRequired,
  getCollectionInfo: PropTypes.func.isRequired,
  restaurants: PropTypes.array.isRequired,
  collection: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.data.collection,
  restaurants: state.data.restaurants,
});
const mapActionToProps = {
  getCollectionRest,
  getCollectionInfo,
  getUser,
};

export default connect(mapStateToProps, mapActionToProps)(CuisineInfo);
