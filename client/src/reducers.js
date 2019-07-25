import {UPDATE_SEARCH_VALUE, UPDATE_PLACES, TOGGLE_OPEN_NOW, UPDATE_CURRENT_PLACE, RESET_CURRENT_PLACE, SET_ERROR, CLEAR_ERROR} from './actions';

const initialState = {
  searchString: '',
  places: [],
  openNow: false,
  currentPlace: null,
  lastError: null
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
  case UPDATE_SEARCH_VALUE:
    return {
      ...state,
      searchString: action.payload
    };
  case UPDATE_PLACES:
    return {
      ...state,
      places: action.payload
    };
  case TOGGLE_OPEN_NOW:
    return {
      ...state,
      openNow: !state.openNow
    };
  case UPDATE_CURRENT_PLACE:
    return {
      ...state,
      currentPlace: action.payload
    }
  case RESET_CURRENT_PLACE:
    return {
      ...state,
      currentPlace: null
    };
  case SET_ERROR:
    return {
      ...state,
      lastError: action.payload
    };
  case CLEAR_ERROR:
    return {
      ...state,
      lastError: null
    };
  default:
    return state;
  }
}

export default reducer;
