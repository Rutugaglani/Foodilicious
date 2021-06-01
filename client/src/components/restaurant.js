import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCategories,
  searchRestaurants,
  getCollections,
  getTypes,
  getCuisines,
  getLocations,
} from "../redux/actions/dataAction";

import FooterMain from "./footer";

import { logoutUser } from "../redux/actions/userAction";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/restaurant.css";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../redux/actions/userAction";

const Restaurants = (props) => {
  const {
    collections,
    logoutUser,
    types,
    cuisines,
    locations,
  } = props;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    props.getCategories();
    props.getCollections();
    props.getTypes();
    props.getCuisines();
    props.getLocations();
    props.getUser();

  }, []);
  useEffect(() => {

  }, []);
  const showTypes =
    types !== undefined ? (
      <div className="main_partDiv">
        <h3 className="main_mainTypeName">Popular Restaurants</h3>

        <p className="main_TypeOptName">
          {types.map((type, id) => {
            return (
              <span>
                <Link to={`/types/${type.id}`} className="main_SubName">
                  {type.name}{" "}
                </Link>
                <FontAwesomeIcon className="main_subIcon" icon={faCircle} />
              </span>
            );
          })}
        </p>
      </div>
    ) : null;
  const showCuisines =
    cuisines != undefined ? (
      <div className="main_partDiv">
        <h3 className="main_mainCuisineName">Popular Cuisines</h3>

        <p className="main_TypeOptName">
          <div className="rest_cuisineRow">
          {cuisines.map((cuisine, id) => {
            return (
             <div className="rest_cuisineCol">
              <span>
                <Link to={`/cuisines/${cuisine.id}`} className="main_cuisName">
                  {cuisine.name}{" "}
                </Link>
              </span>
           </div>
            );
          })}
          </div>
        </p>
      </div>
    ) : null;
  const showLocation =
    locations != undefined ? (
      <div className="main_partDiv">
        <h3 className="main_mainTypeName">Popular Location</h3>

        <p className="main_TypeOptName">
          {locations.map((location, id) => {
            return (
              <span>
                <Link to={`/location/${location.id}`} className="main_SubName">
                  {location.name}{" "}
                </Link>
                <FontAwesomeIcon className="main_subIcon" icon={faCircle} />
              </span>
            );
          })}
        </p>
      </div>
    ) : null;

  const showCollections =
    collections !== undefined ? (
      <div className="main_partDiv">
        <h2 className="main_mainCollName">Collections</h2>
        <p className="main_mainCollDes">
          Explore curated lists of top restaurants, cafes, pubs, and bars in
          Mumbai, based on trends
        </p>
        <div>
          <Row>
            {collections.map((item, id) => {
              console.log(item);
              return (
                <Col sm={3}>
                  <div className="rest_collectionCol">
                    <img className="rest_collectionImg" alt="restClnImg" src={item.img_thumb} />
                    <div className="rest_collectionSpan">
                      <Link to={`/collection/${item.id}`}>
                        <p className="main_collName">{item.name}</p>
                      </Link>
                      {/*<p className="rest_collectionPlace">{item.res_count} places</p>*/}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    ) : null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword !== "") {
      props.searchRestaurants(keyword);
    }
  };

  return (
    <div>
      <div className="restaurant_jumbotron">
        <Nav className="justify-content-end main_homeNav">
          <Nav.Item>
            <Nav.Link className="navbar_restOpt" href="/profile">
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="navbar_restOpt"
              onClick={() => props.logoutUser(props.history)}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <h1 className="rest_brandName">Foodilicious</h1>
        <h2>Discover the best Food and Drinks in Mumbai</h2>
        <InputGroup className="mb-3 mt-4 restaurant_searchMain">
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="restaurant_search"
          />
          <InputGroup.Append>
            <InputGroup.Text
              id="basic-addon2"
              type="submit"
              onClick={handleSubmit}
              className="restaurant_iconSearch"
            >
              <FontAwesomeIcon icon={faSearch} id="ques_iconS" />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <Container>
        {showCollections}
        {showTypes}
        {showCuisines}
        {showLocation}
      </Container>
      <FooterMain/>
    </div>
  );
};
Restaurants.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getCuisines: PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
  searchRestaurants: PropTypes.func.isRequired,
  getCollections: PropTypes.func.isRequired,
  getTypes: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  collections: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  logoutUser: PropTypes.func.isRequired,
  cuisines: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.data.categories,
  collections: state.data.collections,
  cuisines: state.data.cuisines,
  types: state.data.types,
  locations: state.data.locations,
});
const mapActionToProps = {
  getCategories,
  searchRestaurants,
  getCollections,
  getTypes,
  getLocations,
  getCuisines,
  logoutUser,
  getUser,
};

export default connect(mapStateToProps, mapActionToProps)(Restaurants);
