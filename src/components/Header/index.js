import {
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useTheme, useThemeUpdate } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useState } from "react";
import SignUp from "../SignUp";
import Login from "../Login";
import { signOut } from "../../api";

const useStyles = (darkTheme) =>
  makeStyles({
    title: {
      height: 200,
      backgroundColor: darkTheme ? "white" : "black",
      color: darkTheme ? "black" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    menuButton: {
      my: 2,
      color: (darkTheme ? "white" : "black") + " !important",
      display: "block",
    },
  });

export function Header() {
  const [toggleSignUp, setToggleSignUp] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const toggleTheme = useThemeUpdate();
  const darkTheme = useTheme();

  const classes = useStyles(darkTheme)();

  const handleSignOut = async () => {
    try {
      await signOut();
      handleLogginStatus(false);
    } catch (err) {
      alert(err);
    }
  };

  const handleLogginStatus = (status) => {
    localStorage.setItem("loggedIn", status);
    setLoggedIn(status);
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          background: darkTheme ? "black" : "white",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Button
                key={"Homepage"}
                component={Link}
                to="/"
                className={classes.menuButton}
              >
                Homepage
              </Button>
              <Button
                key={"Sitemap"}
                component={Link}
                to="/sitemap"
                className={classes.menuButton}
              >
                Sitemap
              </Button>
            </Box>
            <Box display="flex" alignItems="center">
              {!loggedIn ? (
                <div>
                  <Button
                    key={"Sign up"}
                    className={classes.menuButton}
                    onClick={() => setToggleSignUp(true)}
                  >
                    Sign Up
                  </Button>
                  <Button
                    key={"Login"}
                    className={classes.menuButton}
                    onClick={() => setToggleLogin(true)}
                  >
                    Login
                  </Button>
                </div>
              ) : (
                <Button
                  key={"Sign out"}
                  className={classes.menuButton}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              )}
              <IconButton onClick={toggleTheme}>
                {darkTheme ? (
                  <LightMode style={{ color: "white" }} />
                ) : (
                  <DarkMode />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.title}>
        <Typography variant="h2" className="bold">
          Rick and Morty
        </Typography>
      </div>
      {toggleSignUp && (
        <SignUp
          isOpen={toggleSignUp}
          handleModalClose={() => setToggleSignUp(false)}
          handleLogginStatus={handleLogginStatus}
        />
      )}
      {toggleLogin && (
        <Login
          isOpen={toggleLogin}
          handleModalClose={() => setToggleLogin(false)}
          handleLogginStatus={handleLogginStatus}
        />
      )}
    </div>
  );
}
