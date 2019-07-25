import { BackendClient } from './requests';

let connection = new BackendClient();

export const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE';
export const UPDATE_PLACES = 'UPDATE_PLACES';
export const UPDATE_CURRENT_PLACE = 'UPDATE_CURRENT_PLACE';
export const TOGGLE_OPEN_NOW = 'TOGGLE_OPEN_NOW';
export const RESET_CURRENT_PLACE = 'RESET_CURRENT_PLACE';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export const updateSearchValue = (value) => (
  {type: UPDATE_SEARCH_VALUE, payload: value}
);

export const updatePlaceList = (places) => (
  {type: UPDATE_PLACES, payload: places}
);

export const updateCurrentPlace = (place) => (
  {type: UPDATE_CURRENT_PLACE, payload: place}
)

export const toggleOpenNow = () => (
  {type: TOGGLE_OPEN_NOW}
);

export const resetCurrentPlace = () => (
  {type: RESET_CURRENT_PLACE}
);

export const setNotification = (type, message) => (
  {type: SET_NOTIFICATION, payload: {type: type, message: message}}
);

export const clearNotification = () => (
  {type: CLEAR_NOTIFICATION}
);

export const doFetchPlaces = () => {
  return async (dispatch, getState) => {
    let q = getState().searchString;
    let openNow = getState().openNow;
    let places = [];
    places = await connection.getPlaces(q, openNow);
    dispatch(updatePlaceList(places));
  }
};

export const doGetPlace = (placeId) => {
  return async (dispatch, getState) => {
    let place = await connection.getPlace(placeId);
    dispatch(updateCurrentPlace(place));
  }
}
