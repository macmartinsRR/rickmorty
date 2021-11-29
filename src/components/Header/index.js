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
import { useTheme, useThemeUpdate } from "../ThemeContext";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

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
  const toggleTheme = useThemeUpdate();
  const darkTheme = useTheme();
  const classes = useStyles(darkTheme)();

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
            <Box sx={{ flexGrow: 0 }}>
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
    </div>
  );
}
