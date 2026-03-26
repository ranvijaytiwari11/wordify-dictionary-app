import React, { useState, useEffect } from "react";
import logo from "./logo.png"; 
import "./App.css";
import Dictionary from "./Engine";

export default function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <div className="container">
        
        {/* Dark Mode Button */}
        <div className="theme-toggle text-end mt-3">
          <button onClick={toggleTheme} className="btn btn-outline-secondary btn-sm">
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        <header className="App-header">
          <img src={logo} className="App-logo img-fluid" alt="WordAtlas Logo" />
          <h1 className="mb-4 text-center">WORDATLAS</h1>
        </header>

        <main>
          <Dictionary defaultKeyword="book" />
        </main>

        <footer className="App-footer mt-4 mb-5">
          <div>
            Coded by <strong>RANVIJAY TIWARI</strong>{" "}
            <i className="fa-brands fa-react"></i> Open-sourced on{" "}
            <a
              href="https://github.com/ranvijaytiwari11"
              title="GitHub Profile"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <br />
            <small>Licensed under the MIT License</small>
          </div>
        </footer>
      </div>
    </div>
  );
}