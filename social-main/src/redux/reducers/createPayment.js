import * as Types from "../constants/ActionTypes";

let initialState = [];

const Apartment = (state = initialState, action) => {
  switch (action.type) {
    case Types.CREATE_PAYMENT:
      state = action.data;
      return state;
    default:
      return state;
  }
};

export default Apartment;
