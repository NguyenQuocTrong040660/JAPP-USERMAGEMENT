import { lazy } from "react";

// Lazy load components

const Dashboard = lazy(() => import("../view/home/Dashboard"));

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
];

export default dashboardRoutes;