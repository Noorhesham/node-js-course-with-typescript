import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import { AnimatedRoutes } from "./components/AnimatedRoutes.tsx";
import { NavProvider } from "./context/NavContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavProvider>
        <NavBar />
        <AnimatedRoutes />
      </NavProvider>
    </BrowserRouter>
  </StrictMode>
);
