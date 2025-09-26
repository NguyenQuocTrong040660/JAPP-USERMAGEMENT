import { lazy } from "react";

// Lazy load components
const Signin = lazy(() => import("../view/auth/Signin"));

const authRoutes = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/login",
    element: <Signin />,
  },
];

export default authRoutes;