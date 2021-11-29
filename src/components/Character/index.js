import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const useStyles = (status, darkTheme) =>
  makeStyles({
    card: {
      display: "flex",
      backgroundColor: darkTheme
        ? "#181818 !important"
        : "lightGray !important",
      color: darkTheme ? "white !important" : "black",
    },
    dot: {
      height: "10px",
      width: "10px",
      backgroundColor:
        status === "Alive" ? "green" : status === "Dead" ? "red" : "gray",
      borderRadius: "50%",
      display: "inline-block",
    },
    mBox: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor: "white",
      padding: 4,
    },
  });

function Character({
  id,
  name,
  img,
  status,
  species,
  location,
  origin,
  handleSelectCard,
}) {
  const darkTheme = useTheme();
  const classes = useStyles(status, darkTheme)();

  return (
    <div>
      <CardActionArea onClick={() => handleSelectCard(id)}>
        <Card className={classes.card} elevation={5}>
          <CardMedia component="img" sx={{ width: 200 }} image={img} />
          <CardContent>
            <Typography variant="body1" className="bold">
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span className={classes.dot} style={{ marginRight: 5 }} />
              {status} - {species}
            </Typography>
            <br />
            <Typography variant="body2" className={classes.bold}>
              Last known location:
            </Typography>
            <Typography variant="body2">{location.name}</Typography>
            <br />
            <Typography variant="body2" className={classes.bold}>
              Origin:
            </Typography>
            <Typography variant="body2">{origin.name}</Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
}

export default Character;
