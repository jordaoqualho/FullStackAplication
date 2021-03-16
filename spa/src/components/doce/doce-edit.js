/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../App.css";
import tempAlert from "../alert/alert";

/* rafc  - comando para criar um component arrow*/

const DoceEdit = () => {
  const history = useHistory();
  const { idParaEditar } = useParams();
  const [doce, SetDoce] = useState({ nome: "", preco: "" });

  const doGetById = async () => {
    const response = await axios.get(`/api/doces/${idParaEditar}`, doce);
    SetDoce(response.data);
  };

  useEffect(() => {
    doGetById();
  },[]);

  const doPut = async () => {
    await axios.put(`/api/doces/${idParaEditar}`, doce);
    tempAlert(`${doce.nome} alterado com sucesso!`, 5000); 
    history.push("/doces");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPut();
  };

  const handleChange = (event) => {
    const editarDoce = { ...doce, [event.target.name]: event.target.value };
    SetDoce(editarDoce);
  };

  return (
    <div>
      <h3>Alteração de Doce</h3>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={doce.nome}
          onChange={handleChange}
          name="nome"
          placeholder="Nome do Doce"
        />
        <input
          type="text"
          required
          value={doce.preco}
          onChange={handleChange}
          name="preco"
          placeholder="Preço"
        />
        <button className="btn">Alterar</button>
        <button className="btn-cancel" onClick={() => history.push("/doces")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DoceEdit;
