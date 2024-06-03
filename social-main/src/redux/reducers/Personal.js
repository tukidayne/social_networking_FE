import * as Types from "../constants/ActionTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();
let initalState = [];

const Personal = (state = initalState, action) => {
  switch (action.type) {
    case Types.PERSONAL_USER:
      const data = action.data.data;
      state = data;
      action.setShowLoading(false);
      return state;
    default:
      return state;
  }
};

export default Personal;
