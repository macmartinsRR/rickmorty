import axios from "axios";

async function signUp(data) {
  return axios
    .post(`${process.env.REACT_APP_URL}/user`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
}

export default signUp;
