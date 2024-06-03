import axios from "axios";

export default function ApiCallerTest(method = "GET", url, data) {
  return axios({
    method: method,
    url: `http://localhost:3000${url}`,
    data: data,
  });
}
