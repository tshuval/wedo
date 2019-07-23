// @flow
import React from 'react';

import { Map as GoogleMap, GoogleApiWrapper } from 'google-maps-react';

const Map = (props) => (
  <GoogleMap google={props.google}/>
);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbWsYd03RL-T_1VZW5wU7Zod2u9H3QIXM',
})(Map);
