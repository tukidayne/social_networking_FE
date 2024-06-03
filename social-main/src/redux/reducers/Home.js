import * as Types from "../constants/ActionTypes";

let initialState = [];

const Home = (state = initialState, action) => {
  switch (action.type) {
    case Types.SUGGESTED_ACCOUNTS:
      const data = action.data.data;
      state = data;
      return state;
    default:
      return state;
  }
};

export default Home;
