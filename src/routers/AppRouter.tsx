import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Form } from "../views/Form";
import { Answers } from "../views/Answers";
import { NotFound } from "../views/NotFound";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Form />} />
        <Route path="/respuestas" element={<Answers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
