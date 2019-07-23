// @flow
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

import type { PlaceProps } from '../types';

type Props = {|
  place?: PlaceProps,
  showCreatePlace?: boolean,
  handleClose?: Function
|};

export const PlaceForm = ({ place }: Props) => {
  let p = place || {};
  if (!p.opening_hours) {
    p.opening_hours = {};
  }

  return (
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

      <Form.Group as={Form.Row} controlId="formHorizontalAddress">
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text title="Address">&#9737;</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder="Address" defaultValue={p.address} />
          </InputGroup>
        </Col>
      </Form.Group>

      <Form.Group as={Form.Row} controlId="formHorizontalWebsite">
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text title="Website">www</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder="Website" defaultValue={p.website} />
          </InputGroup>
        </Col>
      </Form.Group>

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
          <Form.Control type="text" placeholder="List of tags, separated by commas" defaultValue={p.tags} />
        </Col>
      </Form.Group>

      <Form.Label>Opening Hours</Form.Label>

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
  );
};

export const PlaceFormModal = ({ place, showCreatePlace, handleClose }: Props) => {
  return (
    <Modal show={showCreatePlace} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Create a new place
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlaceForm/>
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
