/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import tempAlert from "../alert/alert";

const PratoEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [prato, setPrato] = useState({
    nomeDoCliente: "",
    lancadoEm: new Date(),
    valorTotal: 0.0,
  });

  console.log(idParaEditar);

  const doGetById = async () => {
    const response = await axios.get(`/api/pratos/${idParaEditar}`, prato);
    setPrato(response.data);
  };

  useEffect(() => {
    doGetById();
  }, []);

  const doPut = async () => {
    await axios.put(`/api/pratos/${idParaEditar}`, prato);
    tempAlert(`${prato.nomeDoCliente} alterado com sucesso!`, 5000);
    history.push("/pratos");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPut();
  };

  const handleChange = (event) => {
    const novoprato = { ...prato, [event.target.name]: event.target.value };
    setPrato(novoprato);
  };

  return (
    <div>
      <h2>Edição de Prato</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Nome Do Cliente
          <input
            type="text"
            name="nomeDoCliente"
            required
            onChange={handleChange}
            value={prato.nomeDoCliente}
          ></input>
        </div>
        <div>
          Lançado em
          <input
            type="date"
            name="lancadoEm"
            required
            onChange={handleChange}
            value={prato.lancadoEm}
          ></input>
        </div>
        <div>
          Valor Total
          <input
            type="text"
            name="valorTotal"
            required
            onChange={handleChange}
            value={prato.valorTotal}
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

export default PratoEdit;
