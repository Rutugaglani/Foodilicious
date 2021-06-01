import React ,{useState} from 'react';
import {Link} from 'react-router-dom';
import '../css/login.css';
import Logo from '../image/empty.jpg';
import FooterMain from '../components/footer'
import { Formik } from 'formik';

import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import{ loginUser } from '../redux/actions/userAction'; 

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

//Bootstrap
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

        const validationSchema = Yup.object().shape({
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .max(24, 'Password can be maximum 24 characters')
              .required('Required'),
              email: Yup.string()
              .email('Invalid email')
              .required('Required')
               
        })
        const Login = (props) => {
            const {user:{authenticated,loading,errLogin}}=props
            console.log(errLogin)
            
        return (
          
            <div className="login_main">
            {/*<div className="login_logo_div">
            <img src={Logo} className="login_logo" alt="company_logo"/>   
        </div>*/}
            {
                errLogin &&(
                    <Alert variant="danger" className="login_alert">
                      <Alert.Heading><FontAwesomeIcon icon={faTimesCircle} className="login_errIcon"/>{errLogin}</Alert.Heading>
                    </Alert>
                  
                )
                
            }
            <Container className="login_container">
                <h1 className="login_header">Login to your <span className="login_brandName">Foodilicious</span> account</h1>
                <Formik initialValues={{
                    email:'',
                    password:'',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    console.log(values);
                    const userData ={
                        email : values.email,
                        password: values.password
                    };
                    props.loginUser(userData,props.history)
                    
                  }}
               
                >
                    {({errors,touched,values, handleChange,handleSubmit})=>(
                       
                                        <Form  onSubmit={handleSubmit}>
                                            {console.log(errors)}
                                           
                                        <InputGroup className={errors.email && touched.email?"login_inputError":"login_inputMain mb-3"}>
                                            <InputGroup.Prepend>
                                                 <InputGroup.Text id="basic-addon1" className="login_iconInput" ><FontAwesomeIcon icon={faUser} className="login_icon"/></InputGroup.Text>
                                             </InputGroup.Prepend>
                                            <FormControl
                                            type="email"
                                            className="login_input"
                                            placeholder="Email"
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                            onChange={handleChange}
                                            name="email"
                                            value={values.email}
                                        />
                                        </InputGroup>
                                        {errors.email && touched.email? (
             <p className="signupErrorP">*{errors.email}</p>
           ) : null
           }
                                        <InputGroup  className={errors.password && touched.password?"login_inputError ":"login_inputMain"} >
                                            <InputGroup.Prepend>
                                                 <InputGroup.Text id="basic-addon1" className="login_iconInput" ><FontAwesomeIcon icon={faLock} className="login_icon"/></InputGroup.Text>
                                             </InputGroup.Prepend>
                                            <FormControl
                                            type="password"
                                            className="login_input"
                                            placeholder="Password"
                                            aria-label="Password"
                                            aria-describedby="basic-addon1"
                                            onChange={handleChange}
                                            name="password"
                                            value={values.password}
                                        
                                            />
                                        </InputGroup>
                                        {errors.password && touched.password? (
             <p className="signupErrorP">*{errors.password}</p>
           ) : null
           }
                                        <Link to ="/forgot_password"><p className="forgot_password">forgot password ? </p></Link>
                                        <Button className="login_loginBtn" type="submit">LOG IN</Button>
                                        </Form>
                    )}

                </Formik>
                <p className="login_connect">Or connect using</p>
                <div className="login_socialMedia">
                <Button className="login_socialMediaBtn" id="Facebook"><FontAwesomeIcon icon={faFacebook} className= "login_socialMediaIcon" />Facebook</Button>
                <Button className="login_socialMediaBtn" id="Google"><FontAwesomeIcon icon={faGoogle}  className= "login_socialMediaIcon"/>Google</Button>
                </div>
                <p className="login_signup">Don't have an account ? <Link to ="/signup"><span>Sign up</span></Link></p>
            </Container>
            </div>
        )
    }
    Login.propTypes={
        loginUser : PropTypes.func.isRequired,
        user : PropTypes.object.isRequired
    }
    
    const mapStateToProps = (state) =>({
        user : state.user
    })
    const mapActionToProps = {
        loginUser
    }
    
    export default connect(mapStateToProps , mapActionToProps)(Login);



