import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import DoceList from "./components/doce/doce-list";
import DoceNew from "./components/doce/doce-new";
import DoceEdit from "./components/doce/doce-edit";
import PedidoList from "./components/pedido/pedido-list";
import PedidoEdit from "./components/pedido/pedido-edit";
import PedidoNew from "./components/pedido/pedido-new";
import LandingPage from "./components/landing/landing-page";

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
            <Route exact path="/pedidos">
              <PedidoList></PedidoList>
            </Route>
            <Route path="/pedidos/editar/:idParaEditar">
              <PedidoEdit></PedidoEdit>
            </Route>
            <Route path="/pedidos/novo">
              <PedidoNew></PedidoNew>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
