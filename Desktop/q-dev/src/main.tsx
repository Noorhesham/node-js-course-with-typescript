import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import { AnimatedRoutes } from "./components/AnimatedRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      <NavBar />
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
