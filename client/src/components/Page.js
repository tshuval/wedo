// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
import PlaceForm from './Place';
import Map from './Map';

import type { PlaceProps } from '../types';

import './Page.css';
import 'react-notifications/lib/notifications.css';

import { doFetchPlaces, resetCurrentPlace, clearNotification } from '../actions';

type Props = {
  'google': any,
  places: Array<any>,
  doFetchPlaces: () => void,
  currentPlace: {place: PlaceProps, tags: [], latest_reviews: []},
  resetCurrentPlace: () => void,
  clearNotification: () => void,
  notification: {type: string, message: string}
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
      showPlaceDetails: false,
    };
    this.props.doFetchPlaces();
  }

  handleShow = () => (
    this.setState({ showCreatePlace: true })
  )

  handleClose = () => (
    this.setState({ showCreatePlace: false })
  )

  handleShowDetails = () => {
    this.setState({ showPlaceDetails: true });
  }

  handleCloseDetails = () => (
    this.setState({ showPlaceDetails: false })
  )

  showNotification = (notification: {type: string, message: string}) => {
    if (notification.type === 'error') {
      NotificationManager.error(notification.message, 'Error');
    }
    if (notification.type === 'success') {
      NotificationManager.success(notification.message, 'Success');
    }
    this.props.clearNotification();
  }

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

        <PlaceForm
          show={this.state.showCreatePlace}
          handleClose={this.handleClose}
          title="Create a New Place"
          saveButtonText="Create"
        />
        {this.props.currentPlace &&
          <PlaceForm
            show={true}
            handleClose={this.props.resetCurrentPlace}
            title="Place Details"
            saveButtonText="Save Changes"
            // place={this.props.currentPlace}
            place={this.props.currentPlace.place}
            tags={this.props.currentPlace.tags}
            reviews={this.props.currentPlace.latest_reviews}
          />}

        <NotificationContainer/>
        {this.props.notification && this.showNotification(this.props.notification)}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places,
    currentPlace: state.currentPlace,
    notification: state.notification,
  };
};

const mapDispatchToProps = {
  doFetchPlaces,
  resetCurrentPlace,
  clearNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
