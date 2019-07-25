// @flow
import React from 'react';

import { Map as GoogleMap, GoogleApiWrapper } from 'google-maps-react';

const Map = (props) => (
  <GoogleMap google={props.google}/>
);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);
