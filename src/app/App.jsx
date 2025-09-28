import { Provider } from "react-redux";
import {store} from "./redux/Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootRouter from "./routers/RootRoutes";
import { Loading } from "./components";

import "../styles/app/app.scss";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
        <Provider store={store}>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </Provider>
  
        
       
  );
}

export default App;
