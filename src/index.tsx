import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./database/firebaseConfig";
import "./index.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES as coreEsES } from "@mui/material/locale";
import { esES } from "@mui/x-date-pickers";
import reportWebVitals from "./reportWebVitals";
import { AppRouter } from "./routers/AppRouter";
import { Footer } from "./views/Footer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const theme = createTheme(
  {
    typography: {
      allVariants: {
        fontFamily: [
          "Rubik",
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ].join(","),
      },
    },
  },
  esES,
  coreEsES
);

theme.typography.h3 = {
  "@media (min-width:600px)": {
    fontSize: "1.2rem",
  },
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Suspense
          fallback={
            <Backdrop open>
              <CircularProgress />
            </Backdrop>
          }
        >
          <AppRouter />
          <Footer />
        </Suspense>
      </FirebaseAppProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
