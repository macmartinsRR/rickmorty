import React from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
