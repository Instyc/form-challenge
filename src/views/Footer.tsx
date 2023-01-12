import React from "react";
import { Typography } from "@mui/material";

export const Footer = () => {
  const anio = new Date().getFullYear();

  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "10px 0px",
        backgroundColor: "transparent",
      }}
    >
      <Typography
        style={{ marginTop: "1rem", marginBottom: "0px", color: "black" }}
        fontSize="0.9rem"
      >
        &copy; {anio} - Desarrollado por Ferran Solis Chorvat
      </Typography>
    </footer>
  );
};
