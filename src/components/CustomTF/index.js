import { TextField } from "@mui/material";
import { createStyles, withStyles } from "@mui/styles";
import { useTheme } from "../../contexts/ThemeContext";

const CustomTF = (theme) => {
  const darkTheme = useTheme();
  return createStyles({
    root: {
      "& label": {
        color: darkTheme
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      },
      "& label.Mui-focused": {
        color: darkTheme
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      },
      "& .MuiOutlinedInput-root": {
        color: darkTheme
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
        "& fieldset": {
          borderColor: darkTheme
            ? theme.palette.primary.dark
            : theme.palette.secondary.dark,
        },
        "&:hover fieldset": {
          borderColor: darkTheme
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        },
        "&.Mui-focused fieldset": {
          borderColor: darkTheme
            ? theme.palette.primary.light
            : theme.palette.secondary.light,
        },
      },
    },
  });
};

export default withStyles(CustomTF)(TextField);
