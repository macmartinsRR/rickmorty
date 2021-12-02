import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
    <ThemeProvider>
      <LoginProvider>
        <Header />
        <Outlet />
      </LoginProvider>
    </ThemeProvider>
  );
}

export default App;
