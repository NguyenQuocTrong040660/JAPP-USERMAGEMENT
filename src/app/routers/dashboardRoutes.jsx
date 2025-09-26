import { lazy } from "react";

// Lazy load components
const Home = lazy(() => import("../view/home"));

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/",
    element: <Home />,
  },
];

export default dashboardRoutes;