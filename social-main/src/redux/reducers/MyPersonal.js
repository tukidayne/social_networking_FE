import * as Types from "../constants/ActionTypes";

let initialState = [];

const MyUser = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_MY_PERSONAL:
      const data = action.data;
      state = data;
      return state;
    case Types.PERSONAL_USER_BY_ID:
      const dataById = action.data.data;
      state = dataById;
      return state;
    default:
      return state;
  }
};

export default MyUser;
