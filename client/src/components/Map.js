// @flow
import React from 'react';

import { Map as GoogleMap, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

type Props = {|
  places: [],
  google: any
|}

type State = {|
  showingInfoWindow: boolean,
  activeMarker: any,
  selectedPlace: {name: string},
|}

class Map extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.data,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <GoogleMap
        google={this.props.google}
        zoom={15}
        initialCenter={{lat: 32.073, lng: 34.795}}
        onClick={this.onMapClicked}
        >
        {this.props.places && this.props.places.filter(place => place.lat && place.lon).map(place => (
          <Marker
            key={place.id}
            position={{lat: place.lat, lng: place.lon}}
            title={place.name}
            data={place}
            onClick={this.onMarkerClick}
          />
          ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          >
          <div>
            <strong>{this.state.selectedPlace.name}</strong>
          </div>
        </InfoWindow>
      </GoogleMap>
    )
  }
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbWsYd03RL-T_1VZW5wU7Zod2u9H3QIXM',
})(Map);
