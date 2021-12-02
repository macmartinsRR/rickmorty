async function fetchCharacters(page) {
  try {
    const rmRes = await fetch(`${process.env.REACT_APP_URL}/character?page=${page}`);
    const data = await rmRes.json();

    return data;
  } catch (err) {
    throw err;
  }
}

export default fetchCharacters;
