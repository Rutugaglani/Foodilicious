import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "../css/review.css";
import RatingComponent from "react-star-rating-component";


class ReviewForm extends Component {
  state = {
    body: "",
    rating: 0,
    send: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addReview(this.state.body, this.state.rating);
    console.log(this.state.body);
    console.log(this.state.rating);
    this.setState({
      body: "",
      send: true,
    });
  };
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    console.log(this.state.rating);
  }

  render() {
    const { rating, send } = this.state;
    return (
      <div className="compDets_Feedback">
        {!send && (
          <Container
            className="compDets_feedbackContainer"
            style={{ paddingLeft: 0 }}
          >
            <h4 className="compDets_feedbackHeader">
              Rate and share your experience !!
            </h4>
            <Form className="compDets_FeedbackForm">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  className="compDets_TextfieldForm"
                  as="textarea"
                  rows="3"
                  placeholder="Write a feedback !!!"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <div>
                <div className="compDets_rating">
                  <RatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                    className="compDets_starSize"
                  />
                </div>
                <Button
                  variant="primary"
                  className="compDets_feedbackSendBtn"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Send
                </Button>
              </div>
            </Form>
          </Container>
        )}
        {send && (
          <div className="compDets_reviewSubmitted">
            {" "}
            <Container>
              <p> Your review has been submitted !!</p>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default ReviewForm;
