import { ADD_EVENT, GET_EVENTS, SELECTED_EVENT, EDIT_EVENT } from '../types';

export const rootReducer = (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: action.payload
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.payload
      };
    case EDIT_EVENT:
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
};
