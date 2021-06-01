import React, { Component } from 'react';

import NavHome from '../components/navbar'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom';

import '../css/thankyou.css';
import FooterMain from '../components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'



 class Thankyou extends Component {

    render() {
        return (
          <div>
              <NavHome/>
              
              <Container>
    <p className="ty_confirmation">Your Order has been placed</p>
    <p className="ty_goBack">Go back to home page    <Link to={`/homepage`}><FontAwesomeIcon className="thankyou_leftArrow" icon={faLongArrowAltLeft}/></Link></p>
    </Container>
    <FooterMain/>
</div>
        )
    }
}


export default Thankyou;

