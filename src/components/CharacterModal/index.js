import { Fade, Modal, Typography } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import { makeStyles } from "@mui/styles";

const useStyles = (darkTheme) =>
  makeStyles({
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: darkTheme ? "#181818" : "lightgray",
      color: darkTheme ? "white" : "black",
      border: "2px solid #fff",
      borderRadius: 5,
      padding: 4,
    },
  });

function CharacterModal({ isOpen, handleModalClose, characterDetails }) {
  const {
    image,
    name,
    gender,
    species,
    status,
    type,
    origin,
    location,
    episode,
  } = characterDetails;

  const darkTheme = useTheme();
  const classes = useStyles(darkTheme)();

  return (
    <Modal open={isOpen} onClose={handleModalClose} disableAutoFocus>
      <Fade in={isOpen}>
        <div className={classes.modal}>
          <img src={image} style={{ width: "100%" }} alt={name} />
          <div style={{ padding: 5 }}>
            <Typography variant="h5" className="bold" pt={1} pb={1}>
              {name}
            </Typography>
            <Typography variant="body2" className="bold">
              Gender: <span className="normal">{gender}</span>
            </Typography>
            <Typography variant="body2" className="bold">
              Species: <span className="normal">{species}</span>
            </Typography>
            <Typography variant="body2" className="bold">
              Status: <span className="normal">{status}</span>
            </Typography>
            {type && (
              <Typography variant="body2" className="bold">
                Type: <span className="normal">{type}</span>
              </Typography>
            )}
            <Typography variant="body2" className="bold">
              Origin: <span className="normal">{origin.name}</span>
            </Typography>
            <Typography variant="body2" className="bold">
              Last known location:{" "}
              <span className="normal">{location.name}</span>
            </Typography>
            <Typography variant="body2" className="bold">
              Number of episodes:{" "}
              <span className="normal">{episode.length}</span>
            </Typography>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default CharacterModal;
