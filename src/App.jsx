import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import Home from "./Home";
import { auth } from "./Firebase";
const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsAuth(false);
        return;
      }

      setIsAuth(true);
    });

    return () => listener();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!isAuth && (
            <>
              <Route path="/login" element={<Auth />} />
              <Route path="/signUp" element={<Auth signUp />} />
            </>
          )}
          <Route path="/" element={<Home auth={isAuth} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
