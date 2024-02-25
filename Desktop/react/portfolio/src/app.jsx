import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProjectDetails from "./pages/ProjectDetails";
import AppLayout from "./ui/AppLayout";
import { DarkModeProvider } from "./context/useDarkMode";
import { ActiveLinkProvider } from "./context/useActiveLink";
import Project from "./pages/Project";
import Tabs from "./context/useTabs";

export function App() {
  return (
    <>
      <DarkModeProvider>
        <Tabs>
          <ActiveLinkProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Project />} />
                  <Route element={<ProjectDetails />} path="/:id" />
                </Route>
              </Routes>
            </BrowserRouter>
          </ActiveLinkProvider>
        </Tabs>
      </DarkModeProvider>
    </>
  );
}
