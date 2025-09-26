import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { toNumber } from "lodash";

import { store } from "./redux/Store";
import RootRoutes from "./routers/RootRoutes";
import Auth from "./guard/Auth";
import { Loading } from "./components";
import "../styles/app/app.scss";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Auth>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              {RootRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                >
                  {route.children && route.children.map((childRoute, childIndex) => (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
                </Route>
              ))}
            </Routes>
          </BrowserRouter>
        </Suspense>
        
        {/* Toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Auth>
    </Provider>
  );
}

export default App;
