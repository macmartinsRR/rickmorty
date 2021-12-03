import axios from "axios";

async function signOut() {
  return axios
    .get(`${process.env.REACT_APP_URL}/user/logout`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
}

export default signOut;
