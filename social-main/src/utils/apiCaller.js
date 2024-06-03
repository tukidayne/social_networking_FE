import axios from "axios";
import * as Config from "../redux/constants/ActionTypes";

export default function apiCaller(method = "GET", url, data) {
  return axios({
    method: method,
    url: `${Config.API_URL}${url}`,
    data: data,
  });
}
