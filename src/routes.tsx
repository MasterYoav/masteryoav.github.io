// src/routes.tsx
import { createHashRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,         // Layout should render <Outlet />
    children: [
      { index: true, element: <Home /> },              // "/"
      { path: "projects", element: <Projects /> },     // "/#/projects"
      { path: "contact", element: <Contact /> },       // "/#/contact"
      { path: "*", element: <div className="py-10 text-center">Not found</div> },
    ],
  },
]);