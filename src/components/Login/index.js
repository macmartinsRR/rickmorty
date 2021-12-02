import React, { useState } from "react";
import { Button, Grid, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "../../contexts/ThemeContext";
import CustomTF from "../CustomTF";

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
      padding: 10,
      width: 400,
    },
    textfieldColor: {},
  });

export function Login({ isOpen, handleModalClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const darkTheme = useTheme();
  const classes = useStyles(darkTheme)();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("submitting");
  };

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
        className={classes.modal}
      >
        <Typography
          variant="h4"
          className="bold"
          sx={{ p: 3, textAlign: "center" }}
        >
          Sign Up
        </Typography>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <CustomTF
              value={username}
              label="Username"
              fullWidth
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item>
            <CustomTF
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              color={darkTheme ? "primary" : "secondary"}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}

export default Login;
