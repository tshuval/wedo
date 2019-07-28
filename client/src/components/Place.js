// @flow
import React from 'react';
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

type Props = {|
  place?: PlaceProps,
  reviews?: [],
  tags?: [],
  handleSave: () => PlaceProps
|};

type CreateModalProps = {|
  show: boolean,
  handleClose: () => void,
|};

type EditModalProps = {|
  place: {place: PlaceProps, tags: [], latest_reviews: []},
  show: boolean,
  handleClose: () => void,
|};

type State = {|...PlaceProps|};

class PlaceForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = this.props.place || this.defaultState;
  }

  defaultState = {
    id: '',
    name: '',
    description: '',
    address: '',
    website: '',
    phone: '',
    email: '',
    lat: 0,
    lon: 0,
    opening_hours: {
      sun_open: '',
      sun_close: '',
      mon_open: '',
      mon_close: '',
      tue_open: '',
      tue_close: '',
      wed_open: '',
      wed_close: '',
      thu_open: '',
      thu_close: '',
      fri_open: '',
      fri_close: '',
      sat_open: '',
      sat_close: ''
    },
    tags: [],
  };

  updateState = (e: SyntheticInputEvent<*>) => {
    this.setState({[e.target.id]: e.target.value});
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
      v = '';
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

  render() {
    const {place, reviews, tags} = this.props;
    let p = place || {};
    if (!p.opening_hours) {
      p.opening_hours = {};
    }

    return (
      <Container>
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
              <Form.Control type="text" placeholder="List of tags, separated by commas" defaultValue={tags} onChange={this.updateState}/>
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
      </Container>
    );
  }
}

export const CreatePlaceFormModal = ({ show, handleClose }: CreateModalProps) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Create a New Place
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlaceForm/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const PlaceDetailsModal = ({ place, show, handleClose }: EditModalProps) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Place Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlaceForm
          place={place.place}
          tags={place.tags}
          reviews={place.latest_reviews}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
