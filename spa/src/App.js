import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import DoceList from "./components/doce/doce-list";
import DoceNew from "./components/doce/doce-new";

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
          </Switch>
        </Router>

        {/* <DoceEdit></DoceEdit> */}
        {/* <DoceList></DoceList> */}
      </header>
    </div>
  );
}

export default App;
