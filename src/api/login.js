import axios from "axios";

async function login(data) {
  return axios
    .post(`${process.env.REACT_APP_URL}/user/login`, data)
    .then((res) => res.data)
    .catch((err) => {
      let message = "";
      if (err.response.status === 401) message = "Invalid username/password";
      else message = err.response.data;

      throw new Error(message);
    });
}

export default login;
