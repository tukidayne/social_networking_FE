import * as Types from "../constants/ActionTypes";

let initialState = {
  bill: [],
  post: [],
  history: [],
};

const Apartment = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_BILL:
      const data = action.data;
      state.bill = data;
      return { ...state };
    case Types.GET_POST_APARTMENT:
      const dataPost = action.data;
      state.post = dataPost;
      return { ...state };
    case Types.PAYMENT_HISTORY:
      state.history = action.data;
      return { ...state };
    default:
      return { ...state };
  }
};

export default Apartment;
