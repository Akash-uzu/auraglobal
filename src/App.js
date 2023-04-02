import React from "react";
import Login from "./components/login/Login";
import Home from "./components/homepage/body/Home";
import Error from "./components/Error/Error";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
