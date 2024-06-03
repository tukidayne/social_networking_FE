import * as Types from "../constants/ActionTypes";

let initalState = [];

const Loadmore = (state = initalState, action) => {
  switch (action.type) {
    case Types.LOAD_MORE:
      const data = action.data;
      state = data;
      return state;
    default:
      return state;
  }
};

export default Loadmore;
