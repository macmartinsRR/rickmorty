import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Character from "../Character";
import CharacterModal from "../CharacterModal";
import { useTheme, useThemeUpdate } from "../ThemeContext";
import { useToggle } from '../../hooks';

const url = "http://localhost:3000/api/character";
const limit = 10;

const useStyles = (darkTheme) =>
  makeStyles({
    container: {
      padding: 10,
      backgroundColor: darkTheme ? "rgb(36, 40, 47)" : "white",
    },
    center: {
      display: "flex",
      justifyContent: "center",
    },
    header: {
      height: 200,
      backgroundColor: darkTheme ? "white" : "black",
      color: darkTheme ? "black" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    loadCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export function Homepage() {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const classes = useStyles(darkTheme)();

  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [characterCount, setCharacterCount] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [toggle, setToggle] = useToggle(false);

  const handleModalOpen = () => {
    setToggle(true);
  };

  const handleModalClose = () => {
    setToggle(false);
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const rmRes = await fetch(`${url}?page=${page}`);

      const data = await rmRes.json();
      setCharacters(data.results);
      setCharacterCount(data.info.count);
      setIsLoading(false);
    })();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectCard = (id) => {
    const item = characters.find((x) => x.id === id);
    setSelectedCharacter(item);
    handleModalOpen();
  };

  return (
    <div className={classes.container}>
      <button onClick={toggleTheme}>
        Toggle {darkTheme ? "light" : "dark"} mode
      </button>
      <div className={classes.header}>
        <Typography variant="h2" className="bold">
          Rick and Morty
        </Typography>
      </div>
      {isLoading ? (
        <div style={{ position: "fixed", left: "50%" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2} p={5}>
          {characters.map((char) => {
            return (
              <Grid item xs={12} md={6} key={char.id}>
                <Character
                  id={char.id}
                  gender={char.gender}
                  name={char.name}
                  img={char.image}
                  species={char.species}
                  status={char.status}
                  location={char.location}
                  origin={char.origin}
                  type={char.type}
                  numberOfEpisodes={char.episode.length}
                  handleSelectCard={handleSelectCard}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      {!isLoading && (
        <Pagination
          page={page}
          count={Math.ceil(characterCount / limit)}
          className={classes.center}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: darkTheme ? "white" : "black",
            },
          }}
        />
      )}
      {selectedCharacter && (
        <CharacterModal
          isOpen={toggle}
          handleModalClose={handleModalClose}
          characterDetails={selectedCharacter}
        />
      )}
    </div>
  );
}

export default Homepage;
