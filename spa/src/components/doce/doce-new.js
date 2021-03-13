import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "../../App.css";

/* rafc  - comando para criar um component arrow*/

const DoceNew = () => {
  const history = useHistory();
  const [doce, SetDoce] = useState({ nome: "", preco: "" });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    const response = await axios.post("/api/doces", doce);
    alert(response.data + " adicionado!");
    history.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    // if (event.target.value === "") {
    //   console.log("vazio");
    // } else {
    // }
    const novoDoce = { ...doce, [event.target.name]: event.target.value };
    SetDoce(novoDoce);
  };

  return (
    <div>
      <h3>Cadastro de Doce</h3>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          onChange={handleChange}
          name="nome"
          placeholder="Nome do Doce"
        />
        <input
          type="text"
          required
          onChange={handleChange}
          name="preco"
          placeholder="Preço"
        />
        <button className="btn">Enviar</button>
        <button className="btn-cancel" onClick={() => history.push("/")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DoceNew;
