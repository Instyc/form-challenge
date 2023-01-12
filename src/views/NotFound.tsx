import React from "react";
import { Container, Typography } from "@mui/material";
import { DoNotDisturbOnTotalSilence } from "@mui/icons-material";

export const NotFound = () => {
  return (
    <Container sx={{ display: "flex", alignItems: "center", gap: 4 }}>
      <DoNotDisturbOnTotalSilence sx={{ fontSize: "3.5rem" }} />
      <Typography variant="h2">Página no encontrada</Typography>
    </Container>
  );
};
