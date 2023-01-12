import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { items } from "../database/db.json";
import {
  Box,
  Container,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
  Paper,
  Alert,
  FormHelperText,
  Tooltip,
  IconButton,
  Link,
} from "@mui/material";
import { Assignment, ContentPasteSearch } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { formsRef } from "../database/firebaseConfig";
import { Footer } from "./Footer";

type dataType = {
  full_name: string;
  email: string;
  birth_date: Dayjs | null;
  country_of_origin: string;
  terms_and_conditions: boolean;
};
type errorsType = {
  full_name: string;
  email: string;
  birth_date: string;
  country_of_origin: string;
};

export const Form = () => {
  let navigate = useNavigate();
  const initialData = {
    full_name: "",
    email: "",
    birth_date: null,
    country_of_origin: "",
    terms_and_conditions: false,
  };
  const initialDataErrors = {
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
  };
  const [errors, setErrors] = useState(initialDataErrors);
  const [formData, setFormData] = useState<dataType>(initialData);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    msg: any;
    color: "success" | "info" | "warning" | "error";
  }>();

  const handleChange = (field: string, value: string | boolean | Date) => {
    setFormData((prevState: any) => {
      return {
        ...prevState,
        [field as keyof dataType]: value,
      };
    });
  };
  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setLoading(true);
    setErrors(initialDataErrors);
    setAlert(undefined);
    event.preventDefault();
    if (
      formData.full_name === "" ||
      !formData.full_name.match(/^[a-zA-Z ]+$/)
    ) {
      setErrors((prevState: any) => {
        return {
          ...prevState,
          full_name: "Debe escribir un nombre",
        };
      });
    } else if (
      formData.email === "" ||
      !formData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setErrors((prevState: any) => {
        return {
          ...prevState,
          email: "Su correo no tiene un formato válido",
        };
      });
    } else if (
      formData.birth_date === null ||
      formData.birth_date.toString() === "Invalid Date"
    ) {
      setErrors((prevState: any) => {
        return {
          ...prevState,
          birth_date: "La fecha no es válida",
        };
      });
    } else if (formData.country_of_origin === "") {
      setErrors((prevState: any) => {
        return {
          ...prevState,
          country_of_origin: "Debe seleccionar un país",
        };
      });
    } else if (!formData.terms_and_conditions) {
      setAlert({
        msg: "Debe aceptar los términos y condiciones para continuar",
        color: "error",
      });
    } else {
      try {
        await setDoc(doc(formsRef, formData.email), formData);
        setAlert({
          msg: (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>
                ¡Cuestionario enviado! Accede a todas las respuestas&nbsp;
              </Typography>
              <Link
                onClick={() => navigate("/respuestas")}
                sx={{ cursor: "pointer", fontSize: "1rem", lineHeight: "1.5" }}
              >
                aquí
              </Link>
            </Box>
          ),
          color: "success",
        });
        setFormData(initialData);
      } catch (error) {
        setAlert({
          msg: "Hubo un error al procesar su cuestionario: " + error,
          color: "error",
        });
      }
    }
    setLoading(false);
  }

  return (
    <Container>
      <Tooltip title="Ver respuestas">
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "black",
          }}
          onClick={() => navigate("/respuestas")}
        >
          <ContentPasteSearch fontSize="large" />
        </IconButton>
      </Tooltip>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", pb: 2, alignItems: "center", gap: 2 }}>
          <Assignment sx={{ fontSize: "2.6rem" }} />
          <Typography variant="h3" fontFamily="Montserrat">
            Cuestionario
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {items.map((item, i) => (
            <FormControl key={i}>
              {{
                checkbox: (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(formData[item.name as keyof dataType])}
                        onChange={(e) =>
                          handleChange(item.name as string, e.target.checked)
                        }
                      />
                    }
                    label={item.label}
                  />
                ),
                select: (
                  <>
                    <InputLabel id={item.name}>{item.label}</InputLabel>
                    <Select
                      name={item.name}
                      label={item.label}
                      value={formData[item.name as keyof dataType] as string}
                      onChange={(e) => {
                        setErrors((prevState: any) => {
                          return {
                            ...prevState,
                            country_of_origin: "",
                          };
                        });
                        handleChange(item.name as string, e.target.value);
                      }}
                      required={item.required}
                    >
                      {item.options !== undefined &&
                        item.options.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors[item.name as keyof errorsType] !== "" ? (
                      <FormHelperText
                        sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                      >
                        {errors[item.name as keyof errorsType]}
                      </FormHelperText>
                    ) : null}
                  </>
                ),
                date: (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="es"
                  >
                    <DatePicker
                      label={item.label}
                      value={formData[item.name as keyof dataType]}
                      onChange={(e) => {
                        if (e) {
                          setErrors((prevState: any) => {
                            return {
                              ...prevState,
                              birth_date: "",
                            };
                          });
                          handleChange(
                            item.name as string,
                            (e as Dayjs).toDate()
                          );
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          error={errors[item.name as keyof errorsType] !== ""}
                          helperText={errors[item.name as keyof errorsType]}
                          required={item.required}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                ),
                submit: (
                  <LoadingButton
                    sx={{ maxWidth: "100px", m: "auto" }}
                    type="submit"
                    loading={loading}
                    onClick={(e) => handleSubmit(e)}
                    disabled={!formData.terms_and_conditions}
                  >
                    {item.label}
                  </LoadingButton>
                ),
              }[item.type] || (
                <TextField
                  type={item.type}
                  name={item.name}
                  required={item.required}
                  label={item.label}
                  value={formData[item.name as keyof dataType]}
                  onChange={(e) =>
                    handleChange(item.name as string, e.target.value)
                  }
                  error={errors[item.name as keyof errorsType] !== ""}
                  helperText={errors[item.name as keyof errorsType]}
                ></TextField>
              )}
            </FormControl>
          ))}
        </Box>
        {alert !== undefined && (
          <Alert sx={{ mt: 3 }} severity={alert.color}>
            {alert.msg}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};
