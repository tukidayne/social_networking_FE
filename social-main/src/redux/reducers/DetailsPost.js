import * as Types from "../constants/ActionTypes";

let initialState = [];

const DetailsPost = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_DETAILS_POST_INDEX:
      const data = action.data;
      state = data;
      return state;
    default:
      return state;
  }
};

export default DetailsPost;
