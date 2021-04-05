import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "../../App.css";
import tempAlert from "../alert/alert";

/* rafc  - comando para criar um component arrow*/

const PratoNew = () => {
  console.log('oi');
  const history = useHistory();
  const [prato, setPrato] = useState({
    nomeDoCliente: "",
    lancadoEm: new Date(),
    valorTotal: 0.0,
  });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    await axios.post("/api/pratos", prato);
    tempAlert(`Prato adicionado com sucesso!`,5000);
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
          Nome Do Cliente
          <input
            type="text"
            required
            name="nomeDoCliente"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Lançado em
          <input
            type="date"
            required
            name="lancadoEm"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Valor Total
          <input
            type="text"
            required
            name="valorTotal"
            onChange={handleChange}
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
