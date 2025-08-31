import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [extended, setExtended] = useState(true);

  const onToggle = () => {
    setExtended(prev => !prev)
  };

  return (
    <div className="flex">
      <Sidebar extended={extended} onToggle={onToggle} />
      <Main isSidebarOpen={extended} />
    </div>
  );
}

export default App;
