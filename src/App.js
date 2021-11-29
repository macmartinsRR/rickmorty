import React from "react";
import Homepage from "./components/Homepage";
import { ThemeProvider } from "./components/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Homepage />
    </ThemeProvider>
  );
}

export default App;
