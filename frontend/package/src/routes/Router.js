 import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Medicaments = lazy(() => import("../views/ui/Medicaments"));

const Compte = lazy(() => import("../views/ui/Compte"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const SignUp = lazy(() => import("../../src/SignUp/SignUp"));
/*****Routes******/

const ThemeRoutes = [
  // SignUp Page
  {
    path: "/",
    element: <SignUp />, // Show SignUp as the first page
  },

  // Dashboard and Other Pages
  {
    path: "/dashboard",
    element: <FullLayout />, // Layout for the dashboard and nested pages
    children: [
      { path: "starter", element: <Starter /> }, // Relative path
      { path: "Medicaments", element: <Medicaments /> }, // Relative path

      { path: "about", element: <About /> }, // Relative path
      { path: "alerts", element: <Alerts /> }, // Relative path
      { path: "badges", element: <Badges /> }, // Relative path
      { path: "buttons", element: <Buttons /> }, // Relative path
      { path: "cards", element: <Cards /> }, // Relative path
      { path: "grid", element: <Grid /> }, // Relative path
      { path: "table", element: <Tables /> }, // Relative path
      { path: "comptes", element: <Compte /> }, // Relative path
      { path: "breadcrumbs", element: <Breadcrumbs /> }, // Relative path
      { path: "", element: <Navigate to="starter" /> }, // Redirect to "starter" relative to "/dashboard"
    ],
  },
];



export default ThemeRoutes;