import Container from "@mui/material/Container/Container";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { DocumentData, getDocs } from "firebase/firestore";
import { formsRef } from "../database/firebaseConfig";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Alert } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { items } from "../database/db.json";
import "dayjs/locale/es";

export const Answers = () => {
  let navigate = useNavigate();
  const [cuestionaries, setCuestionaries] = useState<DocumentData[]>();

  async function getData() {
    const querySnapshot = await getDocs(formsRef);

    const cuestionariesArr: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      cuestionariesArr.push(doc.data());
    });
    return cuestionariesArr;
  }

  useEffect(() => {
    getData().then((cuestionaries) => {
      setCuestionaries(cuestionaries);
    });
  }, []);

  return cuestionaries ? (
    <Container>
      <Tooltip title="Ir al inicio">
        <IconButton
          sx={{ position: "absolute", top: 0, left: 0, color: "black" }}
          onClick={() => navigate("/")}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
      </Tooltip>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Typography variant="h3" fontFamily="Montserrat" paddingBottom={2}>
          Respuestas
        </Typography>
        <TableContainer component={Paper}>
          {cuestionaries.length === 0 ? (
            <Alert severity="warning">No existen respuestas aún</Alert>
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre completo</TableCell>
                  <TableCell>Correo electrónico</TableCell>
                  <TableCell>Fecha de nacimiento</TableCell>
                  <TableCell>País de origen</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cuestionaries.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.full_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.birth_date !== null &&
                        dayjs(new Date(row.birth_date.seconds * 1000)).format(
                          "DD/MM/YYYY"
                        )}
                    </TableCell>
                    <TableCell>{row.country_of_origin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>
    </Container>
  ) : (
    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  );
};
