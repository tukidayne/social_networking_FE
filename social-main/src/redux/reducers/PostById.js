import * as Types from "../constants/ActionTypes";

let initialState = [];

const PostById = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_POST_BY_ID:
      const data = action.data;
      state = data;
      return state;
    default:
      return state;
  }
};

export default PostById;
