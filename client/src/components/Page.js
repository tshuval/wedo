// @flow
import React from 'react';
import { connect } from 'react-redux';

// bootstrap objects
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// components
import SearchCombo from './SearchCombo';
import Checkbox from './Checkbox';
import { CardList } from './CardList';
import { CreatePlaceFormModal, PlaceDetailsModal } from './Place';
import Notification from './Notification';
import Map from './Map';

import './Page.css';

import { doFetchPlaces, resetCurrentPlace, clearError } from '../actions';

type Props = {
  'google': any,
  places: Array<any>,
  doFetchPlaces: Function,
  lastError: string
};

type State = {|
  showCreatePlace: boolean,
  showPlaceDetails: boolean
|};

class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showCreatePlace: false,
      showPlaceDetails: false
    };
    this.props.doFetchPlaces();
  }

  handleShow = () => (
    this.setState({showCreatePlace: true})
  )

  handleClose = () => (
    this.setState({showCreatePlace: false})
  )

  handleShowDetails = () => {
    console.log('handling')
    this.setState({showPlaceDetails: true});
  }

  handleCloseDetails = () => (
    this.setState({showPlaceDetails: false})
  )

  render() {
    return (
      <Container className="containerStyle">
        <Navbar bg="light" expand="lg" className="navStyle">
          <Navbar.Brand href="#">WeDo!</Navbar.Brand>
          <Button variant="outline-success" onClick={this.handleShow}>Create place</Button>
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
                <CardList places={this.props.places}/>
              </Col>
            </Row>
          </Col>

          {/* Right two thirds, google map */}
          <Col lg={8} className="rightSide">
            <div className="mapContainer">
              <Map places={this.props.places}/>
            </div>
          </Col>

        </Row>

        <CreatePlaceFormModal show={this.state.showCreatePlace} handleClose={this.handleClose} />
        {this.props.currentPlace && <PlaceDetailsModal show={true} handleClose={this.props.resetCurrentPlace} place={this.props.currentPlace} />}
        {this.props.lastError && <Notification message={this.props.lastError}/>}
      </Container>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    places: state.places,
    currentPlace: state.currentPlace,
    lastError: state.lastError
  };
}

const mapDispatchToProps = {
  doFetchPlaces,
  resetCurrentPlace,
  clearError
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
