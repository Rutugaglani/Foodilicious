import React from "react";

import "../css/navbar.css";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/FormControl";
import { withRouter } from "react-router-dom";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../redux/actions/userAction";

const NavHome = (props) => {
  return (
    <Navbar className="nav_main" expand="lg">
      <Navbar.Brand className="nav_mainLogo" href="/homepage">
        Foodilicious
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="nav_collapse">
        <Nav className="mx-auto">
          <InputGroup className="mb-3 nav_searchMain">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              type="text"
              name="search"
              className="nav_search"
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2" className="nav_iconSearch">
                <FontAwesomeIcon icon={faSearch} id="nav_iconS" />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link href="/profile" className="navbar_opt">
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="navbar_opt"
              onClick={() => props.logoutUser(props.history)}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
NavHome.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
const mapActionToProps = {
  logoutUser,
};

export default withRouter(connect(null, mapActionToProps)(NavHome));
