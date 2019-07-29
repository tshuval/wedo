// @flow
import React, { useState } from 'react';

// bootstrap objects
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// components
import { SearchCombo } from './SearchCombo';
import { Checkbox } from './Checkbox';
import { CardList } from './CardList';
import { PlaceFormModal } from './Place';
import Map from './Map';

import './Page.css';

type Props = {'google': any};

const card = {
  id: 'AAAA-BBBB',
  title: 'Beer Garden',
  description: 'Drink beer in the garden',
  address: '1 Herzl st.',
  score: 4,
  website: 'http://www.example.com',
};

const Page = (props: Props) => {
  const [showCreatePlace, setShowCreatePlace] = useState(false);
  const handleClose = () => setShowCreatePlace(false);
  const handleShow = () => setShowCreatePlace(true);

  return (
    <Container className="containerStyle">

      <Navbar bg="light" expand="lg" className="navStyle">
        <Navbar.Brand href="#">WeDo!</Navbar.Brand>
        <Button variant="outline-success" onClick={handleShow}>Create place</Button>
      </Navbar>

      <Row className="contentStyle">

        {/* Left third, search box and search results */}
        <Col lg={4} className="leftSide">
          <Row>
            <Col>
              <Form>
                <Form.Row>
                  <Col>
                    <SearchCombo />
                  </Col>
                  <Col>
                    <Checkbox message="Open now"/>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
          <Row className="listStyle">
            <Col>
              <CardList places={[card, card]}/>
            </Col>
          </Row>
        </Col>

        {/* Right two thirds, google map */}
        <Col lg={8} className="rightSide">
          <div className="mapContainer">
            <Map />
          </div>
        </Col>

      </Row>

      <PlaceFormModal showCreatePlace={showCreatePlace} handleClose={handleClose} />
    </Container>
  );
};


export default Page;
