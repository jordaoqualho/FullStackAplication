import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import DoceList from "./components/doce/doce-list";
import DoceNew from "./components/doce/doce-new";
import DoceEdit from "./components/doce/doce-edit";
import LandingPage from "./components/landing/landing-page";
import PedidoManter from "./components/pedido/pedido-manter";
import PratoManter from "./components/prato/prato-manter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage></LandingPage>
            </Route>
            <Route exact path="/doces">
              <DoceList></DoceList>
            </Route>
            <Route path="/doces/novo">
              <DoceNew></DoceNew>
            </Route>
            <Route path="/doces/editar/:idParaEditar">
              <DoceEdit></DoceEdit>
            </Route>
            <Route path="/pedidos" component={PedidoManter}></Route>
            <Route path="/pratos" component={PratoManter}></Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
