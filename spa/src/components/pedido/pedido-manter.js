import React, { useState } from "react";
import { Route, Switch } from "react-router";
import PedidoEdit from "./pedido-edit";
import PedidoList from "./pedido-list";
import PedidoNew from "./pedido-new";

const PedidoManter = () => {
  const [statusPesquisa, setStatusPesquisa] = useState({
    páginaAtual: 0,
    termoDePesquisa: "",
  });

  return (
    <>
      <Switch>
        <Route exact path="/pedidos">
          <PedidoList
            statusPesquisa={statusPesquisa}
            setStatusPesquisa={setStatusPesquisa}
          ></PedidoList>
        </Route>
        <Route path="/pedidos/novo" component={PedidoNew}></Route>
        <Route
          path="/pedidos/editar/:idParaEditar"
          component={PedidoEdit}
        ></Route>
      </Switch>
    </>
  );
};

export default PedidoManter;
