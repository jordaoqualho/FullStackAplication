import React, { useState } from "react";
import { Route, Switch } from "react-router";
import PratoEdit from "./prato-edit";
import PratoList from "./prato-list";
import PratoNew from "./prato-new";

const PratoManter = () => {
  const [statusPesquisa, setStatusPesquisa] = useState({
    páginaAtual: 0,
    termoDePesquisa: "",
  });

  return (
    <>
      <Switch>
        <Route exact path="/pratos">
          <PratoList
            statusPesquisa={statusPesquisa}
            setStatusPesquisa={setStatusPesquisa}
          ></PratoList>
        </Route>
        <Route path="/pratos/novo" component={PratoNew}></Route>
        <Route
          path="/pratos/editar/:idParaEditar"
          component={PratoEdit}
        ></Route>
      </Switch>
    </>
  );
};

export default PratoManter;
