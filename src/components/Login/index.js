import React from "react";
import { Button, Grid, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "../../contexts/ThemeContext";
import CustomTF from "../CustomTF";
import { login } from "../../api";
import { useForm, Controller } from "react-hook-form";

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

export function Login({ isOpen, handleModalClose, handleLogginStatus }) {
  const darkTheme = useTheme();
  const classes = useStyles(darkTheme)();
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      alert("Successfully logged in!");
      handleLogginStatus(true);
      handleModalClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <form autoComplete="off" noValidate className={classes.modal}>
        <Typography
          variant="h4"
          className="bold"
          sx={{ p: 3, textAlign: "center" }}
        >
          Login
        </Typography>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Controller
              name="username"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CustomTF
                  value={value}
                  label="Username"
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Username required" }}
            />
          </Grid>
          <Grid item>
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CustomTF
                  value={value}
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: "Password required",
              }}
            />
          </Grid>
          <Grid item display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              color={darkTheme ? "primary" : "secondary"}
              onClick={handleSubmit(onSubmit)}
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
