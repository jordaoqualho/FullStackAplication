import axios from "axios";
import React, { useState } from "react";

import "../../App.css";

/* rafc  - comando para criar um component arrow*/

const DoceEdit = () => {
  const [doce, SetDoce] = useState({ nome: "", preco: "" });

  // nfn - comando para criar função anonima
  const doPost = async () => {
    const response = await axios.post("/api/doces", doce);
    alert(response.data + " adicionado!");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doPost();
  };

  const handleChange = (event) => {
    const novoDoce = { ...doce, [event.target.name]: event.target.value };
    console.log(doce);
    SetDoce(novoDoce);
  };

  return (
    <div>
      <h3>Edição de Doce</h3>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={handleChange}
            name="nome"
            placeholder="nome"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            name="preco"
            placeholder="preco"
          />
        </div>
        <button className="btn">Enviar</button>
      </form>
    </div>
  );
};

export default DoceEdit;