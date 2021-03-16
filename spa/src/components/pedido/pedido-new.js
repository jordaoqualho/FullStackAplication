import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "../../App.css";
import tempAlert from "../alert/alert";

/* rafc  - comando para criar um component arrow*/

const PedidoNew = () => {
  const history = useHistory();
  const [pedido, setPedido] = useState({
    nomeDoCliente: "",
    lancadoEm: new Date(),
    valorTotal: 0.0,
  });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    await axios.post("/api/pedidos", pedido);
    tempAlert(`Pedido adicionado com sucesso!`,5000);
    history.push("/pedidos");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoPedido = { ...pedido, [event.target.name]: event.target.value };
    setPedido(novoPedido);
  };

  return (
    <div>
      <h3>Cadastro de Pedido</h3>
      <hr></hr>
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
        <button className="btn-cancel" onClick={() => history.push("/pedidos")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default PedidoNew;
