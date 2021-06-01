import React from "react";

import "../css/navbar.css";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row' 
import Col from 'react-bootstrap/Col'
import '../css/footer.css'

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram,faFacebook,faTwitter, faGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { logoutUser } from "../redux/actions/userAction";

const FooterMain = (props) => {
    const company=["Who are we","Blog","Careers","Report Fraud"]
    const contact=["info@foodilicious.com","+91 9427698222", "+91 079 26405333"]
    const forYou=["Privacy","Terms","Security","Sitemaps"]
    const restaurants=["Add a Restaurant" , "Claim a listing" , "Business App","Products for Businesses"]
  return (
      <div className="FooterMainDiv">
<Container className="FooterMain">
    <h2>Foodilicious</h2>
    <Row  className="footerRow">
        <Col sm={3} className="footerCol">
            <p className="footerSub">Company</p>
            {
                company.map((comp,id)=>{
                    return(
                        <p key={id} className="footerOpt">
                        {comp}
                    </p>
                    )

                })
            }
        </Col>

        <Col sm={3} className="footerCol">
            <p className="footerSub">Contact</p>
            {
                contact.map((con,id)=>{
                  return(
                    <p key={id} className="footerOpt">
                    {con}
                </p>
                  )   
                
                })
                

            
            }
            <p>
                <FontAwesomeIcon icon={faTwitter} className="footer_icon"/>
                <FontAwesomeIcon icon={faFacebook} className="footer_icon"/>
                <FontAwesomeIcon icon={faGooglePlus} className="footer_icon"/>
                <faFontAwesome icon={faInstagram} className="footer_icon"/>
            </p>
        </Col>
        <Col sm={3} className="footerCol">
            <p className="footerSub">For Restaurants</p>
            {
                restaurants.map((rest,id)=>{
return(
    <p key={id} className="footerOpt">
                        {rest}
                    </p>
)
                    
                })
            }
        </Col>
        <Col sm={3} className="footerCol">
            <p className="footerSub">For You</p>
            {
                forYou.map((fy,id)=>{
return(
    <p key={id} className="footerOpt">
                        {fy}
                    </p>
)
                    
                })
            }
        </Col>

    </Row>
    <Row className="footer2">
		<p><span class="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span>  2018 Foodilicious ALL RIGHTS RESERVED</p></Row>
</Container>
</div>
   
  );
};

export default FooterMain;
