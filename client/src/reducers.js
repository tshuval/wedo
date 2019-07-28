import { UPDATE_SEARCH_VALUE, UPDATE_PLACES, TOGGLE_OPEN_NOW, UPDATE_CURRENT_PLACE, RESET_CURRENT_PLACE, SET_NOTIFICATION, CLEAR_NOTIFICATION } from './actions';

const initialState = {
  searchString: '',
  places: [],
  openNow: false,
  currentPlace: null,
  notification: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_SEARCH_VALUE:
    return {
      ...state,
      searchString: action.payload,
    };
  case UPDATE_PLACES:
    return {
      ...state,
      places: action.payload,
    };
  case TOGGLE_OPEN_NOW:
    return {
      ...state,
      openNow: !state.openNow,
    };
  case UPDATE_CURRENT_PLACE:
    return {
      ...state,
      currentPlace: action.payload,
    };
  case RESET_CURRENT_PLACE:
    return {
      ...state,
      currentPlace: null,
    };
  case SET_NOTIFICATION:
    return {
      ...state,
      notification: action.payload,
    };
  case CLEAR_NOTIFICATION:
    return {
      ...state,
      notification: null,
    };
  default:
    return state;
  }
};

export default reducer;
