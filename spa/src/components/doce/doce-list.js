import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../../App.css";
import Menu from "../menu/menu";
import tempAlert from "../alert/alert";

export const DoceList = () => {
  const history = useHistory();
  const [doces, setDoces] = useState([]);
  const [termoDeBusca, setTermoDeBusca] = useState("");

  const doGetDoces = async () => {
    const response = await axios.get("/api/doces");
    setDoces(response.data);
  };

  useEffect(() => {
    doGetDoces();
  }, []);

  const doExcluirDoce = async (id) => {
    await axios.delete(`/api/doces/${id}`);
    tempAlert("Doce removido!", 3000);
    doGetDoces();
  };

  const doSearchProdutos = async () => {
    const response = await axios.get(`/api/doces?termo=${termoDeBusca}`);
    setDoces(response.data);
  };

  const handleExcluir = (id) => {    
      doExcluirDoce(id);    
  };

  const handleSearchChange = (event) => {
    setTermoDeBusca(event.target.value);
  };

  const handleSearch = (event) => {
    console.log("Pesquisando o doce " + termoDeBusca);
    doSearchProdutos();
  };

  const tableData = doces.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.nome}</td>
        <td>{row.preco}</td>
        <td>
          <button onClick={() => handleExcluir(row.id)}>Excluir</button>
          <button onClick={() => history.push(`/doces/editar/${row.id}`)}>
            Editar
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Menu></Menu>
      <h2>Cardápio de Comidas</h2>
      {/* <button className="btn" onClick={() => history.push("/pedidos")}>
        Pedidos
      </button> */}
      <hr />
      <div className="pd">
        <input
          className="cb"
          type="text"
          placeholder="O que deseja buscar?"
          onChange={handleSearchChange}
        />
        <button className="bb" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

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
      <button className="btn" onClick={() => history.push("/doces/novo")}>
        Criar Novo Doce
      </button>
    </div>
  );
};

export default DoceList;
