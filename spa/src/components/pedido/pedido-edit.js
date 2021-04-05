/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../alert/alert";

const PedidoEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [pedido, setPedido] = useState({
    nomeDoCliente: "",
    lancadoEm: new Date(),
    valorTotal: 0.0,
  });

  console.log(idParaEditar);

  const doGetById = async () => {
    const response = await axios.get(`/api/pedidos/${idParaEditar}`, pedido);
    setPedido(response.data);
  };

  useEffect(() => {
    doGetById();
  }, []);

  const doPut = async () => {
    await axios.put(`/api/pedidos/${idParaEditar}`, pedido);
    tempAlert(`${pedido.nomeDoCliente} alterado com sucesso!`, 5000);
    history.push("/pedidos");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPut();
  };

  const handleChange = (event) => {
    const novopedido = { ...pedido, [event.target.name]: event.target.value };
    setPedido(novopedido);
  };

  return (
    <div>
      <h2>Edição de Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Nome Do Cliente
          <input
            type="text"
            name="nomeDoCliente"
            required
            onChange={handleChange}
            value={pedido.nomeDoCliente}
          ></input>
        </div>
        <div>
          Lançado em
          <input
            type="date"
            name="lancadoEm"
            required
            onChange={handleChange}
            value={pedido.lancadoEm}
          ></input>
        </div>
        <div>
          Valor Total
          <input
            type="text"
            name="valorTotal"
            required
            onChange={handleChange}
            value={pedido.valorTotal}
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

export default PedidoEdit;
