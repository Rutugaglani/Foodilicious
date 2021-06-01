import React from "react";
import { Link } from "react-router-dom";
import "../css/login.css";

import { Formik } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signupUser } from "../redux/actions/userAction";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

//Bootstrap
import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password can be maximum 10 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  username: Yup.string().defined("Required"),
  checkbox: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});
const Signup = (props) => {
  const {
    user: { errSignup },
  } = props;
  console.log(errSignup);
  return (
    <div className="login_main">
      {/*<div className="login_logo_div">
            <img src={Logo} className="login_logo" alt="company_logo"/>   
        </div>*/}
      {errSignup && (
        <Alert variant="danger" className="login_alert">
          <Alert.Heading>
            <FontAwesomeIcon icon={faTimesCircle} className="login_errIcon" />
            {errSignup}
          </Alert.Heading>
        </Alert>
      )}
      <Container className="login_container">
        <h1 className="signup_header">Create an account</h1>
        <p className="signup_quick">It is quick and easy</p>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            checkbox: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const newUserData = {
              username: values.username,
              password: values.password,
              email: values.email,
            };
            props.signupUser(newUserData, props.history);
            console.log(values);
          }}
        >
          {({ errors, touched, values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {console.log(errors)}
              <Form.Group className="signup_formgroup">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className={
                    errors.username && touched.username
                      ? "signup_inputError"
                      : "signup_input"
                  }
                  onChange={handleChange}
                  name="username"
                  value={values.username}
                />
              </Form.Group>
              {errors.username && touched.username ? (
                <p className="signupErrorP">*{errors.username}</p>
              ) : null}

              <Form.Group
                className="signup_formgroup"
                controlId="formBasicEmail"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className={
                    errors.email && touched.email
                      ? "signup_inputError"
                      : "signup_input"
                  }
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                />
              </Form.Group>
              {errors.email && touched.email ? (
                <p className="signupErrorP">*{errors.email}</p>
              ) : null}

              <Form.Group className="signup_formgroup">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className={
                    errors.password && touched.password
                      ? "signup_inputError"
                      : "signup_input"
                  }
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                />
              </Form.Group>
              {errors.password && touched.password ? (
                <p className="signupErrorP">*{errors.password}</p>
              ) : null}
              <Form.Group className="signup_formgroup">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "signup_inputError"
                      : "signup_input"
                  }
                  onChange={handleChange}
                  name="confirmPassword"
                  value={values.confirmPassword}
                />
              </Form.Group>
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="signupErrorP">*{errors.confirmPassword}</p>
              ) : null}

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  className="signup_checkbox"
                  name="checkbox"
                  onChange={handleChange}
                  value={values.checkbox}
                  label="By clicking on Signup , you agree to our Terms , Data Policy and Cookie Policy"
                />
                {errors.checkbox && touched.checkbox ? (
                  <p className="signupErrorP">*{errors.checkbox}</p>
                ) : null}
              </Form.Group>
              <Button className="login_loginBtn" type="submit">
                SIGN UP
              </Button>
            </Form>
          )}
        </Formik>

        <p className="login_signup">
          Already have an account ?{" "}
          <Link to="/">
            <span>Login</span>
          </Link>
        </p>
      </Container>
    </div>
  );
};
Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapActionToProps)(Signup);
