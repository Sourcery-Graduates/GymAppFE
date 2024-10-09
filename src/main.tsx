import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { GymTheme } from "./MUITheme/GymTheme.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={GymTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
