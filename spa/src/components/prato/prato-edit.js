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
    nomeDoPrato: "",
    preco: 0.0,
    estoque: 0,
  });

  const doGetById = async () => {
    const response = await axios.get(`/api/pratos/${idParaEditar}`, prato);
    setPrato(response.data);
  };

  useEffect(() => {
    doGetById();
  }, []);

  const doPut = async () => {
    await axios.put(`/api/pratos/${idParaEditar}`, prato);
    tempAlert(`${prato.nomeDoPrato} alterado com sucesso!`, 5000);
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

export default PratoEdit;
