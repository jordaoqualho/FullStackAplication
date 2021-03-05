import "./App.css";
import SomarComponent from "./components/somar-component";
import HelloComponent from "./components/hello-component";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SomarComponent></SomarComponent>
        <HelloComponent></HelloComponent>
      </header>
    </div>
  );
}

export default App;
