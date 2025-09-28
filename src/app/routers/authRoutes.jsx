import { lazy } from "react";

// Lazy load components
const Signin = lazy(() => import("../view/auth/Signin"));

const Error404 = lazy(() => import("../view/error/Error"));

//const LockScreen = lazy(() => import("../view/auth/LockScreen"));

const authRoutes = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/404",
    element: <Error404 />,
  },
  // {
  //   path: "/lockscreen",
  //   element: <LockScreen />,
  // },
];

export default authRoutes;