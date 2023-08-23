import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/root.jsx";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./contexts/AuthProvider.jsx";
import SmoothScrollProvider from "./contexts/SmoothScrollProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <SmoothScrollProvider>
        <RouterProvider router={router} />
        </SmoothScrollProvider>
      </StyledEngineProvider>
    </AuthProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
