const config = require("../config.json")

async function fetchCharacters(page) {
  try {
    const rmRes = await fetch(`${config.apiURL}?page=${page}`);
    const data = await rmRes.json();

    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchCharacters,
};
