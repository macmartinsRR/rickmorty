import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { changeWindowTitle } from "../../utils";

const useStyles = (darkTheme) =>
  makeStyles({
    link: {
      color: darkTheme ? "white" : "black",
    },
  });

export function Sitemap() {
  const darkTheme = useTheme();
  const classes = useStyles(darkTheme)();

  useEffect(() => changeWindowTitle("Sitemap"));

  return (
    <Box p={5} sx={{ color: darkTheme ? "white" : "black" }}>
      <h1>Pages</h1>
      <ul>
        <li>
          <Link to="/" className={classes.link}>
            Homepage
          </Link>
        </li>
      </ul>
    </Box>
  );
}
