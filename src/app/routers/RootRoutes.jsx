import React from "react";
import { Navigate } from "react-router-dom";
import dashboardRoutes from "./dashboardRoutes";
import authRoutes from "./authRoutes";
//import AuthGuard from "../guard/AuthGuard";

// Chuyển "/" → "/signin" (login trước)
const redirectRoute = {
  path: "/",
  element: <Navigate to="/signin" replace />,
};

// Trang lỗi 404
const errorRoute = {
  path: "*",
  element: <Navigate to="/404" replace />,
};

// Gộp route
const RootRoutes = [
  ...authRoutes, // ví dụ: /login, /register
  {
    path: "/",
    //element: <AuthGuard />,      // bảo vệ các route bên trong
    children: [
      ...dashboardRoutes,        // ví dụ: /home, /dashboard
      redirectRoute,
      errorRoute,
    ],
  },
];

export default RootRoutes;
