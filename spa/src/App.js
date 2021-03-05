import "./App.css";

import ContadorComponent from "./components/contador-component";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ContadorComponent max={20} min={10}></ContadorComponent>
      </header>
    </div>
  );
}

export default App;
