import { ADD_EVENT } from '../types';

export const rootReducer = (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
};
