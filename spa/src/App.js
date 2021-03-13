import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import DoceList from "./components/doce/doce-list";
import DoceNew from "./components/doce/doce-new";
import DoceEdit from "./components/doce/doce-edit";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <DoceList></DoceList>
            </Route>
            <Route path="/cadastro">
              <DoceNew></DoceNew>
            </Route>
            <Route path="/editar/:idParaEditar">
              <DoceEdit></DoceEdit>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
