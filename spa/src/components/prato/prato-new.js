import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "../../App.css";
import tempAlert from "../alert/alert";

/* rafc  - comando para criar um component arrow*/

const PratoNew = () => {
  console.log("oi");
  const history = useHistory();
  const [prato, setPrato] = useState({
    nomeDoPrato: "",
    preco: 0.0,
    estoque: 1000,
  });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    await axios.post("/api/pratos", prato);
    tempAlert(`Prato adicionado com sucesso!`, 5000);
    history.push("/pratos");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoPrato = { ...prato, [event.target.name]: event.target.value };
    setPrato(novoPrato);
  };

  return (
    <div>
      <h3>Cadastro de Prato</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Nome Do Prato
          <input
            type="text"
            name="nomeDoPrato"
            required
            onChange={handleChange}
            value={prato.nomeDoPrato}
          ></input>
        </div>
        <div>
          Preço
          <input
            type="text"
            name="preco"
            required
            onChange={handleChange}
            value={prato.preco}
          ></input>
        </div>
        <div>
          Estoque
          <input
            type="text"
            name="estoque"
            required
            onChange={handleChange}
            value={prato.estoque}
          ></input>
        </div>
        <button className="btn">Enviar</button>
        <button className="btn-cancel" onClick={() => history.push("/pratos")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default PratoNew;
