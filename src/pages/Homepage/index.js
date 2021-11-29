import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Character from "../../components/Character";
import CharacterModal from "../../components/CharacterModal";
import { useTheme } from "../../contexts/ThemeContext";
import { useToggle } from "../../hooks";
import { changeWindowTitle } from "../../utils";
import { fetchCharacters } from "../../api";
import config from "../../config.json";

const useStyles = (darkTheme) =>
  makeStyles({
    container: {
      padding: 10,
      backgroundColor: darkTheme ? config.dtBgColor : config.wtBgColor,
    },
    center: {
      display: "flex",
      justifyContent: "center",
    },
    loadCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    centerOfScreen: { position: "fixed", left: "50%", bottom: "50%" },
  });

export function Homepage() {
  const darkTheme = useTheme();
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
    changeWindowTitle("Homepage");
    setIsLoading(true);

    (async () => {
      try {
        const data = await fetchCharacters(page);
        setCharacters(data.results);
        setCharacterCount(data.info.count);
      } catch (err) {
        alert(err.message);
      }
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
      {isLoading ? (
        <div className={classes.centerOfScreen}>
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
          count={Math.ceil(characterCount / config.limit)}
          className={classes.center}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: darkTheme ? config.dtColor : config.wtColor,
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
