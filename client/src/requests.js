// @flow
import type { PlaceProps, ReviewProps } from './types';

const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000';

// We are sending the client's timezone offset to the server to calculate
// the user's time
const tzOffset = new Date().getTimezoneOffset() * -60;

export class BackendClient {
  // Get list of tags matching 'q'
  getTags = (q: string) => (
    axios.get('/tags?q=' + q)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  );

  // Get a list of places
  getPlaces = (q?: string, openNow?: boolean) => {
    let params: {
      q?: string,
      open_now?: string,
      tz_offset: number
    } = {tz_offset: tzOffset};
    if (q) params['q'] = q;
    if (openNow) params['open_now'] = ''

    axios.get('/places', {params: params})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Get list of reviews for place
  getReviews = (placeId: string) => (
    axios.get('/places/' + placeId + '/reviews')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  );

  // Get a place
  getPlace = (placeId: string) => (
    axios.get('/places/' + placeId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  );

  // Create a place
  createPlace = (placeParams: PlaceProps) => (
    axios.post('/places/', placeParams)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  );

  // Update a place
  updatePlace = (placeId: string, placeParams: PlaceProps) => (
    axios.put('/places/' + placeId, placeParams)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  );

  // Create a review for a place
  createReview = (placeId: string, reviewParams: ReviewProps) => (
    axios.post('/places/' + placeId + '/reviews', reviewParams)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  );
}
