import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from '@mui/material/styles';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/root.jsx";
import './global.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <StyledEngineProvider injectFirst>
    <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
);
