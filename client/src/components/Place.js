// @flow
import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { Review } from './Review';
import { CreateReviewForm } from './CreateReviewForm';
import type { PlaceProps } from '../types';

import { doSavePlace } from '../actions';

type Props = {|
  show: boolean,
  title: string,
  saveButtonText: string,
  place?: PlaceProps,
  reviews?: [],
  tags?: [],
  handleClose: () => void,
  doSavePlace: (PlaceProps) => void,
|};

type State = {|...PlaceProps|};

class PlaceForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = this.props.place || this.defaultState;
  }

  defaultState = {
    id: null,
    name: null,
    description: null,
    address: null,
    website: null,
    phone: null,
    email: null,
    lat: null,
    lon: null,
    opening_hours: {
      sun_open: null,
      sun_close: null,
      mon_open: null,
      mon_close: null,
      tue_open: null,
      tue_close: null,
      wed_open: null,
      wed_close: null,
      thu_open: null,
      thu_close: null,
      fri_open: null,
      fri_close: null,
      sat_open: null,
      sat_close: null
    },
    tags: [],
  };

  updateState = (e: SyntheticInputEvent<*>) => {
    this.setState({[e.target.id]: e.target.value});
  }

  updateTags = (e: SyntheticInputEvent<*>) => {
    this.setState({tags: e.target.value.split(',')});
  }

  updateTime = (e: SyntheticInputEvent<*>) => {
    let v = e.target.value;
    if (isNaN(Number(v))) {return;}
    switch (v.length) {
    case 1:
      v = '0' + v + ':00';
      break;
    case 2:
      v = v + ':00';
      break;
    case 3:
      v = v.charAt(0) + ':' + v.slice(1);
      break;
    case 4:
      v = v.slice(0, 2) + ':' + v.slice(2);
      break;
    default:
      v = null;
    }
    e.target.value = v;
    let parts = e.target.id.split('.');
    this.setState(prevState => ({
      opening_hours: {
        ...prevState.opening_hours,
        [parts[1]]: v
      }
    }));
  }

  handleSave = () => {
    this.props.doSavePlace(this.state);
  }

  render() {
    const {place, reviews, tags} = this.props;
    let p = place || {};
    if (!p.opening_hours) {
      p.opening_hours = {};
    }

    return (
      <Container>
        <Modal show={this.props.show} onHide={this.props.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Form.Row} controlId="name">
                <Col>
                  <Form.Control type="text" placeholder="Name" defaultValue={p.name} onChange={this.updateState}/>
                </Col>
              </Form.Group>

              <Form.Group as={Form.Row} controlId="description">
                <Col>
                  <Form.Control type="text" placeholder="Description" defaultValue={p.description} onChange={this.updateState}/>
                </Col>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="address">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text title="Address">&#9737;</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Address" defaultValue={p.address} onChange={this.updateState}/>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="website">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text title="Website">www</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Website" defaultValue={p.website} onChange={this.updateState}/>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="phone">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text title="Phone">&#9742;</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Phone" defaultValue={p.phone} onChange={this.updateState}/>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="email">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text title="Email">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="email" placeholder="Email" defaultValue={p.email} onChange={this.updateState}/>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="lat">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text title="Latitue">lat</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Latitude" defaultValue={p.lat} onChange={this.updateState}/>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="lon">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text title="Longitude">lon</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Longitude" defaultValue={p.lon} onChange={this.updateState}/>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Group as={Form.Row} controlId="tags">
                <Form.Label column sm={1}>Tags</Form.Label>
                <Col sm={11}>
                  <Form.Control type="text" placeholder="List of tags, separated by commas" defaultValue={tags} onChange={this.updateTags}/>
                </Col>
              </Form.Group>
            </Form>

            <Accordion defaultActiveKey={reviews ? "reviews" : "hours"}>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="hours">
                  Opening Hours
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="hours">
                  <Card.Body>
                    <Form>
                      {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => (
                        <Form.Group as={Form.Row} key={day}>
                          <Form.Label column sm={1}>{day.charAt(0).toUpperCase() + day.slice(1)}</Form.Label>
                          <Col sm={2}><Form.Control type="text" placeholder="From" defaultValue={p.opening_hours[day+"_open"]} onBlur={this.updateTime} id={"opening_hours."+day+"_open"}/></Col>-
                          <Col sm={2}><Form.Control type="text" placeholder="To" defaultValue={p.opening_hours[day+"_close"]} onBlur={this.updateTime} id={"opening_hours."+day+"_close"}/></Col>
                        </Form.Group>
                      ))
                      }
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              {reviews &&
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="reviews">
                    Reviews
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="reviews">
                    <Card.Body>
                      {reviews.length > 0 && <h6>Most recent reviews</h6>}
                      {reviews.length === 0 && <cite>No reviews yet. Be the first to review this place!</cite>}
                      <ListGroup>
                        {reviews.map(r => <Review key={r.id} {...r}/>)}
                      </ListGroup>

                      <CreateReviewForm placeId={p.id}/>

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              }
            </Accordion>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              {this.props.saveButtonText}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  doSavePlace,
}

export default connect(null, mapDispatchToProps)(PlaceForm);
