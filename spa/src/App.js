import React from "react";
import "./App.css";
// import DoceEdit from "./components/doce/doce-edit";
import DoceList from "./components/doce/doce-list";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <DoceEdit></DoceEdit> */}
        <DoceList></DoceList>
      </header>
    </div>
  );
}

export default App;
