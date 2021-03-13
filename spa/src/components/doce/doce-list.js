import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../../App.css";

export const DoceList = () => {
  const history = useHistory();
  const [doces, setDoces] = useState([]);

  const doGetDoces = async () => {
    const response = await axios.get("/api/doces");
    setDoces(response.data);
  };

  useEffect(() => {
    doGetDoces();
  }, []);

  const doExcluirDoce = async (id) => {
    const response = await axios.delete(`/api/doces/${id}`);
    alert(response.data + " removido!");
    doGetDoces();
  };

  const handleExcluir = (id) => {
    if (window.confirm("Deseja Excluir?")) {
      doExcluirDoce(id);
    }
  };

  const tableData = doces.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.nome}</td>
        <td>{row.preco}</td>
        <td>
          <button onClick={() => handleExcluir(row.id)}>Excluir</button>
          <button>Editar</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Tabela de Doces</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Preço</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
      <button className="btn" onClick={() => history.push("/cadastro")}>
        Criar Novo Doce
      </button>
    </div>
  );
};

export default DoceList;
