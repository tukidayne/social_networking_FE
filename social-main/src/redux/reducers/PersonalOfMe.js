import * as Types from "../constants/ActionTypes";

let initalState = [];

const Personal = (state = initalState, action) => {
  switch (action.type) {
    case Types.GET_PERSONAL_BY_ID_OF_ME:
      const data = action.data;
      state = data;
      return state;
    default:
      return state;
  }
};

export default Personal;
