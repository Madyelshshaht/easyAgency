"use client";

import { createTheme } from "@mui/material/styles";

export function createAppTheme(direction: "rtl" | "ltr") {
  return createTheme({
    direction,
    palette: {
      primary: { main: "#176b55", dark: "#104c3d", light: "#e7f2ed" },
      secondary: { main: "#e8a544" },
      background: { default: "#f8faf8", paper: "#ffffff" },
      text: { primary: "#172c26", secondary: "#5a6a63" },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: 'Arial, "Noto Sans Arabic", sans-serif',
      button: { textTransform: "none", fontWeight: 700 },
    },
  });
}
