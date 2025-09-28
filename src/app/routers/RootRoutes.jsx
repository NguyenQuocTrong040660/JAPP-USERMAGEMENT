import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import dashboardRoutes from "./dashboardRoutes";
import authRoutes from "./authRoutes";
import Layout1 from "../view/layout/Layout1/Layout1";


// V5: Redirect "/" -> "/home" (exact: true)
// V6: dùng index route để redirect
const redirectIndex = { index: true, element: <Navigate to="/home" replace /> };

// V5: errorRoute dùng component Redirect không có path
// V6: dùng wildcard "*"
const errorRoute = { path: "*", element: <Navigate to="/404" replace /> };

const routes = [
  // giống ...authRoutes (public: /login, /register, /404,...)
  ...authRoutes,

  // V5: { path: "/", component: AuthGuard, routes: [...] }
  // V6: { path: "/", element: <AuthGuard/>, children: [...] }
  {
    path: "/",
    //element: <AuthGuard />,
     element: <Layout1 />,
    children: [
      // giống ...dashboardRoutes (protected: /home, /dashboard,...)
      ...dashboardRoutes,

      // "/" -> "/home"
      redirectIndex,

      // "*" -> "/404"
      errorRoute,
    ],
  },
];

export default function RootRouter() {
  return useRoutes(routes);
}