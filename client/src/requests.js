// @flow
import axios from 'axios';
import type { PlaceProps, ReviewProps } from './types';

axios.defaults.baseURL = process.env.REACT_APP_SERVER;

// We are sending the client's timezone offset to the server to calculate
// the user's time
const tzOffset = new Date().getTimezoneOffset() * -60;

export class BackendClient {
  // Get list of tags matching 'q'
  getTags = async (q: string) => {
    try {
      const response = await axios.get('/tags?q=' + q);
      return response.data.tags;
    } catch (error) {
      console.error(error);
    }
  }

  // Get a list of places
  getPlaces = async (q?: string, openNow?: boolean) => {
    let params: {
      q?: string,
      open_now?: string,
      tz_offset: number
    } = { tz_offset: tzOffset };
    if (q) {
      params.q = q;
    }
    if (openNow) {
      params.open_now = '';
    }

    try {
      const response = await axios.get('/places', { params: params });
      return response.data.places;
    } catch (error) {
      console.error(error);
    }
  }

  // Get list of reviews for place
  getReviews = async (placeId: string) => {
    try {
      const response = await axios.get('/places/' + placeId + '/reviews');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // Get a place
  getPlace = async (placeId: string) => {
    try {
      const response = await axios.get('/places/' + placeId);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // Create a place
  createPlace = async (placeParams: PlaceProps) => {
    try {
      const response = await axios.post('/places/', placeParams);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // Update a place
  updatePlace = async (placeId: string, placeParams: PlaceProps) => {
    try {
      const response = await axios.put('/places/' + placeId, placeParams);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // Create a review for a place
  createReview = async (placeId: string, reviewParams: ReviewProps) => {
    try {
      const response = await axios.post('/places/' + placeId + '/reviews', reviewParams);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
