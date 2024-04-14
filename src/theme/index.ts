"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0c0c0e",
      // light: "#0070ff",
      light: "#d15534",
      dark: "#cececf",
      // dark: "#2b2b2b",
    },
    secondary: {
      main: "#858586",
      light: "#3d3d3e",
      dark: "#2b2b2b",
      contrastText: "black",
    },
    text: {
      primary: "#000000",
      secondary: "black",
    },
  },
});
