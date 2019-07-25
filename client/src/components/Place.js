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
|};

type CreateModalProps = {|
  show: boolean,
  handleClose: () => void
|};

type EditModalProps = {|
  place: {place: PlaceProps, tags: [], latest_reviews: []},
  show: boolean,
  handleClose: () => void
|};

type State = {|
  toggleHours: boolean,
  toggleReviews: boolean
|};

class PlaceForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      toggleHours: false,
      toggleReviews: false
    }
  }

  handleToggleHours = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    this.setState({toggleHours: !this.state.toggleHours});
  }

  handleToggleReviews = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    this.setState({toggleReviews: !this.state.toggleReviews});
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
          <Form.Group as={Form.Row} controlId="formHorizontalName">
            <Col>
              <Form.Control type="text" placeholder="Name" defaultValue={p.name} />
            </Col>
          </Form.Group>

          <Form.Group as={Form.Row} controlId="formHorizontalDescription">
            <Col>
              <Form.Control type="text" placeholder="Description" defaultValue={p.description} />
            </Col>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formHorizontalAddress">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text title="Address">&#9737;</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="text" placeholder="Address" defaultValue={p.address} />
                </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formHorizontalWebsite">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text title="Website">www</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="text" placeholder="Website" defaultValue={p.website} />
                </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formHorizontalPhone">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text title="Phone">&#9742;</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Phone" defaultValue={p.phone} />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formHorizontalEmail">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text title="Email">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="email" placeholder="Email" defaultValue={p.email} />
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formHorizontalLatitude">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text title="Latitue">lat</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Latitude" defaultValue={p.lat} />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formHorizontalLongitude">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text title="Longitude">lon</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Longitude" defaultValue={p.lon} />
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Group as={Form.Row} controlId="formHorizontalTags">
            <Form.Label column sm={1}>Tags</Form.Label>
            <Col sm={11}>
              <Form.Control type="text" placeholder="List of tags, separated by commas" defaultValue={tags} />
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
                <Form.Group as={Form.Row} controlId="formHorizontalOpeningHours1">
                  <Form.Label column sm={1}>Sun</Form.Label>
                  <Col sm={2}><Form.Control type="text" placeholder="From" defaultValue={p.opening_hours.sun_open} /></Col>-
                  <Col sm={2}><Form.Control type="text" placeholder="To" defaultValue={p.opening_hours.sun_close} /></Col>
                </Form.Group>

                <Form.Group as={Form.Row} controlId="formHorizontalOpeningHours2">
                  <Form.Label column sm={1}>Mon</Form.Label>
                  <Col sm={2}><Form.Control type="text" placeholder="From" defaultValue={p.opening_hours.mon_open} /></Col>-
                  <Col sm={2}><Form.Control type="text" placeholder="To" defaultValue={p.opening_hours.mon_close} /></Col>
                </Form.Group>

                <Form.Group as={Form.Row} controlId="formHorizontalOpeningHours3">
                  <Form.Label column sm={1}>Tue</Form.Label>
                  <Col sm={2}><Form.Control type="text" placeholder="From" defaultValue={p.opening_hours.tue_open} /></Col>-
                  <Col sm={2}><Form.Control type="text" placeholder="To" defaultValue={p.opening_hours.tue_close} /></Col>
                </Form.Group>

                <Form.Group as={Form.Row} controlId="formHorizontalOpeningHours4">
                  <Form.Label column sm={1}>Wed</Form.Label>
                  <Col sm={2}><Form.Control type="text" placeholder="From" defaultValue={p.opening_hours.wed_open} /></Col>-
                  <Col sm={2}><Form.Control type="text" placeholder="To" defaultValue={p.opening_hours.wed_close} /></Col>
                </Form.Group>

                <Form.Group as={Form.Row} controlId="formHorizontalOpeningHours5">
                  <Form.Label column sm={1}>Thu</Form.Label>
                  <Col sm={2}><Form.Control type="text" placeholder="From" defaultValue={p.opening_hours.thu_open} /></Col>-
                  <Col sm={2}><Form.Control type="text" placeholder="To" defaultValue={p.opening_hours.thu_close} /></Col>
                </Form.Group>

                <Form.Group as={Form.Row} controlId="formHorizontalOpeningHours6">
                  <Form.Label column sm={1}>Fri</Form.Label>
                  <Col sm={2}><Form.Control type="text" placeholder="From" defaultValue={p.opening_hours.fri_open} /></Col>-
                  <Col sm={2}><Form.Control type="text" placeholder="To" defaultValue={p.opening_hours.fri_close} /></Col>
                </Form.Group>

                <Form.Group as={Form.Row} controlId="formHorizontalOpeningHours7">
                  <Form.Label column sm={1}>Sat</Form.Label>
                  <Col sm={2}><Form.Control type="text" placeholder="From" defaultValue={p.opening_hours.sat_open} /></Col>-
                  <Col sm={2}><Form.Control type="text" placeholder="To" defaultValue={p.opening_hours.sat_close} /></Col>
                </Form.Group>
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
};

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
